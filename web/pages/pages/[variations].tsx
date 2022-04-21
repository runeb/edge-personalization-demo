import { Box } from "@sanity/ui";
import groq from "groq";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Banner from "../../components/Banner";
import Cards from "../../components/Cards";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Newsletter from "../../components/Newsletter";
import Quote from "../../components/Quote";
import sanityClient from "../../lib/sanityClient";
import {
  Personalization,
  SectionBanner,
  SectionCards,
  SectionHero,
  SectionNewsletter,
  SectionQuote,
} from "../../types";
import { cartesian } from "../../utils/cartesian";
import { decode } from "../../utils/params";

interface Props {
  pathname: string;
  personalization: Personalization;
  result: {
    content: {
      sections: (
        | SectionBanner
        | SectionCards
        | SectionHero
        | SectionNewsletter
        | SectionQuote
      )[];
      title: string;
    };
    seo: {
      description: string;
      image: any;
      keywords: string[];
      slug: string;
      title: string;
    };
  };
}

export default function Page(props: Props) {
  const { pathname, personalization } = props;
  const { content, seo } = props.result;

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Head>

      <Header marketRegion={personalization?.marketingRegion} />

      {/* Sections */}
      {content?.sections?.map((section, index) => {
        return (
          <Box key={index}>
            {section._type === "banner" && (
              <Banner affinity={personalization?.affinity} banner={section} />
            )}
            {section._type === "hero" && (
              <Hero affinity={personalization?.affinity} hero={section} />
            )}
            {section._type === "cards" && (
              <Cards affinity={personalization?.affinity} cards={section} />
            )}
            {section._type === "newsletter" && (
              <Newsletter
                affinity={personalization?.affinity}
                newsletter={section}
              />
            )}
            {section._type === "quote" && (
              <Quote affinity={personalization?.affinity} quote={section} />
            )}
          </Box>
        );
      })}

      <Footer pathname={pathname} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch page slugs
  const slugs = await sanityClient.fetch(`*[_type == 'page'] {
    "slug": seo.slug.current,
  }`);

  // Fetch all affinities and marketing regions
  const { affinities, marketingRegions } = await sanityClient.fetch(`{
    "affinities": *[_type == 'affinity'].title,
    "marketingRegions": *[_type == 'marketingRegion'].title,
  }`);

  const result = cartesian(
    affinities.map((affinity: string) => ({ affinity })),
    marketingRegions.map((marketingRegion: string) => ({ marketingRegion })),
    slugs
  );

  // TODO: type correctly
  const paths: string[] = result.map((params: any) => {
    // Merge arrays
    const pathsObj = params.reduce((acc: any, val: any) => {
      acc = { ...acc, ...val };
      return acc;
    }, {});
    return Buffer.from(JSON.stringify(pathsObj)).toString("base64");
  });

  return {
    fallback: "blocking",
    paths: paths.map((path) => ({
      params: { variations: path },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const variations = String(context.params?.variations);
  // Decode base64 encoded params
  const decodedParams = decode(variations);
  const IMAGE = groq`
    ...,
    'dimensions': asset->metadata.dimensions,
    'mimeType': asset->mimeType,
  `;

  const query = groq`
    *[_type == 'page' && seo.slug.current == $slug][0] {
      "content": coalesce(
        variations[marketingRegion->title == $marketingRegion][0].content, 
        content
      ) {
        title,
        sections[]->{
          _type,
          // Determine if we're using a variation or the base value
          // TODO: let's optimise this!
          "isVariation": coalesce(
            defined(variations[affinity->title == $affinity][0].content),
            false
          ),
          ...coalesce(
            variations[affinity->title == $affinity][0].content, 
            content
          ) {
            ...,
            image {
              ${IMAGE}
            }
          }
        }
      },
      seo {
        ...,
        image {
          ${IMAGE}
        },
        "slug": slug.current
      }
    }
  `;

  const result = await sanityClient.fetch(query, decodedParams);

  if (!result) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pathname: variations,
      personalization: {
        affinity: decodedParams.affinity,
        marketingRegion: decodedParams.marketingRegion,
      },
      result,
    },
    revalidate: 120, // seconds
  };
};

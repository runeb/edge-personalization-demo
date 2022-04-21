import { PortableText } from "@portabletext/react";
import type { Block } from "@sanity/types";
import { Box, Card, Grid, Heading, Stack, Text } from "@sanity/ui";
import groq from "groq";
import type { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Form from "../components/Form";
import sanityClient from "../lib/sanityClient";
import clearCookies from "../utils/clearCookies";

interface Props {
  about: Block[];
  affinities: string[];
  getStarted: Block[];
  pages: {
    slug: string;
    title: string;
  }[];
}

const Home = (props: Props) => {
  const { about, affinities, getStarted, pages } = props;

  useEffect(() => {
    // Clear previous cookies on mount
    clearCookies();
  }, []);

  return (
    <div>
      <Head>
        <title>Vercel + Sanity personalization demo</title>
        <meta name="description" content="" />
      </Head>

      <main>
        <Card paddingX={4} paddingY={5}>
          <Stack space={5}>
            <Heading size={3} style={{ fontWeight: 500 }}>
              Vercel + Sanity personalization demo
            </Heading>
            <Grid
              columns={[1, 1, 1, 2]}
              gap={6}
              marginTop={4}
              style={{ maxWidth: "1200px" }}
            >
              <Box flex={1} style={{ maxWidth: "500px" }}>
                {getStarted && (
                  <Box flex={1}>
                    <PortableText value={getStarted} />
                  </Box>
                )}

                <Box marginY={5}>
                  <Form affinities={affinities} pages={pages} />
                </Box>
              </Box>

              {about && (
                <Box flex={1} style={{ maxWidth: "500px" }}>
                  <PortableText value={about} />
                </Box>
              )}
            </Grid>
          </Stack>
        </Card>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Fetch all available affinities + pages
  const { about, affinities, getStarted, pages } =
    await sanityClient.fetch(groq`{
    "affinities": *[_type == 'affinity'].title,
    ...*[_id == 'home'][0] {
      about,
      getStarted,
    },
    "pages": *[_type == 'page'] {
      "slug": seo.slug.current,
      "title": seo.title
    }
  }`);

  return {
    props: {
      about,
      affinities,
      getStarted,
      pages,
    },
    revalidate: 120, // seconds
  };
};

export default Home;

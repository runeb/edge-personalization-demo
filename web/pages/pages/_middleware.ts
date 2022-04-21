import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import groq from "groq";
import sanityClient from "../../lib/sanityClient";
import { encode } from "../../utils/params";
import { COOKIES } from "../../types";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const { geo } = req;

  const affinity = req.cookies[COOKIES.affinity] || null;
  const city = req.cookies[COOKIES.city] || geo?.city || null;
  const country = req.cookies[COOKIES.country] || geo?.country || null;
  const region = req.cookies[COOKIES.region] || geo?.region || null;

  const url = req.nextUrl.clone();
  const pathname = url.pathname;
  const slug = pathname.slice(pathname.lastIndexOf("/") + 1);

  // Fetch marketing region
  const query = groq`*[
      _type == 'marketingRegion'
      && ($region in regions || $city in cities || $country in countries)
    ] 
    | score(
      boost($city in cities, 100),
      boost($region in regions, 10),
      boost($country in countries, 1)
    ) 
    | order(_score desc)[0].title
  `;
  const marketingRegion = await sanityClient.fetch(query, {
    city,
    country,
    region,
  });

  // Encode params
  const params = {
    affinity,
    marketingRegion,
    slug,
  };

  const encodedPathname = encode(params);

  // Mutate cloned URL and rewrite
  url.pathname = `/pages/${encodedPathname}`;
  const res = NextResponse.rewrite(url);

  return res;
}

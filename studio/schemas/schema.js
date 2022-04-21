// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

import affinity from "./documents/affinity";
import banner from "./documents/banner";
import cards from "./documents/cards";
import hero from "./documents/hero";
import marketingRegion from "./documents/marketingRegion";
import newsletter from "./documents/newsletter";
import page from "./documents/page";
import quote from "./documents/quote";
import seo from "./objects/seo";
import home from "./singletons/home";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // objects
    seo,
    // singletons
    home,
    // documents
    affinity,
    banner,
    cards,
    hero,
    marketingRegion,
    newsletter,
    page,
    quote,
  ]),
});

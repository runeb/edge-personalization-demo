import S from "@sanity/desk-tool/structure-builder";
import { dimensions } from "./desk/dimensions";
import { home } from "./desk/home";
import { pages } from "./desk/pages";
import { components } from "./desk/components";

// If you add document types to desk structure manually, you can add them to this array to prevent duplicates in the root pane
const DOCUMENT_TYPES_IN_STRUCTURE = [
  "affinity",
  "banner",
  "cards",
  "hero",
  "home",
  "marketingRegion",
  "newsletter",
  "page",
  "quote",
];

export default () => {
  // prettier-ignore
  return (
    S.list()
      .title('Content')
      .items([
        home,
        S.divider(),
        pages,
        components,
        dimensions,
        // Automatically add new document types to the root pane
        ...S.documentTypeListItems().filter(listItem => !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItem.getId()))
      ])
  )
};

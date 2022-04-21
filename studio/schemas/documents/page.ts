import pluralize from "pluralize";
import createVariation from "../generators/createVariation";
import marketingRegionVariation from "../generators/variations/marketingRegionVariation";

export default createVariation({
  schema: {
    name: "page",
    title: "Page",
    groups: [
      {
        name: "seo",
        title: "SEO",
      },
      {
        name: "content",
        title: "Content",
      },
    ],
    fields: [
      {
        name: "content",
        title: "Content",
        type: "object",
        group: "content",
        description: "Overridable base content",
        fields: [
          {
            name: "sections",
            title: "Sections",
            type: "array",
            of: [
              {
                type: "reference",
                to: [
                  {
                    type: "banner",
                  },
                  {
                    type: "cards",
                  },
                  {
                    type: "hero",
                  },
                  {
                    type: "newsletter",
                  },
                  {
                    type: "quote",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "seo",
        title: "SEO",
        type: "seo",
        group: "seo",
      },
    ],
    preview: {
      select: {
        title: "seo.title",
        variations: "variations",
      },
      prepare(selection) {
        const { title, variations } = selection;
        return {
          subtitle:
            variations?.length > 0
              ? pluralize("variation", variations.length || 0, true)
              : undefined,
          title,
        };
      },
    },
  },
  variations: [marketingRegionVariation],
});

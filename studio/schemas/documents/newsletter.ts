import { EnvelopeIcon } from "@sanity/icons";
import pluralize from "pluralize";
import createVariation from "../generators/createVariation";
import affinityVariation from "../generators/variations/affinityVariation";

export default createVariation({
  schema: {
    name: "newsletter",
    title: "Newsletter",
    icon: EnvelopeIcon,
    groups: [
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
            title: "Title",
            name: "title",
            type: "string",
            validation: (Rule) => Rule.required(),
          },
          {
            title: "Description",
            name: "description",
            type: "text",
            rows: 2,
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "content.title",
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
  variations: [affinityVariation],
});

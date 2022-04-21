import { ImageIcon } from "@sanity/icons";
import pluralize from "pluralize";
import createVariation from "../generators/createVariation";
import affinityVariation from "../generators/variations/affinityVariation";

export default createVariation({
  schema: {
    name: "banner",
    title: "Banner",
    icon: ImageIcon,
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
            title: "Image",
            name: "image",
            type: "image",
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

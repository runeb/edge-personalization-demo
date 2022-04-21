import { PinIcon } from "@sanity/icons";

export default function marketingRegionVariation({
  fields,
  groups = [],
}: {
  fields: Record<string, any>[];
  groups: Record<string, any>[];
}) {
  return {
    name: "marketingRegionVariation",
    title: "Marketing region",
    type: "object",
    icon: PinIcon,
    fields: [
      {
        name: "marketingRegion",
        title: "Marketing region",
        type: "reference",
        to: [{ type: "marketingRegion" }],
      },
      {
        name: "content",
        title: "Content",
        type: "object",
        description: "Overrides base content",
        fields,
        groups,
      },
    ],
    preview: {
      select: {
        marketingRegion: "marketingRegion.title",
      },
      prepare(selection) {
        const { marketingRegion } = selection;
        return {
          subtitle: "Marketing region",
          title: marketingRegion,
        };
      },
    },
  };
}

import { SplitVerticalIcon } from "@sanity/icons";

export default function splitVariation({
  fields,
  groups = [],
}: {
  fields: Record<string, any>[];
  groups: Record<string, any>[];
}) {
  return {
    name: "splitVariation",
    title: "Split variation",
    type: "object",
    icon: SplitVerticalIcon,
    groups,
    fields: [
      {
        name: "percentage",
        title: "Percentage",
        type: "number",
        description: "Must be a value betewen 0 and 1",
        initialValue: 0.5,
        validation: (Rule) => Rule.min(0).max(1),
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
        percentage: "percentage",
      },
      prepare(selection) {
        const { percentage } = selection;
        return {
          subtitle: "Split",
          title: percentage,
        };
      },
    },
  };
}

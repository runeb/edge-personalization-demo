import { UsersIcon } from "@sanity/icons";

export default function affinityVariation({
  fields,
  groups = [],
}: {
  fields: Record<string, any>[];
  groups: Record<string, any>[];
}) {
  return {
    name: "affinityVariation",
    title: "Affinity",
    type: "object",
    icon: UsersIcon,
    fields: [
      {
        name: "affinity",
        title: "Affinity",
        type: "reference",
        to: [{ type: "affinity" }],
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
        affinityTitle: "affinity.title",
      },
      prepare(selection) {
        const { affinityTitle } = selection;
        return {
          subtitle: "Affinity",
          title: affinityTitle,
        };
      },
    },
  };
}

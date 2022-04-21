import { EarthAmericasIcon } from "@sanity/icons";

export default function countryVariation({
  fields,
  groups = [],
}: {
  fields: Record<string, any>[];
  groups: Record<string, any>[];
}) {
  return {
    name: "countryVariation",
    title: "Country variation",
    type: "object",
    icon: EarthAmericasIcon,
    fields: [
      {
        name: "country",
        title: "Country",
        type: "string",
        options: {
          list: [
            { title: "GB", value: "gb" },
            { title: "US", value: "us" },
          ],
        },
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
        country: "country",
      },
      prepare(selection) {
        const { country } = selection;
        return {
          subtitle: "Country",
          title: country,
        };
      },
    },
  };
}

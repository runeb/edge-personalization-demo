import { PinIcon } from "@sanity/icons";
import { COUNTRIES } from "../../constants";

export default {
  name: "marketingRegion",
  title: "Marketing region",
  type: "document",
  icon: PinIcon,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Cities",
      name: "cities",
      type: "array",
      description: "Case-sensitive",
      of: [{ type: "string" }],
    },
    {
      title: "Region",
      name: "regions",
      type: "array",
      description: "Case-sensitive",
      of: [{ type: "string" }],
    },
    {
      title: "Countries",
      name: "countries",
      type: "array",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          name: "country",
          title: "Country",
          type: "string",
          options: { list: COUNTRIES },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title,
      };
    },
  },
};

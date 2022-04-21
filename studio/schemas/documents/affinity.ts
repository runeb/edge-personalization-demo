import { UsersIcon } from "@sanity/icons";

export default {
  name: "affinity",
  title: "Affinity",
  type: "document",
  icon: UsersIcon,
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
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

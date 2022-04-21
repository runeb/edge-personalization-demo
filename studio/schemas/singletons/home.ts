import { HomeIcon } from "@sanity/icons";

export default {
  name: "home",
  title: "Home",
  type: "document",
  icon: HomeIcon,
  fields: [
    {
      title: "Get started",
      name: "getStarted",
      type: "array",
      of: [
        {
          lists: [{ title: "Bullet", value: "bullet" }],
          styles: [{ title: "Heading", value: "h4" }],
          type: "block",
        },
      ],
    },
    {
      title: "About",
      name: "about",
      type: "array",
      of: [
        {
          lists: [{ title: "Bullet", value: "bullet" }],
          styles: [{ title: "Heading", value: "h4" }],
          type: "block",
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Home",
      };
    },
  },
};

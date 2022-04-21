type Schema = {
  fields: Record<string, any>[];
  groups?: Record<string, any>[];
  icon?: any;
  name: string;
  preview?: any;
  title: string;
};

/**
 * Creates a sanity document schema which passes through received props.
 * Also creates `variations` field - an array that maps over all variations with
 * passed fields.
 */
export default function createVariation({
  schema,
  variations,
}: {
  schema: Schema;
  variations: any[];
}) {
  const { fields, groups = [], icon, name, preview, title } = schema;

  const contentFields = fields.find((field) => field.name === "content").fields;

  const { content, seo, remainingFields } = fields.reduce(
    (acc, val) => {
      switch (val.name) {
        case "content": {
          acc.content = [val];
          break;
        }
        case "seo": {
          acc.seo = [val];
          break;
        }
        default: {
          acc.remainingFields = [...acc.remainingFields, val];
          break;
        }
      }

      return acc;
    },
    {
      content: [],
      seo: [],
      remainingFields: [],
    }
  );

  return {
    name,
    title,
    type: "document",
    icon,
    groups: [
      ...groups,
      {
        name: "variations",
        title: "Content Variations",
      },
    ],
    fields: [
      ...content,
      ...remainingFields,
      {
        name: "variations",
        title: "Content Variations",
        type: "array",
        group: "variations",
        of: variations.map((variation) =>
          variation({ fields: contentFields, groups })
        ),
      },
      ...seo,
    ],
    preview,
  };
}

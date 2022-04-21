import { EarthAmericasIcon } from "@sanity/icons";
import { US_STATES } from "../../../constants";

export default function stateVariation({
  fields,
  groups = [],
}: {
  fields: Record<string, any>[];
  groups: Record<string, any>[];
}) {
  return {
    name: "stateVariation",
    title: "State variation",
    type: "object",
    icon: EarthAmericasIcon,
    fields: [
      {
        name: "state",
        title: "State",
        type: "string",
        options: {
          list: US_STATES,
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
        state: "state",
      },
      prepare(selection) {
        const { state } = selection;
        return {
          subtitle: `State: ${state}`,
          title: "Variation: State",
        };
      },
    },
  };
}

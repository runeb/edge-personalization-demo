import { Badge, Box, Card, Code, Flex } from "@sanity/ui";
import React, { ReactNode } from "react";

interface Props {
  affinity?: string;
  children: ReactNode;
  isVariation?: boolean;
  label: string;
}

const ComponentWrapper = (props: Props) => {
  const { affinity, children, isVariation, label } = props;
  return (
    <Flex style={{ borderBottom: "1px solid #eee" }}>
      <Flex flex={1} padding={4}>
        {/* Component label */}
        <Box style={{ minWidth: "150px" }}>
          <Badge
            fontSize={1}
            mode={isVariation ? "default" : "outline"}
            padding={2}
            tone={isVariation ? "primary" : "default"}
          >
            {label}
          </Badge>

          {affinity && isVariation && (
            <Card marginTop={4}>
              <Code size={0}>Affinity: {affinity || "Fallback"}</Code>
            </Card>
          )}
        </Box>
        <Flex flex={1} justify="center">
          <Box flex={1} style={{ maxWidth: "1280px" }}>
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ComponentWrapper;

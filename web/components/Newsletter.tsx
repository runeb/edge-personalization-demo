import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Stack,
  Text,
  TextInput,
} from "@sanity/ui";
import React from "react";
import { SectionNewsletter } from "../types";
import ComponentWrapper from "./ComponentWrapper";

interface Props {
  affinity?: string;
  newsletter: SectionNewsletter;
}

const Newsletter = (props: Props) => {
  const { affinity, newsletter } = props;
  return (
    <ComponentWrapper
      affinity={affinity}
      isVariation={newsletter?.isVariation}
      label="Newsletter"
    >
      <Card>
        <Stack space={4}>
          {/* Title */}
          {newsletter?.title && (
            <Box marginTop={2}>
              <Heading align="center" size={3} style={{ fontWeight: 500 }}>
                {newsletter.title}{" "}
              </Heading>
            </Box>
          )}
          {/* Description */}
          {newsletter?.description && (
            <Box>
              <Text align="center" muted size={2}>
                {newsletter.description}
              </Text>
            </Box>
          )}
          {/* Form */}
          <Flex gap={2} justify="center" marginTop={2}>
            <TextInput placeholder="Email" />
            <Button disabled radius={1} text="Submit" />
          </Flex>
        </Stack>
      </Card>
    </ComponentWrapper>
  );
};

export default Newsletter;

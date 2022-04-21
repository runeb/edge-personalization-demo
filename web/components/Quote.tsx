import { Card, Heading, Label, Stack, Text } from "@sanity/ui";
import React from "react";
import { SectionQuote } from "../types";
import ComponentWrapper from "./ComponentWrapper";

interface Props {
  affinity?: string;
  quote: SectionQuote;
}

const Quote = (props: Props) => {
  const { affinity, quote } = props;
  return (
    <ComponentWrapper
      affinity={affinity}
      isVariation={quote?.isVariation}
      label="Quote"
    >
      <Card paddingY={2}>
        <Stack space={4}>
          {/* Eyebrow */}
          {quote?.eyebrow && (
            <Label align="center" muted size={1}>
              {quote.eyebrow}
            </Label>
          )}
          {/* Title */}
          {quote?.title && (
            <Heading align="center" size={3} style={{ fontWeight: 500 }}>
              {quote.title}
            </Heading>
          )}
          {/* Description */}
          {quote?.description && (
            <Text align="center" muted size={2}>
              {quote.description}
            </Text>
          )}
        </Stack>
      </Card>
    </ComponentWrapper>
  );
};

export default Quote;

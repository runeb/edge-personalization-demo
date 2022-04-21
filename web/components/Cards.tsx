import { Box, Card, Flex, Heading, Label, Stack, Text } from "@sanity/ui";
import React from "react";
import { SectionCards } from "../types";
import ComponentWrapper from "./ComponentWrapper";
import SanityImage from "./SanityImage";

interface Props {
  affinity?: string;
  cards: SectionCards;
}

const Cards = (props: Props) => {
  const { affinity, cards } = props;
  return (
    <ComponentWrapper
      affinity={affinity}
      isVariation={cards?.isVariation}
      label="Cards"
    >
      <Card>
        <Flex flex={1} justify="center">
          <Stack space={3}>
            {/* Title */}
            {cards?.title && (
              <Box marginTop={2}>
                <Heading align="center" size={3} style={{ fontWeight: 500 }}>
                  {cards.title}
                </Heading>
              </Box>
            )}
            {/* Description */}
            {cards?.description && (
              <Box marginTop={2}>
                <Text align="center" muted size={2}>
                  {cards.description}
                </Text>
              </Box>
            )}

            {/* Cards */}
            <Flex
              direction={["column", "column", "column", "row"]}
              gap={4}
              marginTop={4}
            >
              {cards?.cards?.map((card, index) => {
                return (
                  <Card
                    flex={["auto", "auto", "auto", 1]}
                    key={index}
                    radius={2}
                    shadow={1}
                  >
                    {/* Image */}
                    <Box
                      style={{
                        height: "200px",
                        position: "relative",
                        width: "100%",
                      }}
                    >
                      <SanityImage
                        crop={card.image?.crop}
                        hotspot={card.image?.hotspot}
                        layout="fill"
                        objectFit="cover"
                        sizes={["100vw", null, "50vw"]}
                        src={card.image?.asset._ref}
                      />
                    </Box>

                    <Box padding={4}>
                      {/* Eyebrow */}
                      {card?.eyebrow && (
                        <Label muted size={1}>
                          {card.eyebrow}
                        </Label>
                      )}
                      {/* Title */}
                      {card?.title && (
                        <Text size={3} weight="medium">
                          {card.title}
                        </Text>
                      )}
                      {/* Description */}
                      {card?.description && (
                        <Box marginTop={4}>
                          <Text muted size={2}>
                            {card.description}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Card>
                );
              })}
            </Flex>
          </Stack>
        </Flex>
      </Card>
    </ComponentWrapper>
  );
};

export default Cards;

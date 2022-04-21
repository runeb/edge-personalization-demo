import { Box, Card, Grid, Heading, Label, Stack, Text } from "@sanity/ui";
import React from "react";
import { SectionHero } from "../types";
import ComponentWrapper from "./ComponentWrapper";
import SanityImage from "./SanityImage";

interface Props {
  affinity?: string;
  hero: SectionHero;
}

const Hero = (props: Props) => {
  const { affinity, hero } = props;
  return (
    <ComponentWrapper
      affinity={affinity}
      isVariation={hero?.isVariation}
      label="Hero"
    >
      <Grid columns={[1, 1, 1, 2]} flex={1}>
        <Card paddingBottom={4} paddingRight={4} paddingTop={2}>
          <Stack space={4} style={{ maxWidth: "400px" }}>
            {/* Eyebrow */}
            {hero?.eyebrow && (
              <Label muted size={1}>
                {hero.eyebrow}
              </Label>
            )}
            {/* Title */}
            {hero?.title && (
              <Heading size={3} style={{ fontWeight: 500 }}>
                {hero.title}
              </Heading>
            )}
            {/* Description */}
            {hero?.description && (
              <Text muted size={2} style={{ maxWidth: "480px" }}>
                {hero.description}
              </Text>
            )}
          </Stack>
        </Card>
        {/* Image */}
        <Box>
          {hero?.image && (
            <Card
              radius={2}
              overflow="hidden"
              style={{
                position: "relative",
                height: "300px",
                width: "100%",
              }}
            >
              <SanityImage
                crop={hero.image?.crop}
                hotspot={hero.image?.hotspot}
                layout="fill"
                objectFit={hero.image?.contain ? "contain" : "cover"}
                sizes={["100vw", null, "50vw"]}
                src={hero.image?.asset._ref}
              />
            </Card>
          )}
        </Box>
      </Grid>
    </ComponentWrapper>
  );
};

export default Hero;

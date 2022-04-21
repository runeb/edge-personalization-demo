import { Box, Card, Flex, Heading } from "@sanity/ui";
import React from "react";
import { SectionBanner } from "../types";
import ComponentWrapper from "./ComponentWrapper";
import SanityImage from "./SanityImage";

interface Props {
  affinity?: string;
  banner: SectionBanner;
}

const Banner = (props: Props) => {
  const { affinity, banner } = props;
  return (
    <ComponentWrapper
      affinity={affinity}
      isVariation={banner?.isVariation}
      label="Banner"
    >
      {/* Image */}
      <Box>
        {banner?.image && (
          <Card
            radius={2}
            overflow="hidden"
            style={{
              background: "black",
              position: "relative",
              height: "350px",
              width: "100%",
            }}
          >
            <Box
              style={{
                height: "100%",
                opacity: 0.8,
                position: "absolute",
                top: 0,
                width: "100%",
              }}
            >
              <SanityImage
                crop={banner.image?.crop}
                hotspot={banner.image?.hotspot}
                layout="fill"
                objectFit="cover"
                sizes={["100vw", null, "50vw"]}
                src={banner.image?.asset._ref}
              />
            </Box>
            <Flex
              align="center"
              flex={1}
              justify="center"
              style={{ color: "white", height: "100%" }}
            >
              {banner?.title && (
                <Heading size={5} style={{ fontWeight: 500 }}>
                  {banner.title}
                </Heading>
              )}
            </Flex>
          </Card>
        )}
      </Box>
    </ComponentWrapper>
  );
};

export default Banner;

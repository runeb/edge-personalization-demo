import { ArrowLeftIcon } from "@sanity/icons";
import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Stack,
  Text,
  Tooltip,
} from "@sanity/ui";
import React from "react";
interface Props {
  pathname: string;
}

const Footer = (props: Props) => {
  const { pathname } = props;

  const handleBack = () => {
    // TODO: use next/router or next/link once we have a solve for running middleware in client side routes
    window.location.href = "/";
  };

  return (
    <Card radius={0} shadow={1} tone="default">
      <Flex align="center" justify="space-between">
        <Box overflow="hidden" padding={4}>
          <Code size={0} weight="regular">
            Next.js pathname: {pathname}
          </Code>
        </Box>
        <Box padding={3} style={{ flexShrink: 0 }}>
          <Button
            fontSize={1}
            icon={ArrowLeftIcon}
            mode="ghost"
            onClick={handleBack}
            tone="default"
          />
        </Box>
      </Flex>
    </Card>
  );
};

export default Footer;

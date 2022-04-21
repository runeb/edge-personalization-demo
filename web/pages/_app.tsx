import { ThemeProvider, studioTheme, Card, Box, Text } from "@sanity/ui";
import { PortableTextComponentsProvider } from "@portabletext/react";
import type { AppProps } from "next/app";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    overflow-x: hidden;
  }
`;

const StyledHeader = styled(Box)`
  &:first-of-type {
    margin-top: 0;
  }
`;

const StyledP = styled(Box)`
  &:first-of-type {
    margin-top: 0;
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={studioTheme}>
        <PortableTextComponentsProvider
          components={{
            block: {
              h4: ({ children }) => (
                <StyledHeader marginBottom={4} marginTop={6}>
                  <Text size={3} weight="medium">
                    {children}
                  </Text>
                </StyledHeader>
              ),
              normal: ({ children }) => (
                <StyledP marginY={4}>
                  <Text size={2}>{children}</Text>
                </StyledP>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <Card
                  marginY={5}
                  paddingX={4}
                  paddingY={2}
                  radius={2}
                  shadow={1}
                >
                  <Box as="ul" padding={0}>
                    {children}
                  </Box>
                </Card>
              ),
            },
            listItem: {
              bullet: ({ children }) => (
                <Box as="li" marginY={3} style={{ listStyle: "none" }}>
                  <Text size={1}>{children}</Text>
                </Box>
              ),
            },
          }}
        >
          <Component {...pageProps} />
        </PortableTextComponentsProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

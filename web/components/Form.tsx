import {
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Select,
  Stack,
  Text,
  TextInput,
} from "@sanity/ui";
import Cookies from "js-cookie";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { COUNTRIES } from "../constants";
import { COOKIES } from "../types";
import clearCookies from "../utils/clearCookies";

interface Props {
  affinities: string[];
  pages: {
    slug: string;
    title: string;
  }[];
}

const COOKIE_EXPIRY = 1 / 24 / 60; // 1 minute

const Form = (props: Props) => {
  const { affinities, pages } = props;

  const [affinity, setAffinity] = useState<string>();
  const [city, setCity] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [overrideGeolocation, setOverrideGeolocation] = useState(false);
  const [pageSlug, setPageSlug] = useState<string>(pages[0]?.slug);
  const [region, setRegion] = useState<string>();

  const handleAffinityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAffinity(event.target.value);
  };

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const handleOverrideChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOverrideGeolocation(event.target.checked);
  };

  const handlePageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSlug(event.target.value);
  };

  const handleRegionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRegion(event.target.value);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    // Clear previous cookies
    clearCookies();

    // Set cookies
    if (affinity) {
      Cookies.set(COOKIES.affinity, affinity, { expires: COOKIE_EXPIRY });
    }

    if (overrideGeolocation) {
      if (city) {
        Cookies.set(COOKIES.city, city, { expires: COOKIE_EXPIRY });
      }
      if (country) {
        Cookies.set(COOKIES.country, country, { expires: COOKIE_EXPIRY });
      }
      if (region) {
        Cookies.set(COOKIES.region, region, { expires: COOKIE_EXPIRY });
      }
    }

    // TODO: use next/router once we have a solve for running middleware in client side routes
    window.location.href = `/pages/${pageSlug}`;

    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          {/* Page */}
          <Stack space={2}>
            <Text size={1} weight="medium">
              Page
            </Text>
            <Select fontSize={2} onChange={handlePageChange} padding={3}>
              {pages.map((page) => (
                <option key={page.slug}>{page.title}</option>
              ))}
            </Select>
          </Stack>

          {/* Affinity */}
          <Stack space={2}>
            <Text size={1} weight="medium">
              Affinity
            </Text>
            <Select fontSize={2} onChange={handleAffinityChange} padding={3}>
              <option label="None" />
              {affinities.map((affinity) => (
                <option key={affinity}>{affinity}</option>
              ))}
            </Select>
          </Stack>

          <Card
            padding={3}
            radius={2}
            shadow={1}
            tone={overrideGeolocation ? "caution" : "default"}
          >
            <Stack space={4}>
              <Flex align="center">
                <Checkbox
                  checked={overrideGeolocation}
                  id="checkbox"
                  onChange={handleOverrideChange}
                />
                <Box flex={1} paddingLeft={2}>
                  <Text size={1} weight="medium">
                    <label htmlFor="checkbox">
                      Override Vercel edge geolocation
                    </label>
                  </Text>
                </Box>
              </Flex>

              {overrideGeolocation && (
                <>
                  {/* City */}
                  <Stack space={2}>
                    <Text size={1} weight="medium">
                      City
                    </Text>
                    <Card>
                      <TextInput
                        onChange={handleCityChange}
                        placeholder="E.g. Clifton"
                      />
                    </Card>
                  </Stack>

                  {/* Region */}
                  <Stack space={2}>
                    <Text size={1} weight="medium">
                      Region
                    </Text>
                    <Card>
                      <TextInput
                        onChange={handleRegionChange}
                        placeholder="e.g. IL, KI, MN, OH, SD, WI"
                      />
                    </Card>
                  </Stack>

                  {/* Country */}
                  <Stack space={2}>
                    <Text size={1} weight="medium">
                      Country
                    </Text>
                    <Card>
                      <Select
                        fontSize={2}
                        onChange={handleCountryChange}
                        padding={3}
                        value={country}
                      >
                        <option disabled label="Select country" selected />
                        {COUNTRIES.map((country) => (
                          <option key={country.value} value={country.value}>
                            {country.title}
                          </option>
                        ))}
                      </Select>
                    </Card>
                  </Stack>
                </>
              )}
            </Stack>
          </Card>

          <Button
            disabled={!pageSlug}
            fontSize={2}
            onClick={handleSubmit}
            padding={3}
            text="Continue"
            tone="primary"
            type="submit"
          />
        </Stack>
      </Card>
    </form>
  );
};

export default Form;

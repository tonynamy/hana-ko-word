"use client";

import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Nav } from "../components/nav";
import { Providers } from "./providers";
import { useCurrentSiteInfo } from "./site-info";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { sitemap, parent } = useCurrentSiteInfo();
  return (
    <Providers>
      <Flex h="100%" direction="column">
        <Nav title={sitemap.title} back={parent} />
        {children}
      </Flex>
    </Providers>
  );
};

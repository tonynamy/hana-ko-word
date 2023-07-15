"use client";

import { LinkButton, Page } from "@/components";
import { Flex, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <Page alignItems="center">
      <Flex direction="column" alignItems="center" gap={6}>
        <Heading>Let's Study!!!</Heading>
        <LinkButton href="/study">Study!</LinkButton>
        <LinkButton href="/test">Test!</LinkButton>
        <LinkButton href="/list">Go to List</LinkButton>
      </Flex>
    </Page>
  );
}

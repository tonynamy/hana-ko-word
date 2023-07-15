import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, IconButtonProps } from "@chakra-ui/react";
import NextLink from "next/link";

type BackLinkProps = { to: string } & Omit<IconButtonProps, "icon">;

const BackLink = ({ to, ...props }: BackLinkProps) => (
  <NextLink href={to}>
    <IconButton icon={<ArrowBackIcon />} {...props} />
  </NextLink>
);

type NavProps = {
  title: string;
  back?: string;
};

export const Nav = ({ title, back }: NavProps) => (
  <Box
    flexGrow={0}
    borderBottomWidth="1px"
    bg="bg.accent.default"
    position="relative"
    zIndex="tooltip"
    py={4}
  >
    <Flex alignItems="center" justify="space-between" px={8}>
      <BackLink
        to={back ?? ""}
        aria-label="Go Back"
        visibility={back ? "visible" : "hidden"}
        width={10}
      />
      <Flex direction="row" justifyContent="center" flexGrow={1} ml={-10}>
        {title}
      </Flex>
    </Flex>
  </Box>
);

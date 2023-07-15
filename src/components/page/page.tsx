import { Flex, FlexProps } from "@chakra-ui/react";

type PageProps = FlexProps;

export const Page = (props: PageProps) => (
  <Flex
    direction="column"
    justifyContent="center"
    flexGrow={1}
    paddingX={{
      base: 10,
      md: 150,
      lg: 200,
      xl: 300,
      "2xl": 500,
    }}
    {...props}
  />
);

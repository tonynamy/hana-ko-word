import { Button, ButtonProps } from "@chakra-ui/react";
import NextLink from "next/link";

type LinkButtonProps = {
  href: string;
} & ButtonProps;

export const LinkButton = ({ href, ...props }: LinkButtonProps) => (
  <NextLink href={href}>
    <Button {...props} />
  </NextLink>
);

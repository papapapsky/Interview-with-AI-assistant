import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  link: string;
}

export const HyperLink = ({ link, children }: Props) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="HyperLink"
    >
      {children}
    </a>
  );
};

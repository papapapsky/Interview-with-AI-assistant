import { NavLink } from "react-router-dom";

type TypeLinkProps = {
  children: string;
  to: string;
  className?: string;
  index?: boolean;
};

export const CustomLink = ({ children, to, className }: TypeLinkProps) => {
  return (
    <NavLink to={to} className={className}>
      {children}
    </NavLink>
  );
};

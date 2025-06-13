import { NavLink } from "react-router-dom";

type TypeLinkProps = {
  children: string;
  to: string;
  index?: boolean;
};

export const CustomLink: React.FC<TypeLinkProps> = ({ children, to }) => {
  return (
    <NavLink to={to} className="">
      {children}
    </NavLink>
  );
};

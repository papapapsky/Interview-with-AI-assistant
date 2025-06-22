import "./notFoundPage.css";
import { CustomLink } from "../CustomLink";

export const NotFoundPage = () => {
  return (
    <div className="NotFoundPage">
      <h1>Page not found</h1>
      <CustomLink to="/">Go to Homepage</CustomLink>
    </div>
  );
};

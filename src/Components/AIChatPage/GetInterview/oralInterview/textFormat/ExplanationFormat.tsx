import "./textFormat.css";

type Props = {
  text: string;
};

export const TextFormat = ({ text }: Props) => {
  const parts = text.split(/(?<!\\)(\*\*[^*]+\*\*|`[^`]+`)/);

  return (
    <h4>
      {parts.map((part, index) => {
        if (!part) return null;

        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        } else if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code className="code language-javascript" key={index}>
              {part.slice(1, -1)}
            </code>
          );
        } else {
          return (
            <div key={index} style={{ display: "inline" }}>
              {part.replace(/\\`/g, "`").replace(/\\\*/g, "*")}
            </div>
          );
        }
      })}
    </h4>
  );
};

import { useState } from "react";
import Prism from "prismjs"; // Import Prism for syntax highlighting
import "prismjs/themes/prism.css";

const Code = ({ code, width, height, position, language = "javascript", onClick }) => {
  const [codeContent, setCodeContent] = useState(code || "");

  // Automatically detect and highlight syntax based on the selected language
  const getLanguageClass = (language) => {
    const safeLanguage = (typeof language === 'string' && language) ? language.toLowerCase() : 'javascript';
    switch (safeLanguage) {
      case 'python':
        return 'python';
      case 'c':
        return 'c';
      case 'javascript':
        return 'javascript';
      default:
        return 'javascript';
    }
  };

  const languageClass = getLanguageClass(language);
  const highlightedCode = Prism.highlight(codeContent, Prism.languages[languageClass], languageClass);

  const containerStyle = {
    position: "absolute",
    width: `${width}%`,
    height: `${height}%`,
    left: `${position?.x}%`,
    top: `${position?.y}%`,
    zIndex: 10,
    border: "3px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
  };

  const codeStyle = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    padding: "10px",
  };

  return (
    <div style={containerStyle} onClick={onClick}>
      <pre style={codeStyle}>
        <code
          className={`language-${languageClass}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

export default Code;
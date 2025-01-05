import React from "react";

/**
 * Format any structured response text into JSX for React rendering
 * @param {string} response - The raw response text from the chatbot API
 * @returns {JSX.Element} - Formatted HTML for rendering
 */
export const formatText = (text) => {
  const lines = text.split("\n");
  let isInCodeBlock = false; // To track if we are inside a code block
  const codeLines = []; // To accumulate code block content
  const result = [];

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Detect headings (e.g., lines starting with "###", "##", or "#")
    if (/^#{1,6}\s/.test(trimmed)) {
      const headingLevel = trimmed.match(/^#{1,6}/)[0].length;
      const content = trimmed.replace(/^#{1,6}\s*/, "");
      result.push(
        React.createElement(`h${headingLevel}`, { key: index }, content)
      );
      return;
    }

    // Detect bullet points (lines starting with "* " or "- ")
    if (/^[-*]\s/.test(trimmed)) {
      result.push(<li key={index}>{trimmed.replace(/^[-*]\s*/, "")}</li>);
      return;
    }

    // Detect blockquotes (lines starting with ">")
    if (/^>\s/.test(trimmed)) {
      result.push(
        <blockquote key={index}>{trimmed.replace(/^>\s*/, "")}</blockquote>
      );
      return;
    }

    // Detect code blocks (lines surrounded by triple backticks ```)
    if (trimmed.startsWith("```") && !isInCodeBlock) {
      isInCodeBlock = true;
      return; // Skip the opening code block line
    }

    if (isInCodeBlock) {
      if (trimmed === "```") {
        result.push(
          <pre
            key={index}
            style={{
              backgroundColor: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              overflowX: "auto",
            }}
          >
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        isInCodeBlock = false;
        codeLines.length = 0; // Reset codeLines for future code blocks
        return;
      }
      codeLines.push(trimmed);
      return;
    }

    // Detect empty lines for spacing
    if (trimmed === "") {
      result.push(<br key={index} />);
      return;
    }

    // Default: render as a paragraph
    result.push(<p key={index}>{line}</p>);
  });

  return result;
};

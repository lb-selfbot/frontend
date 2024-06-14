import React from "react";

import Typography from "@mui/material/Typography/Typography";
import Box from "@mui/material/Box/Box";

function renderImage(image, index) {
  // Get the source of the image
  const source = "/" + RegExp('Source="(.*?)"').exec(image[1])[1];

  // Get the width of the image and try to parse it as a number
  const rawWidth = RegExp('Width="(.*?)"').exec(image[1])[1];
  const intWidth = parseInt(rawWidth, 10);
  const width = isNaN(intWidth) ? rawWidth : intWidth;

  // Check if image is centered
  const centered = image[1].includes("Centered");

  // Render the image
  const imageComponent = (
    <img
      src={source}
      alt=""
      style={{
        maxWidth: "100%",
        width: `${width}px`,
        height: "auto", // Ignore height so image can be responsive along with maxWidth
      }}
    />
  );

  if (centered) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} key={index}>
        {imageComponent}
      </Box>
    );
  } else {
    return imageComponent;
  }
}

function getTextComponent(content, color = "inherit") {
  return (
    <Typography
      fontFamily="Roboto Mono, monospace"
      fontWeight="300"
      color={color}
      key={content}
    >
      {content}
    </Typography>
  );
}

function renderText(text, index) {
  // Get the color of the text
  const color = RegExp('Color="(.*?)"').exec(text[1])[1];

  // Check if the text is centered
  const centered = text[1].includes("Centered");

  const content = text[2];

  // Render the text
  const textComponent = getTextComponent(content, color);

  if (centered) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }} key={index}>
        {textComponent}
      </Box>
    );
  } else {
    return textComponent;
  }
}

function parseConsoleText(rawContent) {
  rawContent = rawContent ?? "";
  const splitContent = rawContent.split("\n");

  const consoleContent = [];

  for (let i = 0; i < splitContent.length; i++) {
    var line = splitContent[i];

    if (line === "") {
      consoleContent.push(<pre key={i}></pre>);
      continue;
    }

    const imageRegex = RegExp("<image(.*?)/>");
    var images = [];

    var matches = [];
    while ((matches = imageRegex.exec(line)) !== null) {
      line = line.replace(matches[0], "");
      images.push(matches);
    }

    const textRegex = RegExp("<text(.*?)>(.*?)</text>");
    var texts = [];

    while ((matches = textRegex.exec(line)) !== null) {
      line = line.replace(matches[0], "");
      texts.push(matches);
    }

    for (const image of images) {
      consoleContent.push(renderImage(image, i));
    }

    if (texts.length > 1) {
      // Put all texts on a single line
      const renderedTexts = texts.map((text) => renderText(text, i));
      consoleContent.push(
        <Box sx={{ display: "flex" }} key={i}>
          {renderedTexts}
        </Box>
      );
    } else if (texts.length === 1) {
      consoleContent.push(renderText(texts[0], i));
    }
  }

  return consoleContent;
}

export { parseConsoleText };

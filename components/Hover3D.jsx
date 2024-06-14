import React from "react";

import Box from "@mui/material/Box/Box";

import styles from "../styles/Hover3D.module.css";

function Hover3D(props) {
  const inputRef = React.useRef(null);
  const glowRef = React.useRef(null);
  let bounds;

  const rotateToMouse = (e) => {
    bounds = inputRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    inputRef.current.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;

    glowRef.current.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + bounds.width / 2}px
        ${center.y * 2 + bounds.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;
  };
  const removeListener = (e) => {
    inputRef.current.style.transform = "";
    inputRef.current.style.background = "";
  };

  return (
    <Box>
      <Box className={styles.app}>
        <Box
          ref={inputRef}
          sx={{ backgroundImage: `url(${props.image})` }}
          className={styles.card}
          onMouseLeave={removeListener}
          onMouseMove={rotateToMouse}
        >
          <Box ref={glowRef} className={styles.glow} />
        </Box>
      </Box>
    </Box>
  );
}

export { Hover3D };

import React from "react";

import AccordionSummary from "@mui/material/AccordionSummary/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails/AccordionDetails";
import Typography from "@mui/material/Typography/Typography";
import Accordion from "@mui/material/Accordion/Accordion";
import Box from "@mui/material/Box/Box";

import ExpandMore from "@mui/icons-material/ExpandMore";

import styles from "../styles/FAQ.module.css";

function FAQAnswer(props) {
  const expandIcon = <ExpandMore htmlColor="rgb(238, 238, 239)" />;
  const { question, answer } = props;

  return (
    <Accordion className={styles.faqAccordion}>
      <AccordionSummary expandIcon={expandIcon}>
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography
          component="span"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </AccordionDetails>
    </Accordion>
  );
}

function FAQAnswerContainer({ children, title }) {
  return (
    <Box className={styles.faqContainer}>
      <Typography variant="h2" className={styles.faqTitle}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

FAQAnswer.Container = FAQAnswerContainer;

export { FAQAnswer };

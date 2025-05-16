import React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "Our return policy lasts 30 days. If 30 days have passed since your purchase, unfortunately we cannot offer you a refund or exchange.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary depending on your location. Typically, orders are delivered within 3-7 business days.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping costs and delivery times vary based on destination.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you'll receive an email with a tracking number so you can follow its progress.",
  },
  {
    question: "Who do I contact for support?",
    answer:
      "For any support inquiries, please email us at support@example.com or call our support hotline at (123) 456-7890.",
  },
];

const FAQ = () => {
  return (
    <Container  sx={{ mb: 6,}}>
      <Box
        sx={{
          backgroundColor: "#f4faff",
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "primary.dark",
            borderBottom: "2px solid",
            borderBottomColor: "primary.light",
            pb: 1,
          }}
        >
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              borderRadius: 2,
              backgroundColor: "#fff",
              "&:before": { display: "none" },
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography
                variant="h6"
                sx={{ color: "primary.dark", fontWeight: "medium" }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.6,
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;

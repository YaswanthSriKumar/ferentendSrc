import React from "react";
import { Box, Grid, Card, CardContent, Typography, Avatar } from "@mui/material";

const testimonials = [
  {
    id: 1,
    name: "Alice Brown",
    role: "Marketing Manager",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    testimonial:
      "I love this product! It has improved my workflow significantly. Highly recommended!",
  },
  {
    id: 2,
    name: "Michael Smith",
    role: "CEO, Tech Innovators",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    testimonial:
      "The level of service is excellent and the product is a game changer!",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Senior Developer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    testimonial:
      "A beautifully designed app that has saved me so much time. Kudos to the team!",
  },
];

const Testimonials = () => {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        my: 4,
        p: 4,
        background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        borderRadius: 4,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 4,
          color: "#333",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        What Our Clients Say
      </Typography>
      <Grid container spacing={4} alignItems="stretch">
        {testimonials.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                position: "relative",
                overflow: "visible",
                borderRadius: 4,
                boxShadow: 3,
                transition: "all 0.3s ease-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
                },
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent
                sx={{ pt: 6, textAlign: "center", px: 2, pb: 3, flexGrow: 1 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    mb: 2,
                    color: "gray",
                  }}
                >
                  "{item.testimonial}"
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#444" }}>
                  {item.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: "primary.main", mt: 1 }}
                >
                  {item.role}
                </Typography>
              </CardContent>
              <Avatar
                src={item.avatar}
                alt={item.name}
                sx={{
                  width: 80,
                  height: 80,
                  position: "absolute",
                  top: -40,
                  left: "calc(50% - 40px)",
                  border: "3px solid white",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Testimonials;

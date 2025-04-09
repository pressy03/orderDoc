import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// A simple home route for testing
app.get("/", (req, res) => {
  res.send("Hello World from backend");
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});

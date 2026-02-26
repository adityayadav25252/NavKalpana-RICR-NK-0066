<<<<<<< HEAD
const app = require("./src/app");

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
=======
require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
>>>>>>> eb86250e8d4fc78104a086de5be98189f1eafaf3
});
import express from "express";
import "express-async-errors";
import cors from "cors";
import { corsOptions } from "./src/utils/corsOptions";
import { router } from "./src/routes";
import { errorHandler } from "./src/middlewares/error.handler";

// Initialize passport
import "./src/utils/auth";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

// Routes
app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

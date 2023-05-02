import { CorsOptions } from "cors";

// Only those origins can do requests
const whitelist = [
  "http://localhost:8080",
  "https://myapp.com",
  "http://localhost:5173",
];

export const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin as string) || !origin) cb(null, true);
    else cb(new Error("Access forbbiden"));
  },
};

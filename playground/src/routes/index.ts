import { Router } from "express";
import { readdirSync } from "fs";

export const router = Router();
const DIR_PATH = __dirname;

const cleanFileName = (fileName: string) => {
  return fileName.split(".").shift();
};

readdirSync(DIR_PATH).filter((fileName) => {
  const clearName = cleanFileName(fileName);
  if (clearName !== "index") {
    import(`./${clearName}.routes`).then((moduleRouter) => {
      router.use(`/api/v1/${clearName}`, moduleRouter.router);
    });
  }
});

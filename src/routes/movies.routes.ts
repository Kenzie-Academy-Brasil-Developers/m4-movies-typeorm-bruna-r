import { Router } from "express";
import {
  createMovie,
  deleteMovie,
  readMovie,
  updateMovie,
} from "../controllers/movies.controllers";
import { ensureBodyValidMiddleware } from "../middlewares/ensureBodyValid.middleware";
import { movieSchemaRequest } from "../schemas/movies.schema";
import { ensureNameExistMiddleware } from "../middlewares/ensureNameExist.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureBodyValidMiddleware(movieSchemaRequest),
  ensureNameExistMiddleware,
  createMovie
);
moviesRoutes.get("", readMovie);
moviesRoutes.patch(
  "",
  ensureBodyValidMiddleware(movieSchemaRequest),
  updateMovie
);
moviesRoutes.delete("", deleteMovie);

export { moviesRoutes };

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
import { ensureIdExistMiddleware } from "../middlewares/ensureIdExist.middleware";

const moviesRoutes: Router = Router();

/*moviesRoutes.post(
  "",
  ensureBodyValidMiddleware(movieSchemaRequest),
  ensureNameExistMiddleware,
  createMovie
);

moviesRoutes.get("", readMovie);

moviesRoutes.patch(
  "",
  ensureIdExistMiddleware,
  ensureBodyValidMiddleware(movieSchemaRequest),
  ensureNameExistMiddleware,
  updateMovie
);

moviesRoutes.delete("", ensureIdExistMiddleware, deleteMovie);

export { moviesRoutes };*/

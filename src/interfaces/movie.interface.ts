import { z } from "zod";
import { movieSchema, movieSchemaRequest } from "../schemas/movies.schema";

type TMovie = z.infer<typeof movieSchema>;
type TMovieRequest = z.infer<typeof movieSchemaRequest>;

export { TMovie, TMovieRequest };

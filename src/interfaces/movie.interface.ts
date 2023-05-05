import { z } from "zod";
import {
  movieSchema,
  movieSchemaRequest,
  movieSchemaRequestUpdate,
  moviesSchema,
} from "../schemas/movies.schema";

type TMovie = z.infer<typeof movieSchema>;
type TMovieRequest = z.infer<typeof movieSchemaRequest>;
type TMovieRequestUpdate = z.infer<typeof movieSchemaRequestUpdate>;
type TMovies = z.infer<typeof moviesSchema>;

type TMoviePagination = {
  prevPage: string | null | undefined;
  nextPage: string | null | undefined;
  count: number;
  data: TMovies;
};

export {
  TMovie,
  TMovieRequest,
  TMovieRequestUpdate,
  TMovies,
  TMoviePagination,
};

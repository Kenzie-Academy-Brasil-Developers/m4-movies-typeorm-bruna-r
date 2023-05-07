import { Request, Response } from "express";
import {
  TMovie,
  TMoviePagination,
  TMovieRequest,
  TMovieRequestUpdate,
} from "../interfaces/movie.interface";
import { createMovieServices } from "../services/movies/createMovie.services";
import { movieSchema } from "../schemas/movies.schema";
import { readMovieServices } from "../services/movies/readMovie.services";
import { deleteMovieServices } from "../services/movies/deleteMovie.services";
import { updateMovieServices } from "../services/movies/updateMovie.services";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload: TMovieRequest = req.body;

  const newMovie: TMovie = await createMovieServices(payload);

  const movie: TMovie = movieSchema.parse(newMovie);

  return res.status(201).json(movie);
};

const readMovie = async (req: Request, res: Response): Promise<Response> => {
  const page: number | undefined = Number(req.query.page);
  const perPage: number | undefined = Number(req.query.perPage);
  const sort: string | undefined = req.query.sort?.toString();
  const order: string | undefined = req.query.order?.toString();

  const movies: any = await readMovieServices(page, perPage, sort, order);
  console.log(movies);

  return res.status(200).json(movies);
};
const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload: TMovieRequestUpdate = req.body;
  const idMovie: number = parseInt(req.params.id);
  const oldMovie: TMovie = res.locals.movie;

  const moviesUpdate: TMovie = await updateMovieServices(
    payload,
    idMovie,
    oldMovie
  );

  return res.status(200).json(moviesUpdate);
};
const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const movie: TMovie = res.locals.movie;

  await deleteMovieServices(movie);

  return res.status(204).send();
};

export { createMovie, readMovie, updateMovie, deleteMovie };

import { Request, Response } from "express";
import { TMovie, TMovieRequest } from "../interfaces/movie.interface";
import { createMovieServices } from "../services/movies/createMovie.services";
import { movieSchema } from "../schemas/movies.schema";
import { readMovieServices } from "../services/movies/readMovie.services";
import { deleteMovieServices } from "../services/movies/deleteMovie.services";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload: TMovieRequest = req.body;

  const newMovie: TMovie = await createMovieServices(payload);

  const movie: TMovie = movieSchema.parse(newMovie);

  return res.status(201).json(movie);
};

const readMovie = async (req: Request, res: Response): Promise<Response> => {
  const page: number | undefined = Number(req.query.page);
  const perPage: number | undefined = Number(req.query.perPage);
  const sort: string | undefined = String(req.query.sort);
  const order: string | undefined = String(req.query.order);

  const movies = await readMovieServices(page, perPage, sort, order);

  return res.send();
};
const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;

  return res.status(200).json();
};
const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id);

  await deleteMovieServices(id);

  return res.status(204).send();
};

export { createMovie, readMovie, updateMovie, deleteMovie };

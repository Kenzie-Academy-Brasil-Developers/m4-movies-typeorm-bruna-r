import { Request, Response } from "express";
import { TMovie, TMovieRequest } from "../interfaces/movie.interface";
import { createMovieServices } from "../services/movies/createMovie.services";
import { movieSchema } from "../schemas/movies.schema";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload: TMovieRequest = req.body;

  const newMovie: TMovie = await createMovieServices(payload);

  const movie: TMovie = movieSchema.parse(newMovie);

  return res.status(201).json(movie);
};

const readMovie = async (req: Request, res: Response): Promise<Response> => {
  return res.send();
};
const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload = req.body;

  const newMovie = await updateMovieServices(payload);

  return res.status(200).json(newMovie);
};
const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id;

  await deleteMovieServices(id);

  return res.status(204).send();
};

export { createMovie, readMovie, updateMovie, deleteMovie };

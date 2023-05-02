import { Repository } from "typeorm";
import { TMovie, TMovieRequest } from "../interfaces/movie.interface";
import { Movie } from "../entities/movie.entities";
import { appDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";

const ensureNameExistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: string = req.body.name;

  const movieRepository: Repository<TMovie> =
    appDataSource.getRepository(Movie);

  const nameMovie = movieRepository.findOne(payload);

  next();
};

export { ensureNameExistMiddleware };

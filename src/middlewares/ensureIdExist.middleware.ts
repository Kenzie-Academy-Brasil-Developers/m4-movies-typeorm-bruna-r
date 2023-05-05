import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { TMovie } from "../interfaces/movie.interface";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities/movie.entities";
import { AppError } from "../error";

const ensureIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: number = parseInt(req.params.id);

  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  const idMovie = await movieRepository.findOneBy({
    id: payload,
  });

  if (!idMovie) {
    throw new AppError("Movie not found", 404);
  }

  res.locals.movie = idMovie;

  next();
};

export { ensureIdExistMiddleware };

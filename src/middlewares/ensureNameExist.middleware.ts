import { Repository } from "typeorm";
import { TMovie, TMovieRequest } from "../interfaces/movie.interface";
import { Movie } from "../entities/movie.entities";
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureNameExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: string = req.body.name;
  if (!payload) {
    return next();
  }

  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  const nameMovie = await movieRepository.findOneBy({
    name: payload,
  });

  if (nameMovie) {
    throw new AppError("Movie already exists.", 409);
  }

  next();
};

export { ensureNameExistMiddleware };

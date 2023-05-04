import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { TMovie } from "../interfaces/movie.interface";
import { appDataSource } from "../data-source";
import { Movie } from "../entities/movie.entities";
import { AppError } from "../error";

const ensureIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: number = parseInt(req.params.id);

  const movieRepository: Repository<TMovie> =
    appDataSource.getRepository(Movie);

  const idMovie = await movieRepository.findOne({
    where: {
      id: payload,
    },
  });

  if (idMovie) {
    throw new AppError("Movie not found", 404);
  }

  next();
};

export { ensureIdExistMiddleware };

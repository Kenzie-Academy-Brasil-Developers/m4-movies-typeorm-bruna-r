import { Repository } from "typeorm";
import { TMovie, TMovieRequest } from "../interfaces/movie.interface";
import { Movie } from "../entities/movie.entities";
import { appDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const ensureNameExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload: string = req.body.name;

  const movieRepository: Repository<TMovie> =
    appDataSource.getRepository(Movie);

  const nameMovie = await movieRepository.findOne({
    where: {
      name: payload,
    },
  });

  if (nameMovie) {
    throw new AppError("Movie already exists.", 409);
  }

  next();
};

export { ensureNameExistMiddleware };

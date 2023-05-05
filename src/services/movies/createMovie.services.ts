import { Repository } from "typeorm";
import { TMovie, TMovieRequest } from "../../interfaces/movie.interface";
import { Movie } from "../../entities/movie.entities";
import { AppDataSource } from "../../data-source";

const createMovieServices = async (payload: TMovieRequest): Promise<TMovie> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  const newMovie: TMovie = movieRepository.create(payload);
  await movieRepository.save(newMovie);

  return newMovie;
};

export { createMovieServices };

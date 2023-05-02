import { Repository } from "typeorm";
import { appDataSource } from "../../data-source";
import { TMovie, TMovieRequest } from "../../interfaces/movie.interface";
import { Movie } from "../../entities/movie.entities";

const createMovieServices = async (payload: TMovieRequest): Promise<TMovie> => {
  const movieRepository: Repository<TMovie> =
    appDataSource.getRepository(Movie);

  const newMovie: TMovie = movieRepository.create(payload);
  await movieRepository.save(newMovie);

  return newMovie;
};

export { createMovieServices };

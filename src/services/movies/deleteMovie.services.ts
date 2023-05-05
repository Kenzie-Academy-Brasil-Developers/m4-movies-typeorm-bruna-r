import { Repository } from "typeorm";
import { TMovie } from "../../interfaces/movie.interface";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entities";

const deleteMovieServices = async (movie: TMovie): Promise<void> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  await movieRepository.remove(movie);

  return;
};

export { deleteMovieServices };

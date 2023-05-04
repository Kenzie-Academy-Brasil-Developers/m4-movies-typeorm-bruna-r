import { Repository } from "typeorm";
import { TMovie } from "../../interfaces/movie.interface";
import { appDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entities";

const deleteMovieServices = async (idMovie): Promise<void> => {
  const movieRepository: Repository<TMovie> =
    appDataSource.getRepository(Movie);

  const movie = movieRepository.findOneBy(idMovie);
};

export { deleteMovieServices };

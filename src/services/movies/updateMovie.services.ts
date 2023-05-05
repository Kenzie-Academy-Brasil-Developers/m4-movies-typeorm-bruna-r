import { Repository } from "typeorm";
import { TMovie, TMovieRequestUpdate } from "../../interfaces/movie.interface";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { movieSchema } from "../../schemas/movies.schema";

const updateMovieServices = async (
  payload: TMovieRequestUpdate,
  idMovie: number,
  oldMovie: TMovie
): Promise<TMovie> => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  const newMovie = {
    ...oldMovie,
    ...payload,
  };

  const movie = movieSchema.parse(newMovie);

  const movieupdate: TMovie = movieRepository.create(movie);

  await movieRepository.save(movieupdate);

  return movieupdate;
};

export { updateMovieServices };

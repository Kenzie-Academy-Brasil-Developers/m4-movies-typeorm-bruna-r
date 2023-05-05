import { Repository } from "typeorm";
import { TMovie, TMovies } from "../../interfaces/movie.interface";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { moviesSchema } from "../../schemas/movies.schema";

const readMovieServices = async (
  page: number | undefined,
  perPage: number | undefined,
  sort: string | undefined,
  orde: string | undefined
) => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  let movies: TMovie[] | undefined;
  const take: number = perPage || 5;
  const skip: number = page || 1;

  if (sort == "price")
    movies = await movieRepository.find({
      skip: (skip - 1) * take,
      take: take,
      order: { price: "asc" },
    });

  if (sort == "price" && orde == "desc")
    movies = await movieRepository.find({
      skip: (skip - 1) * take,
      take: take,
      order: { price: "desc" },
    });

  if (sort == "duration")
    movies = await movieRepository.find({
      skip: (skip - 1) * take,
      take: take,
      order: { duration: "asc" },
    });

  if (sort == "duration" && orde == "desc")
    movies = await movieRepository.find({
      skip: (skip - 1) * take,
      take: take,
      order: { duration: "desc" },
    });

  if (!sort) {
    movies = await movieRepository.find({
      skip: (skip - 1) * take,
      take: take,
      order: { id: "asc" },
    });
  }

  console.log(movies);
  const listMovies: TMovies = moviesSchema.parse(movies);

  return {
    prevPage: `http://localhost:3000/movies?page=${skip - 1}&perPage=3`,
    nextPage: `http://localhost:3000/movies?page=${skip + 1}&perPage=3`,
    count: 20,
    data: listMovies,
  };
};

export { readMovieServices };

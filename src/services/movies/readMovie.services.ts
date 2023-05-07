import { Repository } from "typeorm";
import { TMovie, TMovies } from "../../interfaces/movie.interface";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";

const readMovieServices = async (
  page: number | undefined,
  perPage: number | undefined,
  sort: string | undefined,
  orde: string | undefined
) => {
  const movieRepository: Repository<TMovie> =
    AppDataSource.getRepository(Movie);

  let data: TMovie[] | undefined;
  let count: number | undefined;
  let take: number = perPage || 5;
  let skip: number = page || 1;

  if (skip < 1) {
    skip = 1;
  }

  if (take < 1 || take > 5) {
    take = 5;
  }

  if (sort == "price") {
    [data, count] = await movieRepository.findAndCount({
      skip: (skip - 1) * take,
      take: take,
      order: { price: "asc" },
    });
  }

  if (sort == "price" && orde == "desc") {
    [data, count] = await movieRepository.findAndCount({
      skip: (skip - 1) * take,
      take: take,
      order: { price: "desc" },
    });
  }

  if (sort == "duration") {
    [data, count] = await movieRepository.findAndCount({
      skip: (skip - 1) * take,
      take: take,
      order: { duration: "asc" },
    });
  }

  if (sort == "duration" && orde == "desc") {
    [data, count] = await movieRepository.findAndCount({
      skip: (skip - 1) * take,
      take: take,
      order: { duration: "desc" },
    });
  }

  if (!sort) {
    [data, count] = await movieRepository.findAndCount({
      skip: (skip - 1) * take,
      take: take,
      order: { id: "asc" },
    });
  }

  let prevPage = null;
  let nextPage = null;

  if (skip > 1) {
    prevPage = `http://localhost:3000/movies?page=${skip - 1}&perPage=${take}`;
  }

  if (count! > skip * take) {
    nextPage = `http://localhost:3000/movies?page=${skip + 1}&perPage=${take}`;
  }

  return {
    prevPage: prevPage,
    nextPage: nextPage,
    count: count,
    data,
  };
};

export { readMovieServices };

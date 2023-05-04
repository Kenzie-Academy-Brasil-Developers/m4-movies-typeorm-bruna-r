import { Response } from "express";
import { Repository } from "typeorm";
import { TMovie } from "../../interfaces/movie.interface";
import { appDataSource } from "../../data-source";
import { Movie } from "../../entities";

const readMovieServices = async (
  page: number | undefined,
  perPage: number | undefined,
  sort: string | undefined,
  order: string | undefined
): Promise<TMovie> => {
  const movieRepository: Repository<TMovie> =
    appDataSource.getRepository(Movie);

  let movies: TMovie[] | undefined;

  const orderBy = sort;
  let orderObj = {};
  if (orderBy) {
    orderObj = {
      orderBy: order,
    };
  }

  if (page && perPage) {
    movies = await movieRepository.find({
      skip: (page - 1) * perPage,
      take: perPage,
      order: orderObj,
    });
  }

  return {
    page: page || null,
    perPage: perPage || null,
    data: movies,
  };
};

export { readMovieServices };

import { object, z } from "zod";

const movieSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  description: z.string().nullish(),
  duration: z.number().int().positive(),
  price: z.number().int().positive(),
});

const movieSchemaRequest = movieSchema.omit({
  id: true,
});

const movieSchemaRequestUpdate = movieSchema
  .omit({
    id: true,
  })
  .partial();

const moviesSchema = z.array(movieSchema);

export {
  movieSchema,
  movieSchemaRequest,
  movieSchemaRequestUpdate,
  moviesSchema,
};

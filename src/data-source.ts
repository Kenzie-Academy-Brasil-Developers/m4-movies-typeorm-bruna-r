import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import "dotenv/config";

const DataSourceConfig = (): DataSourceOptions => {
  const entitespath = path.join(__dirname, "./entities/**.{js, ts}");
  const migrationspath = path.join(__dirname, "./migrations/**.{js, ts}");

  if (process.env.NODE_ENV === "TEST") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entitespath],
    };
  }

  if (!process.env.DATABASE_URL)
    throw new Error("env var DATABASE_URL does not exists");

  return {
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [entitespath],
    migrations: [migrationspath],
  };
};

const AppDataSource: DataSource = new DataSource(DataSourceConfig());

export default AppDataSource;

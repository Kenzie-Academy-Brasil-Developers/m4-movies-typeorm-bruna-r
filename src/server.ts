import { AppDataSource } from "./data-source";
import app from "./app";

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.log(err));

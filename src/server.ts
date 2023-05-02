import app from "./app";
import { appDataSource } from "./data-source";

appDataSource
  .initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(3000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => console.log(err));

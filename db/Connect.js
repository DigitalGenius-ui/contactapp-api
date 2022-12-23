import mongoose from "mongoose";

export const connectDb = (dataBaseURL) => {
  mongoose
    .connect(dataBaseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("Database is connected"))
    .catch((err) => {
      console.log(err);
    });
};

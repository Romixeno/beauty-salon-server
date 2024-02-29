import mongoose from "mongoose";

export const mongooseConnect = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@beautysalon.4opnf3w.mongodb.net/?retryWrites=true&w=majority&appName=beautySalon`
  );
};

import { connect } from "mongoose";

export default async function connectToDB(uri: string) {
  try {
    await connect(uri).then(() => console.log("connected to DB"));
  } catch (err) {
    console.error("Error connecting to DB: ", err);
  }
}

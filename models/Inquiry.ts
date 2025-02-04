import { ObjectId } from "mongodb";

interface Inquiry {
  _id?: ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

export default Inquiry;
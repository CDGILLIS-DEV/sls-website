import { ObjectId } from "mongodb";

interface LoadBooking {
    _id?: ObjectId;
    companyName: string;
    email: string;
    pickupLocation: string;
    dropoffLocation: string;
    freightDetails: string;
    createdAt?: Date;
}

 export default  LoadBooking ;
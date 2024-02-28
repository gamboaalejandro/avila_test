import { User } from "src/users/infrastructure/collections/user.entity";
console.log('process.env.MONGO_URI',process.env.MONGO_URI)
const configMongo= {
  mongoURI: process.env.MONGO_URI,
};
export default configMongo

import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = 4444;
export const URL = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASS}@cluster0.jnk34.mongodb.net/blog?retryWrites=true&w=majority`;
import dotenv from "dotenv";
dotenv.config();
import {z} from 'zod';

export const env = z
  .object({
    PORT: z.coerce.number().default(5000),
    MONGO_URI: z.string(),
    JWT_SECRET_KEY: z.string()
  })
  .parse(process.env);
 
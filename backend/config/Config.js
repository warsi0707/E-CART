import dotenv from 'dotenv'
dotenv.config();

export const MONGO_URL = process.env.MONGO_URL;
export const USER_JWT_SECRET = process.env.USER_JWT_SECRET
export const FRONTEND_URL = process.env.FRONTEND_URL
export const CLOUD_NAME = process.env.CLOUD_NAME
export const CLOUD_API_KEY = process.env.CLOUD_API_KEY
export const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET
export const ADMIN_URL = process.env.ADMIN_URL
export const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET


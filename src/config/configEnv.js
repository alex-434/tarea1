"use strict";
import dotenv from "dotenv";

dotenv.config();

export const SERVER_HOST = process.env.SERVER_HOST || "0.0.0.0"
export const SERVER_PORT = process.env.SERVER_PORT || 3000; 

export const HOST = process.env.DB_HOST || process.env.HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || 5432;
export const DB_USERNAME = process.env.DB_USERNAME;
export const PASSWORD = process.env.DB_PASSWORD;
export const DATABASE = process.env.DB_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
export const cookieKey = process.env.COOKIE_KEY;
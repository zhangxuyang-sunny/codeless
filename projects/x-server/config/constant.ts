export const isDev = process.env.NODE_ENV !== "production";

export const host = isDev ? "localhost" : "119.91.65.70";

export const serverPort = 3000;

export const mongoPort = 27017;

export const BASE_URL =
  process.env.NODE_ENV === "production" ? "http://localhost:5000" : "";
export const QUESTIONS_URL = '/api/questions';
export const USERS_URL = '/api/users';
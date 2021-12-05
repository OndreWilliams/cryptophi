import { StatusError } from "./apiTypes";

// Custom error to send on db/server failure >
export const serverError = (title: string): StatusError => {
  const serverError = new StatusError(500, title);
  return serverError;
};

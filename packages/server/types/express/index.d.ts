import { User } from "../../db/models/User";
export {};
declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}

import { Observable } from "rxjs";
import { PublicUserData, User } from "./user.interface";

export interface UserService {
  insertOne(data: User): Observable<PublicUserData>;
}
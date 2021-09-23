
import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';
import {min} from 'rxjs/operators';




@Injectable({ providedIn: 'root' })
export class UserService {


  constructor(private http: HttpClient) { }

  getAll() {
     return this.http.get<User[]>(`http://localhost:3030/user/allusers`);
  }



  register(user: User) {
    return this.http.post(`http://localhost:3030/user/register`, user);
  }


  // TODO: add a function that will allow users to set their calorie and minute goals. The function will communicate with the back-end.
  setGoals(calgoal: number, mingoal: number) {
    return this.http.post(`http://localhost:3030/user/setgoals`, {caloriegoal: calgoal, minutegoal: mingoal});
  }

  // TODO: add a function that will allow users to get calorie and minute goals for a specific user (this means, given a username,
  //  this function should fetch calories and minute goals for that user). The function will communicate with the back-end.
  getGoals(user: User) {
    return this.http.get(`http://localhost:3030/user/getgoals/${user}`);
  }
}

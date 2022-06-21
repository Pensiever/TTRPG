import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewQuester, Quester } from '../models/quester/quester.model';
import { Router } from '@angular/router';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuesterService {

  private baseAdress = environment.baseUrl;

  constructor(
    private _client : HttpClient,
    private _router : Router
  ) { }

  currentQuester : Quester;

  register(newQuester : NewQuester) {
    this._client.post(this.baseAdress+"/Quester/register", newQuester, {responseType:'text'}).subscribe({
      next : () => this._router.navigate(['/login']),
      error : (error) => console.log(error)
    });
  }

  getAllQuesters() : Observable<Quester[]> {
    return this._client.get<Quester[]>(this.baseAdress+"/Quester")
  }

  getProfile(id : number) : Observable<Quester> {
    return this._client.get<Quester>(this.baseAdress+"/Quester/"+id)
  }

  getByUsername(username : string) : Observable<Quester> {
    return this._client.get<Quester>(this.baseAdress+"/Quester/"+username)
  }

  updateQuester(q : Quester) {
    return this._client.put(this.baseAdress+"/Quester", q)
  }

  deleteQuester(id : number) {
    return this._client.delete(this.baseAdress+"/Quester/"+id)
  }
}

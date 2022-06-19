import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewQuester, Quester } from '../models/quester/quester.model';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
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

  register(newQuester : NewQuester) {
    this._client.post(this.baseAdress+"/Quester/register", newQuester, {responseType:'text'}).subscribe({
      next : () => this._router.navigate(['/home']),
      error : (error) => console.log(error)
    });
  }

  getProfile(id : number) : Observable<Quester> {
    return this._client.get<Quester>(this.baseAdress+"/Quester/"+id)
  }

  updateQuester(q : Quester) {
    return this._client.put(this.baseAdress+"/Quester", q)
  }

  deleteQuester(id : number) {
    return this._client.delete(this.baseAdress+"/Quester/"+id)
  }
}

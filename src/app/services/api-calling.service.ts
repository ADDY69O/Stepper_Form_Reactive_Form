import { Injectable } from '@angular/core';
import ApiService, { APIResponse } from '../services/api.service';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class ApiPostService extends ApiService {
  constructor( private HttpClient:HttpClient) {
    super(HttpClient);
  }

  getPlaces(place:string) {
    
    console.log(place);
    return this.get<any>(`?input=${place}`);
  }
}

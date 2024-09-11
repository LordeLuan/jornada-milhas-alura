import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepoimentService {

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get(`${environment.apiUrl}/depoimentos`)
  }

}

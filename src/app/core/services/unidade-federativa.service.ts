import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadeFederativa } from '../types/type';

@Injectable({
  providedIn: 'root',
})
export class UnidadeFederativaService {

  private apiUrl: string = environment.apiUrl;
  // armazena os dados da requisição para utilizar em outros momentos
  private cache$?: Observable<UnidadeFederativa[]>;

  constructor(private http: HttpClient) {}

  // retorna a listagem ja salva em cacha e nao faz uma nova requisição para a API
  listar(): Observable<UnidadeFederativa[]> {
    if (!this.cache$) {
      this.cache$ = this.requestEstados().pipe(shareReplay(1));
    }

    return this.cache$;
  }

  private requestEstados(): Observable<UnidadeFederativa[]> {
    return this.http.get<UnidadeFederativa[]>(`${this.apiUrl}/estados`);
  }
}

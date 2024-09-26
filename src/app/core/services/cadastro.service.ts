import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PessoaUsuaria } from '../types/type';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  cadastrar(pessoaUsuaria: PessoaUsuaria): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/cadastro`, pessoaUsuaria);
  }
}

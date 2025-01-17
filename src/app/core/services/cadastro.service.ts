import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  buscarCadastro(token: string): Observable<PessoaUsuaria> {
    return this.http.get<PessoaUsuaria>(`${this.apiUrl}/auth/perfil`);
  }

  editarCadastro(pessoaUsuaria: PessoaUsuaria, token: string): Observable<PessoaUsuaria> {
    return this.http.patch<PessoaUsuaria>(`${this.apiUrl}/auth/perfil`, pessoaUsuaria);
  }
}

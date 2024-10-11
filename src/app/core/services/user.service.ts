import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { PessoaUsuaria } from '../types/type';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

  constructor(private tokenService: TokenService, private http: HttpClient) {
    if (tokenService.possuiToken()) {
      this.decodificarJwt();
    }
  }

  decodificarJwt(){
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as PessoaUsuaria;
    // emite um evento no abservable
    this.userSubject.next(user);
  }

  retornaUser(){
    return this.userSubject.asObservable();
  }

  salvarToken(token: string){
    this.tokenService.salvarToken(token);
    this.decodificarJwt();
  }

  logout() {
    this.tokenService.excluirToken();
    this.userSubject.next(null);
  }

  estaLogado(){
   return this.tokenService.possuiToken();
  }
}

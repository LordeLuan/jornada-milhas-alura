import { Component } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  
  perfilComponent = false;

  constructor(private formularioService: FormularioService, private cadastroService: CadastroService){}

  cadastrar() {
    const form = this.formularioService.getCadastro();
    // faz um castzao para o tipo pessoaUsuaria
    const pessoaUsuaria = form?.getRawValue() as PessoaUsuaria;

    this.cadastroService.cadastrar(pessoaUsuaria).subscribe({
      next(value) {
        console.log(value);
        alert('Usuário cadastrado!');
      },
      error(err) {
        console.log(err);
      },
    });
    console.log(form);
    
    console.log('Cadastro realzaodas');
    
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';
import { UnidadeFederativa } from 'src/app/core/types/type';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss'],
})
export class DropdownUfComponent implements OnInit {
  @Input()
  label: string = '';

  // Faz o typescript aceitar que inicia nulo mesmo
  @Input()
  iconePrefixo!: string;

  @Input()
  nome = new FormControl<any>(null);

  unidadesFederativas: UnidadeFederativa[] = [];

  filteredOptions = [];

  constructor(private unidadeFederativaService: UnidadeFederativaService) {}

  ngOnInit(): void {

    this.unidadeFederativaService.listar().subscribe((ufs) => {
      this.unidadesFederativas = ufs;
    });

    this.nome.valueChanges.pipe(
      switchMap((valorDigitado) => this.buscaUfs(valorDigitado)),
      tap(item => console.log(item)),
      map((resultado) => this.unidadesFederativas = [resultado])
    );
  }

  buscaUfs(nomeUf :any) : UnidadeFederativa[] {
    const nome = typeof nomeUf === 'string' ? nomeUf : nomeUf?.nome;
    return this.unidadesFederativas.filter(uf => {
      uf.nome.toLocaleLowerCase().includes(nomeUf);
    });
  }

  displayNomeEstado(estado: UnidadeFederativa): string {
    return estado && estado.nome ? estado.nome : '';
  }
}

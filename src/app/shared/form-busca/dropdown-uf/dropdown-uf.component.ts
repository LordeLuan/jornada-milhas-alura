import { distinctUntilChanged, filter, map, Observable, switchMap, tap } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';
import { UnidadeFederativa } from 'src/app/core/types/type';
import { FormControl } from '@angular/forms';

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

  nome = new FormControl('');

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
    return this.unidadesFederativas.filter(uf => {
      uf.nome.includes(nomeUf);
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';
import { UnidadeFederativa } from 'src/app/core/types/type';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss'],
})
export class DropdownUfComponent implements OnInit{
  @Input()
  label: string = '';

  // Faz o typescript aceitar que inicia nulo mesmo
  @Input()
  iconePrefixo!: string;

  unidadesFederativas: UnidadeFederativa[] = [];

  filteredOptions = [];

  constructor(private unidadeFederativaService: UnidadeFederativaService){}

  ngOnInit(): void {
    this.unidadeFederativaService.listar().subscribe((dados: UnidadeFederativa[]) => {
      this.unidadesFederativas = dados;
    });
  }
}

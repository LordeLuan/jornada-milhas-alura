import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class FormBuscaService {
  formBusca!: FormGroup;

  constructor(private dialog: MatDialog) {
    this.formBusca = new FormGroup({
      origem: new FormControl(''),
      destino: new FormControl(''),
      somenteIda: new FormControl(false),
      idaEVolta: new FormControl(),
      tipo: new FormControl('Econômica'),
      adultos: new FormControl(1),
      criancas: new FormControl(0),
      bebes: new FormControl(0),
    });
  }

  getDescricaoPassageiros(): string {
    let adultos = this.formBusca.get('adultos')?.value;
    let criancas = this.formBusca.get('criancas')?.value;
    let bebes = this.formBusca.get('bebes')?.value;

    let descricao = '';
    descricao += adultos > 0 ? `${adultos} adulto${adultos > 1 ? 's' : ''}` : '';
    descricao += criancas > 0 ? ', ' : ''; 
    descricao += criancas > 0 ? `${criancas} criança${criancas > 1 ? 's' : ''}` : '';
    descricao += bebes > 0 ? ', ' : ''; 
    descricao += bebes > 0 ? `${bebes} bebê${bebes > 1 ? 's' : ''}` : '';

    return descricao;
  }

  // retorna o campo do form para utilizar no componente seletor-passageiro que funciona como um campo do formulário angular
  obterControle(nome: string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }

  alterarTipo(evento: MatChipSelectionChange, tipo: string) {
    if (evento.selected) {
      this.formBusca.patchValue({
        tipo,
      });
    }
    console.log(this.formBusca.get('tipo')?.value);
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%',
    });
  }

  trocarOrigemDestino(): void {
    const origem = this.formBusca.get('origem')?.value;
    const destino = this.formBusca.get('destino')?.value;

    this.formBusca.patchValue({
      origem: destino,
      destino: origem,
    });
  }
}

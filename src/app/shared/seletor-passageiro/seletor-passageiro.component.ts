import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-seletor-passageiro',
  templateUrl: './seletor-passageiro.component.html',
  styleUrls: ['./seletor-passageiro.component.scss'],
  // config necessaria para utilizar a interface ControlValueAccessor
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // o forwardRed informa o angular que a classe ainda nao existe quando estiver compilando e para pegar depois
      useExisting: forwardRef(() => SeletorPassageiroComponent),
      multi: true,
    },
  ],
})

// A interface ControlValueAccessor permite utilizar este componente como um campo de um formulario angular
// junto com diretivas do tipo ngModel ou atributos formControl e etc.
export class SeletorPassageiroComponent implements ControlValueAccessor {

  @Input() titulo: string = '';
  @Input() subtitulo: string = '';

  value: number = 0;
  onChange = (val: number) => {};
  onTouch = () => {};

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    console.log(fn)
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  decrementar() {
    if (this.value > 0) {
      this.value--;
      this.onChange(this.value);
      this.onTouch();
    }
  }

  incrementar() {
    this.value++;
    console.log(this.onChange);
    this.onChange(this.value);
    this.onTouch();
  }
}

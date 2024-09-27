import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class FormValidations {

    static equalTo(otherField: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            // Pega valor do campo em que esta usando a validacao
            const fieldValue = control.value;
            // Pega o valor do campo em que quer comparar os valores
            const otherFieldValue = control.root.get(otherField)?.value;

            if(fieldValue !== otherFieldValue){
                return { equalTo: true}
            }
            return null;
        }
    }
}
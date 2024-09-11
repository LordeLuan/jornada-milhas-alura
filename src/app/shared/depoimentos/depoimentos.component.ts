import { Component, OnInit } from '@angular/core';
import { DepoimentService } from 'src/app/core/services/depoiment.service';
import { Depoimento } from 'src/app/core/types/type';

@Component({
  selector: 'app-depoimentos',
  templateUrl: './depoimentos.component.html',
  styleUrls: ['./depoimentos.component.scss'],
})
export class DepoimentosComponent implements OnInit {

  depoimentos: Depoimento[] = [];

  constructor(private service: DepoimentService) {}

  ngOnInit(): void {
    
    this.service.listar().subscribe((res: any) => {
      this.depoimentos = res;
    });
  }

}

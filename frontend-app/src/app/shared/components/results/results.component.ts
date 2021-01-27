import { Component, OnInit, Input } from '@angular/core';
import { ResultadoViewModel } from '../../models/resultado';

@Component({
  //selector: 'app-ifmath-ng-results',
  selector: 'app-ifmath-ng-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ListaResultadoComponent {

  @Input() public resultados: ResultadoViewModel[];
  @Input() public loading: boolean;


}
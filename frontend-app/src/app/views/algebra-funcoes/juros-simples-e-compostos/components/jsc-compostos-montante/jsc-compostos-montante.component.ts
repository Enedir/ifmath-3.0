
import {take} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ICompostoMontanteComand } from './../../shared/juros-simples-e-compostos.model';
import { ServicoJurosSimplesComposto } from './../../shared/juros-simples-e-compostos.service';
import { ResultadoViewModel } from '../../../../../shared/models/resultado';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';




@Component({
  templateUrl: './jsc-compostos-montante.component.html',
  styleUrls: ['./jsc-compostos-montante.component.scss']
})
export class JscCompostosMontanteComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    c: ['', Validators.required],
    i: ['', Validators.required],
    t: ['', Validators.required],
  });

  loading: boolean;
  resultados: ResultadoViewModel[];

  constructor(private fb: FormBuilder, private servico: ServicoJurosSimplesComposto) { }

  ngOnInit(): void {
    this.resultados = [];
  }

  onSubmit(): void {
    this.loading = true;
    const jurosSimplesComposto: ICompostoMontanteComand = this.form.value;

    this.servico.postCompostoMontante(jurosSimplesComposto).pipe(
    take(1))
    // .do({this.loading = false;})
    .subscribe((response) => {
        if (response.sucesso) {
          this.resultados = ( response.objeto as ResultadoViewModel[]);
        }

        this.loading = false;
      }, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred.
          console.log('An error occurred:', err.error.message);
        } else {
          // Backend returns unsuccessful response codes such as 404, 500 etc.
          console.log('Backend returned status code: ', err.status);
          console.log('Response body:', err.error);
          // Log errors if any
          this.loading = false;
        }
      });
  }


}

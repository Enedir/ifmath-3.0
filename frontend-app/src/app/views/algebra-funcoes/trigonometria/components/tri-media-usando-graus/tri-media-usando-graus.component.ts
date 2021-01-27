
import {tap, take} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IMediaUsandoGrausComand } from './../../shared/trigonometria.model';
import { ServicoTrigonometria } from './../../shared/trigonometria.service';
import { ResultadoViewModel } from '../../../../../shared/models/resultado';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';




@Component({
  templateUrl: './tri-media-usando-graus.component.html',
  styleUrls: ['./tri-media-usando-graus.component.scss']
})
export class TriMediaUsandoGrausComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    graus: ['', Validators.required],
    minutos: ['', Validators.required],
    segundos: ['', Validators.required],
  });

  loading: boolean;
  resultados: ResultadoViewModel[];

  constructor(private fb: FormBuilder, private servico: ServicoTrigonometria) { }

  ngOnInit(): void {
    this.resultados = [];
  }

  onSubmit(): void {
    this.loading = true;
    const trigonometria: IMediaUsandoGrausComand = this.form.value;

    this.servico.postMediaUsandoGraus(trigonometria).pipe(
      take(1),
      tap(() => {
        this.loading = false;
      }), )
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

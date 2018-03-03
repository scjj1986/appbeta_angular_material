import { Component, OnInit, Inject,Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mensaje-error',
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.css']
})
export class MensajeErrorComponent {
  public titulo: string="";
  public contenido: string="";
  constructor(public mensajeError: MatDialogRef<MensajeErrorComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
  	this.titulo=data.titulo;
  	this.contenido=data.contenido;
  }

  ngOnInit() {
  }

}

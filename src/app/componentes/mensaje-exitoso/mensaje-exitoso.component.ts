import { Component, OnInit, Inject,Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mensaje-exitoso',
  templateUrl: './mensaje-exitoso.component.html',
  styleUrls: ['./mensaje-exitoso.component.css']
})
export class MensajeExitosoComponent implements OnInit {

  constructor(public mensajeExitoso: MatDialogRef<MensajeExitosoComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}

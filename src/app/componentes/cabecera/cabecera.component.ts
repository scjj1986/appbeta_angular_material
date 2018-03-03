import { Component} from '@angular/core';
import {logueado} from '../../utilidades/funciones';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  
  constructor(){ 
   }

  verificarLogueo(){
    return logueado();
  }

}

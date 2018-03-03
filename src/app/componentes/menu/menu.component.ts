import { Component} from '@angular/core';
import {Router} from '@angular/router';
import {removerLocalStorages} from '../../utilidades/funciones';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{

  public nombreUsuario: string = localStorage.getItem("Nombre");
  ruta: Router;
  constructor(_ruta: Router){ 
       this.ruta = _ruta;
   }

  cerrarSesion(){
  	removerLocalStorages();
  	this.ruta.navigate(['/login']);
  }

}

import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {logueado} from '../../utilidades/funciones';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  ruta: Router;
   constructor(_ruta: Router){  
       this.ruta = _ruta;
   }

  ngOnInit() {
  		if (!logueado())
  			this.ruta.navigate(['/login']);
  }

}

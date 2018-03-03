import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BaseDatosService} from '../../servicios/base-datos.service';
import {filtrarTabla,logueado} from '../../utilidades/funciones';
import {rutaPhpCargo} from '../../utilidades/constantes';

import {MatPaginator,MatTableDataSource,MatTableModule,MatSort,MatSortModule} from '@angular/material';

@Component({
  selector: 'app-cargo-listado',
  templateUrl: './cargo-listado.component.html',
  styleUrls: ['../../estilos-css/contenido-listado.css'],
  providers: [BaseDatosService]
})
export class CargoListadoComponent{

  baseDatosService:BaseDatosService;
  ruta: Router;
  columnas = ['codigo', 'nombre','departamento','sueldo','editar'];
  tabla: MatTableDataSource<Object>;

  @ViewChild(MatPaginator) paginador: MatPaginator;
  @ViewChild(MatSort) ordenLista: MatSort;

  constructor(public _BaseDatosService:BaseDatosService, public _ruta: Router) {
  	this.baseDatosService=_BaseDatosService;
  	this.ruta = _ruta;
   }

  ngOnInit() {
  	if (!logueado())
        this.ruta.navigate(['/login']);
      else{
        this.baseDatosService.consulta(null,rutaPhpCargo,"cargo_listado").subscribe(data => {
          this.tabla = new MatTableDataSource<Object>(data);
          this.tabla.paginator = this.paginador;
          this.tabla.sort = this.ordenLista;
        }, (error) => {
          console.log('Error : ',error);
        });
      }
  }

  filtrar(valor: string) {
  	filtrarTabla(valor,this.tabla);
  }

  redirigirCargoFormulario(id){
    this.ruta.navigate(['/cargoFormulario',id]);
  }

}

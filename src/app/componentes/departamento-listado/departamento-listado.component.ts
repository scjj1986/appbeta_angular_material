import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BaseDatosService} from '../../servicios/base-datos.service';
import {filtrarTabla,logueado} from '../../utilidades/funciones';
import {rutaPhpDepartamento} from '../../utilidades/constantes';

import {MatPaginator,MatTableDataSource,MatTableModule,MatSort,MatSortModule} from '@angular/material';

@Component({
  selector: 'app-departamento-listado',
  templateUrl: './departamento-listado.component.html',
  styleUrls: ['../../estilos-css/contenido-listado.css'],
  providers: [BaseDatosService]
})
export class DepartamentoListadoComponent{

  baseDatosService:BaseDatosService;
  ruta: Router;
  columnas = ['codigo', 'nombre','editar'];
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
        this.baseDatosService.consulta(null,rutaPhpDepartamento,"departamento_listado").subscribe(data => {
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

  redirigirDepartamentoFormulario(id){
    this.ruta.navigate(['/departamentoFormulario',id]);
  }

}

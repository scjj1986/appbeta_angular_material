import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BaseDatosService} from '../../servicios/base-datos.service';
import {filtrarTabla,logueado} from '../../utilidades/funciones';
import {rutaPhpEmpleado,rutaPhpReportesEmpleado} from '../../utilidades/constantes';

import {MatPaginator,MatTableDataSource,MatTableModule,MatSort,MatSortModule} from '@angular/material';

@Component({
  selector: 'app-empleado-listado',
  templateUrl: './empleado-listado.component.html',
  styleUrls: ['../../estilos-css/contenido-listado.css'],
  providers: [BaseDatosService]
})
export class EmpleadoListadoComponent {

  baseDatosService:BaseDatosService;
  ruta: Router;
  columnas = ['ficha','docide','nombre','cargo','departamento','sueldo','opciones'];
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
        this.baseDatosService.consulta(null,rutaPhpEmpleado,"empleado_listado").subscribe(data => {
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

  redirigirFormulario(id){
    this.ruta.navigate(['/empleadoFormulario',id]);
  }

  generarPlanillaEmpleado(id){
    window.open(rutaPhpReportesEmpleado+"reporte-empleado-ficha.php?id="+id,"Reporte de Ficha de Empleado","width=900,height=500,scrollbars=NO");


  }

}

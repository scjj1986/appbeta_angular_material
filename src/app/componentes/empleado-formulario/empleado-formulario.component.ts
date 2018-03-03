import { Component } from '@angular/core';

//Ruta
import { Router, ActivatedRoute } from '@angular/router';

//Constantes y Funciones 
import {letras,numeros,rutaPhpEmpleado,rutaPhpCargo,rutaPhpDepartamento} from '../../utilidades/constantes';
import {logueado,bloquearBotonPrimario,validarEntradaCampos,formularioDatos,
        cargarDatosEnObjeto,fechaActualFormatoAaaaMmDd,validarEntradaDecimales,
        filtrarArreglo,validarValorDecimal,obtenerValorItemArreglo} from '../../utilidades/funciones';

//Modelos
import {empleado} from '../../clases/empleado';
import {mensaje} from '../../clases/mensaje';

//Servicio
import {BaseDatosService} from '../../servicios/base-datos.service';

//Componentes (Mensajes de Alerta)
import { MensajeErrorComponent } from '../mensaje-error/mensaje-error.component';
import { MensajeExitosoComponent } from '../mensaje-exitoso/mensaje-exitoso.component';

//Mensaje de Alerta
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-empleado-formulario',
  templateUrl: './empleado-formulario.component.html',
  styleUrls: ['./empleado-formulario.component.css'],
  providers: [BaseDatosService]
})
export class EmpleadoFormularioComponent {

  public titulo: string = "AGREGAR EMPLEADO";
  public logo:string = "add_circle_outline";
  public _empleado: empleado = new empleado();
  public ruta: Router;
  public baseDatosService:BaseDatosService;
  public _mensaje: mensaje;
  mensajeError: MatDialogRef<MensajeErrorComponent>;
  mensajeExitoso: MatDialogRef<MensajeExitosoComponent>;
  public idDepto: string = "";

  public _arrDepto: any[];
  public _arrCargo: any[];
  public _arrCargoFiltrado: any[];

  constructor(public mensaje: MatDialog,private rutaActivada: ActivatedRoute,private _ruta: Router,public _BaseDatosService:BaseDatosService){
    	this.ruta=_ruta;
      this.baseDatosService=_BaseDatosService;
      this.cargarListadoDepartamento();
      this.cargarListadoCargo();
  }

  ngOnInit() {
        var id=-1;
        this.rutaActivada.params.subscribe(params => {
              id=params['id'];
        });
        if (!logueado())
          this.ruta.navigate(['/login']);
        if (isNaN(id))
          this.ruta.navigate(['/empleadoListado']);
        else if(id==-1)
          this.generarNrFicha();
        else if (id!=-1){
          let parametros=new FormData();
          parametros.append('id',id.toString());
          this.baseDatosService.consulta(parametros,rutaPhpEmpleado,"empleado_buscarPorId").subscribe(data => {
                if(data[0].id!=-1){
                  this._empleado = cargarDatosEnObjeto(this._empleado,data[0]);
                  this._empleado.ficha=data[0].id;
                  this.idDepto=obtenerValorItemArreglo(this._arrCargo,"idDepto","id",this._empleado.idCargo);
                  this._arrCargoFiltrado = filtrarArreglo(this._arrCargo,"idDepto",this.idDepto);
                  this.titulo="EDITAR USUARIO";
                  this.logo="create";
                }
                else
                  this.volverListado();

            }, (error) => {
              console.log('Error : ',error);
            });
        } 
  }

  generarNrFicha(){
    this.baseDatosService.consulta(null,rutaPhpEmpleado,"empleado_generarNrFicha").subscribe(data => {
                  this._empleado.ficha=data[0].ficha;
            }, (error) => {
              console.log('Error : ',error);
            });
  }

  fechaMaxima(){
    return fechaActualFormatoAaaaMmDd();
  }

  validarLetras(evento){
       return validarEntradaCampos(evento,letras);
  }

  validarNumeros(evento){
       return validarEntradaCampos(evento,numeros);
  }

  _validarDecimales(evento){
    return validarEntradaDecimales(evento);
  }

  filtrarCargo(){
    this._empleado.idCargo="";
    this._arrCargoFiltrado = filtrarArreglo(this._arrCargo,"idDepto",this.idDepto);
  }


  cargarListadoDepartamento(){
      this.baseDatosService.consulta(null,rutaPhpDepartamento,"departamento_listado").subscribe(respuesta => {
          this._arrDepto= respuesta;
        }, (error) => {
        });
   }

   cargarListadoCargo(){
      this.baseDatosService.consulta(null,rutaPhpCargo,"cargo_listado").subscribe(respuesta => {
          this._arrCargo= respuesta;
        }, (error) => {
        });
   }

   bloquearBotonGuardar(){
      return (bloquearBotonPrimario(this._empleado) ||   (!(validarValorDecimal(this._empleado.nHijos)) && this._empleado.hijos) || !(validarValorDecimal(this._empleado.estatura)) );

  }
    volverListado(){
      this.ruta.navigate(['/empleadoListado']);
  }

  agregarEditar(){
      this.baseDatosService.consulta(formularioDatos(this._empleado),rutaPhpEmpleado,"empleado_agregarEditar").subscribe(data => {
            
            if(data[0].estatusConsulta===1){
              this.mensajeExitoso = this.mensaje.open(MensajeExitosoComponent,{
                width:'40%'
              });

              this.mensajeExitoso.afterClosed().subscribe(result => {
                this.volverListado();
              });
              return;
            }
            else if(data[0].estatusConsulta===-1)
              this._mensaje = new mensaje("REDUNDANCIA DE DATOS","*El Documento de Identidad debe ser irrepetible");

            this.mensajeError = this.mensaje.open(MensajeErrorComponent,{
              width:'40%',
              data: this._mensaje
            });
            
        }, (error) => {
          console.log('Error : ',error);
        });
     }

}

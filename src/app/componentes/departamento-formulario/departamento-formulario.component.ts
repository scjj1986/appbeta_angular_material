import { Component } from '@angular/core';

//Ruta
import { Router, ActivatedRoute } from '@angular/router';

//Constantes y Funciones 
import {rutaPhpDepartamento,letras} from '../../utilidades/constantes';
import {logueado,bloquearBotonPrimario,validarEntradaCampos,formularioDatos,cargarDatosEnObjeto} from '../../utilidades/funciones';

//Modelos
import {departamento} from '../../clases/departamento';
import {mensaje} from '../../clases/mensaje';

//Servicio
import {BaseDatosService} from '../../servicios/base-datos.service';

//Componentes (Mensajes de Alerta)
import { MensajeErrorComponent } from '../mensaje-error/mensaje-error.component';
import { MensajeExitosoComponent } from '../mensaje-exitoso/mensaje-exitoso.component';

//Mensaje de Alerta
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-departamento-formulario',
  templateUrl: './departamento-formulario.component.html',
  styleUrls: ['./departamento-formulario.component.css'],
  providers: [BaseDatosService]
})
export class DepartamentoFormularioComponent {

  public titulo: string = "AGREGAR DEPARTAMENTO";
  public logo:string = "add_circle_outline";
  public _depto: departamento = new departamento();
  public ruta: Router;
  public baseDatosService:BaseDatosService;
  public _mensaje: mensaje;
  mensajeError: MatDialogRef<MensajeErrorComponent>;
  mensajeExitoso: MatDialogRef<MensajeExitosoComponent>;

  constructor(public mensaje: MatDialog,private rutaActivada: ActivatedRoute,private _ruta: Router,public _BaseDatosService:BaseDatosService){
    	this.ruta=_ruta;
      this.baseDatosService=_BaseDatosService;
      
   }

  ngOnInit() {
  		var id=-1;
        this.rutaActivada.params.subscribe(params => {
              id=params['id'];
        });
        if (!logueado())
        	this.ruta.navigate(['/login']);
        if (isNaN(id))
               this.volverListado();
        else if (id==-1)
            this.generarCodigo();
        else if (id!=-1){
          let parametros=new FormData();
          parametros.append('id',id.toString());
          this.baseDatosService.consulta(parametros,rutaPhpDepartamento,"departamento_buscarPorId").subscribe(data => {
                if(data[0].id!=-1){
                  this._depto = cargarDatosEnObjeto(this._depto,data[0]);
                  this.titulo="EDITAR DEPARTAMENTO";
                  this.logo="create";
                }
                else
                  this.volverListado();

            }, (error) => {
              console.log('Error : ',error);
            });
        }
  }

  generarCodigo(){
  	this.baseDatosService.consulta(null,rutaPhpDepartamento,"departamento_generarCodigo").subscribe(data => {
                  this._depto.codigo=data[0].codigo;
            }, (error) => {
              console.log('Error : ',error);
            });
  }

  validarLetras(evento){
       return validarEntradaCampos(evento,letras);
  }

  bloquearBotonGuardar(){
    	return bloquearBotonPrimario(this._depto);
  }

   agregarEditar(){
      this.baseDatosService.consulta(formularioDatos(this._depto),rutaPhpDepartamento,"departamento_agregarEditar").subscribe(data => {
            
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
              this._mensaje = new mensaje("REDUNDANCIA DE DATOS","*El Nombre debe ser irrepetible");

            this.mensajeError = this.mensaje.open(MensajeErrorComponent,{
              width:'40%',
              data: this._mensaje
            });
            
        }, (error) => {
          console.log('Error : ',error);
        });
     }

     volverListado(){
     	this.ruta.navigate(['/departamentoListado']);
     }

}

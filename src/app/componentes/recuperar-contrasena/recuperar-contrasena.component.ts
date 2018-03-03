import { Component} from '@angular/core';

//------------------ Mensaje de Alerta ------------------//
import { MatDialog, MatDialogRef } from '@angular/material';
//-------------------------------------------------------//

//------------------- Componente (Mensaje de Alerta) ---------------------------//
import { MensajeErrorComponent } from '../mensaje-error/mensaje-error.component';
import { MensajeExitosoComponent } from '../mensaje-exitoso/mensaje-exitoso.component';
//------------------------------------------------------------------------------//


//------------ Ruta (Navegación) -----------//
import {Router} from '@angular/router';
//------------------------------------------//

//-----------Modelos (Clases)--------------//
import {recuperarContrasena} from '../../clases/recuperarContrasena';
import {mensaje} from '../../clases/mensaje';
//-----------------------------------------//

//------ Constantes y Funciones -----//
import {rutaPhpRecuperarContrasena} from '../../utilidades/constantes';
import {logueado} from '../../utilidades/funciones';
//---------------------------------------//

//------------------------ Servicio -------------------------------//
import {BaseDatosService} from '../../servicios/base-datos.service';
//-----------------------------------------------------------------//

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css'],
  providers: [BaseDatosService]
})
export class RecuperarContrasenaComponent {

  public titulo: string = "RECUPERAR CONTRASEÑA (PASO 1: INGRESE LOGIN DE USUARIO)";
  public rc: recuperarContrasena = new recuperarContrasena();
  public _mensaje: mensaje;
  mensajeError: MatDialogRef<MensajeErrorComponent>;
  mensajeExitoso: MatDialogRef<MensajeExitosoComponent>;
  ruta: Router;
  public baseDatosService:BaseDatosService;
  public mostrarPaso1: boolean = true;
  public mostrarPaso2: boolean = false;
  public mostrarPaso3: boolean = false;
  public mostrarErrorClave: boolean=false;
  
  constructor(public mensaje: MatDialog,public _ruta: Router, public _BaseDatosService:BaseDatosService) {
	 this.ruta = _ruta;
     this.baseDatosService=_BaseDatosService;
 }


  ngOnInit() {
    if (logueado())
      this.ruta.navigate(['/inicio']);
  }

  redirigirLogin(){
  this.ruta.navigate(['/login']);
 }

  bloquearBotonSigPaso1(){
  	return (this.rc.usuario=="");
  }

  bloquearBotonSigPaso2(){
  	return (this.rc.respuesta=="");
  }

  bloquearBotonFinalizarPaso3(){
  	return (this.rc.clave=="" || this.rc.repetirClave=="" || this.mostrarErrorClave);
  }

  volverPaso1(){
    this.titulo = "RECUPERAR CONTRASEÑA (PASO 1: INGRESE LOGIN DE USUARIO)";
  	this.mostrarPaso1=true;
  	this.mostrarPaso2=false;
  }

  volverPaso2(){
    this.titulo = "RECUPERAR CONTRASEÑA (PASO 2: INGRESE RESPUESTA DE LA PREGUNTA SECRETA)";
  	this.mostrarPaso2=true;
  	this.mostrarPaso3=false;
  }

  validarClavesIguales(){
  	this.mostrarErrorClave = ((!(this.rc.clave==="") || !(this.rc.repetirClave===""))  && (!(this.rc.clave===this.rc.repetirClave))) ? true:false;

  }

  paso1BuscarUsuario(){
	  let parametros = new FormData();
	  parametros.append('usuario',this.rc.usuario);
	  this.baseDatosService.consulta(parametros,rutaPhpRecuperarContrasena,"recuperar-contrasena_buscarUsuarioPorLogin").subscribe(data => {

	        if(data[0].estatusConsulta===1){
	          this.mostrarPaso1=false;
  	  		  this.mostrarPaso2=true;
  	  		  this.titulo = "RECUPERAR CONTRASEÑA (PASO 2: INGRESE RESPUESTA DE LA PREGUNTA SECRETA)";
	          this.rc.pregunta=data[0].pregunta;
	          this.rc.nombreCompleto=data[0].nombreCompleto.toUpperCase();
	          return;
	        }
	        else if(data[0].estatusConsulta===-1)
	          this._mensaje = new mensaje("ERROR","*Usuario no encontrado");

	        this.mensajeError = this.mensaje.open(MensajeErrorComponent,{
	          width:'40%',
	          data: this._mensaje
	        });
	    }, (error) => {
	      console.log('Error : ',error);
	    });
 }

 paso2verificarRespuesta(){
 	  let parametros = new FormData();
	  parametros.append('usuario',this.rc.usuario);
	  parametros.append('respuesta',this.rc.respuesta);
	  this.baseDatosService.consulta(parametros,rutaPhpRecuperarContrasena,"recuperar-contrasena_verificarRespuesta").subscribe(data => {

	        if(data[0].estatusConsulta===1){
	          this.mostrarPaso2=false;
  	  		  this.mostrarPaso3=true;
  	  		  this.titulo = "RECUPERAR CONTRASEÑA (PASO 3: INGRESE LA NUEVA CLAVE)";
	          return;
	        }
	        else if(data[0].estatusConsulta===-1)
	          this._mensaje = new mensaje("ERROR","*Respuesta incorrecta");

	        this.mensajeError = this.mensaje.open(MensajeErrorComponent,{
	          width:'40%',
	          data: this._mensaje
	        });
	    }, (error) => {
	      console.log('Error : ',error);
	    });
 }

 paso3GuardarClaveNueva(){
 	  let parametros = new FormData();
 	  parametros.append('usuario',this.rc.usuario);
	  parametros.append('clave',this.rc.clave);
	  this.baseDatosService.consulta(parametros,rutaPhpRecuperarContrasena,"recuperar-contrasena_cambiarClave").subscribe(data => {

	        if(data[0].estatusConsulta===1){
              this.mensajeExitoso = this.mensaje.open(MensajeExitosoComponent,{
                width:'40%'
              });

              this.mensajeExitoso.afterClosed().subscribe(result => {
                this.ruta.navigate(['/login']);
              });
              return;
            }

	    }, (error) => {
	      console.log('Error : ',error);
	    });
 }

}

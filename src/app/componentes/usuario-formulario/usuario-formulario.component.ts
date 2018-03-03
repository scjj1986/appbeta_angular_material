import { Component} from '@angular/core';

//Ruta
import { Router, ActivatedRoute } from '@angular/router';

//Constantes y Funciones 
import {letras,numeros,rutaPhpUsuario} from '../../utilidades/constantes';
import {logueado,bloquearBotonPrimario,validarFormatoLogin,validarEntradaCampos,
formularioDatos,cargarDatosEnObjeto} from '../../utilidades/funciones';

//Modelos
import {usuario} from '../../clases/usuario';
import {mensaje} from '../../clases/mensaje';

//Servicio
import {BaseDatosService} from '../../servicios/base-datos.service';

//Componentes (Mensajes de Alerta)
import { MensajeErrorComponent } from '../mensaje-error/mensaje-error.component';
import { MensajeExitosoComponent } from '../mensaje-exitoso/mensaje-exitoso.component';

//Mensaje de Alerta
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.css'],
  providers: [BaseDatosService]
})
export class UsuarioFormularioComponent{

	public titulo: string = "AGREGAR USUARIO";
	public logo:string = "add_circle_outline";
  public errLogin:boolean=false;
  public _usuario: usuario = new usuario();
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
          this.ruta.navigate(['/usuarioListado']);
        else if (id!=-1){
          let parametros=new FormData();
          parametros.append('id',id.toString());
          this.baseDatosService.consulta(parametros,rutaPhpUsuario,"usuario_buscarPorId").subscribe(data => {
                if(data[0].id!=-1){
                  this._usuario=cargarDatosEnObjeto(this._usuario,data[0]);
                  this.titulo="EDITAR USUARIO";
                  this.logo="create";
                }
                else
                  this.ruta.navigate(['/usuarioListado']);

            }, (error) => {
              console.log('Error : ',error);
            });
        } 
    }

    bloquearBotonGuardar(){
    	return (bloquearBotonPrimario(this._usuario) || this.errLogin);
    }

    validarLogin(){
      this.errLogin = (this._usuario.login==="" ? false : !validarFormatoLogin(this._usuario.login));
    }

    validarNumeros(evento){
       return validarEntradaCampos(evento,numeros);
    }

    validarLetras(evento){
       return validarEntradaCampos(evento,letras);
    }

    volverListado(){
        this.ruta.navigate(['/usuarioListado']);
    }

    agregarEditar(){
      this.baseDatosService.consulta(formularioDatos(this._usuario),rutaPhpUsuario,"usuario_agregarEditar").subscribe(data => {
            
            if(data[0].estatusConsulta===1){
              this.mensajeExitoso = this.mensaje.open(MensajeExitosoComponent,{
                width:'40%'
              });

              this.mensajeExitoso.afterClosed().subscribe(result => {
                this.ruta.navigate(['/usuarioListado']);
              });
              return;
            }
            else if(data[0].estatusConsulta===-1)
              this._mensaje = new mensaje("REDUNDANCIA DE DATOS","*El Login debe ser irrepetible");
            else if(data[0].estatusConsulta===-2)
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

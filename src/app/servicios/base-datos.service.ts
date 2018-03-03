import { Injectable } from '@angular/core';

//-- Interacción con backend (Envío y recepción de datos) --//
import {Http, Headers, Response, Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';
//----------------------------------------------------------//

@Injectable()

export class BaseDatosService {

  	 constructor(private http:Http) {}

	 consulta(parametros:FormData,rutaPhpModulo:string,archivoPHP:string){
	   	 return this.http.post(rutaPhpModulo+archivoPHP+'.php',parametros).map((response: Response) => response.json());
	 }

 }



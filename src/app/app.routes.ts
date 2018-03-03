import { RouterModule, Routes} from '@angular/router';

//Componentes
import {LoginComponent} from "./componentes/login/login.component";
import {InicioComponent} from "./componentes/inicio/inicio.component";
import {UsuarioListadoComponent} from "./componentes/usuario-listado/usuario-listado.component";
import { UsuarioFormularioComponent } from './componentes/usuario-formulario/usuario-formulario.component';
import { RecuperarContrasenaComponent } from './componentes/recuperar-contrasena/recuperar-contrasena.component';
import { DepartamentoListadoComponent } from './componentes/departamento-listado/departamento-listado.component';
import { DepartamentoFormularioComponent } from './componentes/departamento-formulario/departamento-formulario.component';
import { CargoListadoComponent } from './componentes/cargo-listado/cargo-listado.component';
import { CargoFormularioComponent } from './componentes/cargo-formulario/cargo-formulario.component';
import { EmpleadoListadoComponent } from './componentes/empleado-listado/empleado-listado.component';
import { EmpleadoFormularioComponent } from './componentes/empleado-formulario/empleado-formulario.component';


const rutas: Routes = [
	{
		path: 'inicio', 
		children : [
					{path:'', component: InicioComponent}
        ]

	},
	{
		path: 'login',
		children : [
					{path:'', component: LoginComponent}
        ]
	},
	{
		path: 'recuperarContrasena',
		children : [
					{path:'', component: RecuperarContrasenaComponent}
        ]
	},
	{
		path: 'usuarioListado',
		children : [
					{path:'', component:UsuarioListadoComponent}
        ]

	},
	{
	    path: 'usuarioFormulario/:id',
	    children : [
					{path:'', component:UsuarioFormularioComponent}
        ]
	},
	{
		path: 'departamentoListado',
		children : [
					{path:'', component:DepartamentoListadoComponent}
        ]

	},
	{
	    path: 'departamentoFormulario/:id',
	    children : [
					{path:'', component:DepartamentoFormularioComponent}
        ]
	},
	{
		path: 'cargoListado',
		children : [
					{path:'', component:CargoListadoComponent}
        ]

	},
	{
	    path: 'cargoFormulario/:id',
	    children : [
					{path:'', component:CargoFormularioComponent}
        ]
	},
	{
		path: 'empleadoListado',
		children : [
					{path:'', component:EmpleadoListadoComponent}
        ]

	},
	{
	    path: 'empleadoFormulario/:id',
	    children : [
					{path:'', component:EmpleadoFormularioComponent}
        ]
	},
	{path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

export const enrutador = RouterModule.forRoot(rutas);
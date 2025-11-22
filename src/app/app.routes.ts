import { Routes } from '@angular/router';
import { ClientesList } from './views/clientes/clientes-list/clientes-list';
import { ClientesFormComponent } from './views/clientes/clientes-form/clientes-form';
import { TecnicosList } from './views/tecnicos/tecnicos-list/tecnicos-list';
import { TecnicosForm } from './views/tecnicos/tecnicos-form/tecnicos-form';


export const routes: Routes = [
    {
        path: 'clientes',
        component: ClientesList
    },
    {
        path: 'clientes/novo',
        component: ClientesFormComponent
    },
    {
        path: 'clientes/editar/:id',
        component: ClientesFormComponent
    },
    {
        path: '',
        redirectTo: 'clientes',
        pathMatch: 'full'
    },
    {
        path: 'tecnicos',
        component: TecnicosList
    },
    {
        path: 'tecnicos/novo',
        component: TecnicosForm
    },
    {
        path: 'tecnicos/editar/:id',
        component: TecnicosForm
    },
    {
        path: '**',
        redirectTo: 'clientes'
    }
];

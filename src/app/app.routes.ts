import { Routes } from '@angular/router';
import { ClientesList } from './views/clientes/clientes-list/clientes-list';
import { ClientesFormComponent } from './views/clientes/clientes-form/clientes-form';
import { TecnicosList } from './views/tecnicos/tecnicos-list/tecnicos-list';
import { TecnicosForm } from './views/tecnicos/tecnicos-form/tecnicos-form';
import { ChamadosList } from './views/chamados/chamados-list/chamados-list';
import { ChamadosFormComponent } from './views/chamados/chamados-form/chamados-form';


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
        path: 'chamados',
        component: ChamadosList
    },
    {
        path: 'chamados/novo',
        component: ChamadosFormComponent
    },
    {
        path: 'chamados/editar/:id',
        component: ChamadosFormComponent
    },
    {
        path: '**',
        redirectTo: 'clientes',
        pathMatch: 'full'
    }
];

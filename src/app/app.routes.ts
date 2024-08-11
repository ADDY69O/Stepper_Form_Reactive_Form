import { Routes } from '@angular/router';
import { ResultComponent } from './result/result.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [

    {
        path:'submit',
        component: ResultComponent
    },
    {
        path:"**",
        component:FormComponent
    }

];

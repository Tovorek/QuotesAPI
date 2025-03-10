import { Routes } from '@angular/router';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { RegisterComponent } from './user-auth/register/register.component';
import { LoginComponent } from './user-auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationComponent } from './quotation/quotation.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DetailsPageComponent } from './details-page/details-page.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    
    { path:'',component:MainLayoutComponent,
        children:[
            { path:'dashboard',component:DashboardComponent },
            { path:'quotation',component:QuotationComponent },
            { path:'details-page',component:DetailsPageComponent },
        ]
    },   
    
    { path:'',component:UserAuthComponent,
        children:[
            {path:'register',component:RegisterComponent },
            {path:'login',component:LoginComponent }

        ]
    }
];

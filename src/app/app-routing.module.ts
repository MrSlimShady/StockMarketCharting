import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RandomGuard } from './random.guard';
import { RegisterComponent } from './components/register/register.component';
import { ImportFormComponent } from './components/import-form/import-form.component';
import { IpoDetailsComponent } from './components/ipo-details/ipo-details.component';
import { CompareFormComponent } from './components/compare-form/compare-form.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { AddExchangeComponent } from './components/add-exchange/add-exchange.component';
import { ManageCompanyComponent } from './components/manage-company/manage-company.component';
import { AddIpoComponent } from './components/add-ipo/add-ipo.component';
import { ManageExchangeComponent } from './components/manage-exchange/manage-exchange.component';
import { CompareCompanyComponent } from './components/compare-company/compare-company.component';
import { CompareSectorComponent } from './components/compare-sector/compare-sector.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {path:'login',component:LoginComponent,canActivate: [AuthGuard]},
  {path:'dashboard',component:DashboardComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'import',component:ImportFormComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'ipo',component:IpoDetailsComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'compare',component:CompareFormComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'compare/company',component:CompareCompanyComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'compare/sector',component:CompareSectorComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'manage/company',component:ManageCompanyComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'manage/company/add',component:AddCompanyComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'manage/exchange',component:ManageExchangeComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'manage/exchange/add',component:AddExchangeComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  {path:'manage/ipo',component:AddIpoComponent,  canActivate: [RandomGuard],
  canLoad: [RandomGuard]},
  { path: 'register',component:RegisterComponent,canActivate: [AuthGuard]},
  { path: '**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

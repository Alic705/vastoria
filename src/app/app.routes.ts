import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { LayoutComponent } from './pages/layout/layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { PropertyComponent } from './pages/property/property';
import { Site } from './pages/site/site';
import { ValuationComponent } from './pages/valuation/valuation';

export const routes: Routes = [
  {
    path: '',
    component: Site,
  },
  {
    path: 'site',
    component: Site,
  },
  {
    path: 'valuation',
    component: ValuationComponent,
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'property-type',
        component: PropertyComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

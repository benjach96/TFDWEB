import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { TrackingComponent } from './pages/tracking/tracking.component';
import { HistoryComponent } from './pages/history/history.component';
import { SupportComponent } from './pages/support/support.component';
import { loggedInGuard } from './logged-in.guard';
import { LogoutComponent } from './pages/logout/logout.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'protected',
    canActivate: [loggedInGuard],
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'tracking/:id', component: TrackingComponent
      },
      {
        path: 'history', component: HistoryComponent
      },
      {
        path: 'support', component: SupportComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

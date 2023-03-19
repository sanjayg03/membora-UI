import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TermsConditionsComponent } from './components/terms-conditions/terms-conditions.component';
import { LoginComponent } from './security/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate: [AuthGuard]
  },
  {
    path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'terms-conditions', component: TermsConditionsComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

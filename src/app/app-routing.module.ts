import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NormalpagesComponent } from './normalpages/normalpages.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './auth.guard';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';
import { MarketComponent } from './market/market.component';
import { TradingComponent } from './trading/trading.component';

import { ListpostsComponent } from './listposts/listposts.component';
import { AddpostComponent } from './addpost/addpost.component';
import { FaqsComponent } from './faqs/faqs.component';
import { NewsComponent } from './news/news.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [

  {path:'', component:NormalpagesComponent, children:[
    {path:'', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'sign-up', component:SignupComponent},
    {path:'verify-account', component:VerifyaccountComponent}
  ]},

   {path:'home',redirectTo:'',  component:HomeComponent},
   {path:'admin/admin_login',component:AdminLoginComponent},
   {path:'admin/admin_dashboard',component:AdminDashboardComponent},

  {path:'market', component:MarketComponent, canActivate:[AuthGuard], children:[
    {path:'',component:TradingComponent},
    {path:'news', component:NewsComponent},
    {path:'faqs',component:FaqsComponent},
    {path:'trading', component:TradingComponent,children:[
    {path:'listpost',component:ListpostsComponent}

    ]},
    {path:'addpost',component:AddpostComponent},
    {path:'profile', component:ProfileComponent},
    {path:'view-profile', component:ViewProfileComponent}
  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

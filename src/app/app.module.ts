import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NormalpagesComponent } from './normalpages/normalpages.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { VerifyaccountComponent } from './verifyaccount/verifyaccount.component';
import { MarketComponent } from './market/market.component';
import { TradingComponent } from './trading/trading.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ListpostsComponent } from './listposts/listposts.component';
import { AddpostComponent } from './addpost/addpost.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MatExpansionModule} from "@angular/material/expansion";
import { FaqsComponent } from './faqs/faqs.component';
import { NewsComponent } from './news/news.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';













@NgModule({
  declarations: [

    AppComponent,
    NormalpagesComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    ViewProfileComponent,
    VerifyaccountComponent,
    MarketComponent,
    TradingComponent,
    SidebarComponent,
    NavComponent,
    FooterComponent,
    ListpostsComponent,
    AddpostComponent,
    DateAgoPipe,
    FaqsComponent,
    NewsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,

  ],
  imports: [
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass:'toast-bottom-right'}),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,MatInputModule,
    MatListModule

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }

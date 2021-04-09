"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var normalpages_component_1 = require("./normalpages/normalpages.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var forms_1 = require("@angular/forms");
var signup_component_1 = require("./signup/signup.component");
var profile_component_1 = require("./profile/profile.component");
var http_1 = require("@angular/common/http");
var view_profile_component_1 = require("./view-profile/view-profile.component");
var verifyaccount_component_1 = require("./verifyaccount/verifyaccount.component");
var market_component_1 = require("./market/market.component");
var trading_component_1 = require("./trading/trading.component");
var sidebar_component_1 = require("./sidebar/sidebar.component");
var nav_component_1 = require("./nav/nav.component");
var footer_component_1 = require("./footer/footer.component");
var listposts_component_1 = require("./listposts/listposts.component");
var addpost_component_1 = require("./addpost/addpost.component");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_toastr_1 = require("ngx-toastr");
var ng2_search_filter_1 = require("ng2-search-filter");
var date_ago_pipe_1 = require("./pipes/date-ago.pipe");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_confirmation_popover_1 = require("angular-confirmation-popover");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                normalpages_component_1.NormalpagesComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                profile_component_1.ProfileComponent,
                view_profile_component_1.ViewProfileComponent,
                verifyaccount_component_1.VerifyaccountComponent,
                market_component_1.MarketComponent,
                trading_component_1.TradingComponent,
                sidebar_component_1.SidebarComponent,
                nav_component_1.NavComponent,
                footer_component_1.FooterComponent,
                listposts_component_1.ListpostsComponent,
                addpost_component_1.AddpostComponent,
                date_ago_pipe_1.DateAgoPipe
            ],
            imports: [
                angular_confirmation_popover_1.ConfirmationPopoverModule.forRoot({
                    confirmButtonType: 'danger'
                }),
                ng2_search_filter_1.Ng2SearchPipeModule,
                animations_1.BrowserAnimationsModule,
                ngx_toastr_1.ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ng_bootstrap_1.NgbModule,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

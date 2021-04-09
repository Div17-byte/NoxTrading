"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DataService = void 0;
var core_1 = require("@angular/core");
var DataService = /** @class */ (function () {
    function DataService(httpclient) {
        this.httpclient = httpclient;
        this.baseUri = "http://localhost:8000";
    }
    DataService.prototype.addPosts = function (pst) {
        return this.httpclient.post(this.baseUri + '/addpost', pst);
    };
    DataService.prototype.readPosts = function () {
        return this.httpclient.get(this.baseUri + '/read');
    };
    DataService.prototype.readUserPosts = function (data) {
        return this.httpclient.post(this.baseUri + '/readUser', data);
    };
    DataService.prototype.updatePosts = function (pst) {
        return this.httpclient.put(this.baseUri + '/update', pst);
    };
    DataService.prototype.deletePosts = function (id) {
        return this.httpclient["delete"](this.baseUri + '/delete/' + id);
    };
    DataService.prototype.filldetails = function (data) {
        //takes the data from login and fills it in details object , this can be used through out the execution.
        this.details = {};
        this.details.FullName = data.FullName;
        this.details.email = data.email;
        this.details.password = data.password;
    };
    DataService.prototype.detailsFiller = function () {
        var _this = this;
        //if details in ds is already filled that is the user has come to the proflepage after login then just get the details to be printed on the profile page
        if (this.details != undefined) {
            return this.details;
        }
        else {
            //if details in ds is not filled already that is the user has not come directly from login page then get the email from local storage and get the details from database and save it in details
            if (localStorage.getItem('email')) {
                this.httpclient.get('http://localhost:8000/get-details/' + localStorage.getItem('email')).subscribe(function (resp) {
                    if (resp.status == "200") {
                        _this.filldetails(resp.data);
                        return _this.details;
                    }
                });
            }
        }
    };
    DataService.prototype.login = function (data) {
        return this.httpclient.post('http://localhost:8000/login', data);
    };
    DataService.prototype.signup = function (data) {
        return this.httpclient.post('http://localhost:8000/sign-up', data);
    };
    DataService.prototype.verifyAccount = function (data) {
        return this.httpclient.post("http://localhost:8000/verify-account", data);
    };
    DataService.prototype.authenticationCheck = function () {
        if (localStorage.getItem('email')) {
            return true;
        }
        else {
            return false;
        }
    };
    DataService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListpostsComponent = void 0;
var core_1 = require("@angular/core");
var ListpostsComponent = /** @class */ (function () {
    function ListpostsComponent(_dataService, router) {
        this._dataService = _dataService;
        this.router = router;
        this.username = localStorage.getItem('firstname');
    }
    ListpostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.readPosts();
        this.interval = setInterval(function () {
            _this.readPosts();
        }, 30000);
    };
    ListpostsComponent.prototype.ngOnDestroy = function () {
        if (this.interval) {
            clearInterval(this.interval);
        }
    };
    ListpostsComponent.prototype.readPosts = function () {
        var _this = this;
        this._dataService.readPosts().subscribe(function (data) {
            _this.posts = data['msg'];
            _this.totalPost = Object.keys(_this.posts).length;
            console.log(_this.posts);
        }, function (error) {
            console.log(error);
        });
    };
    ListpostsComponent = __decorate([
        core_1.Component({
            selector: 'app-listposts',
            templateUrl: './listposts.component.html',
            styleUrls: ['./listposts.component.css']
        })
    ], ListpostsComponent);
    return ListpostsComponent;
}());
exports.ListpostsComponent = ListpostsComponent;

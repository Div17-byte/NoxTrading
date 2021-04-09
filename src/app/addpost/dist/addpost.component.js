"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddpostComponent = void 0;
var core_1 = require("@angular/core");
var data_service_1 = require("../data.service");
var posts_model_1 = require("../posts.model");
var AddpostComponent = /** @class */ (function () {
    function AddpostComponent(postService) {
        this.postService = postService;
        this.postModel = new posts_model_1.Posts;
        this.isPosted = false;
        this.username = localStorage.getItem('firstname');
        this.steamLink = localStorage.getItem('steamLink');
        this.userEmail = localStorage.getItem('email');
    }
    AddpostComponent.prototype.ngOnInit = function () {
        this.readUserPosts();
    };
    AddpostComponent.prototype.readUserPosts = function () {
        var _this = this;
        this.postService.readUserPosts({ email: this.userEmail }).subscribe(function (data) {
            _this.posts = data['msg'];
        }, function (error) {
            console.log(error);
        });
    };
    AddpostComponent.prototype.doDelete = function (p) {
        var _this = this;
        this.postService.deletePosts(p._id).subscribe(function (data) {
            _this.readUserPosts();
        }, function (error) {
        });
        this.readUserPosts();
    };
    AddpostComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (form.value._id == "") {
            this.postModel.username = this.username;
            this.postModel.buyLink = this.steamLink;
            this.postModel.userEmail = this.userEmail;
            this.postService.addPosts(this.postModel).subscribe(function (res) {
                _this.isPosted = true;
                _this.readUserPosts();
                // 
            });
        }
        this.readUserPosts();
    };
    AddpostComponent = __decorate([
        core_1.Component({
            selector: 'app-addpost',
            templateUrl: './addpost.component.html',
            styleUrls: ['./addpost.component.css'],
            providers: [data_service_1.DataService]
        })
    ], AddpostComponent);
    return AddpostComponent;
}());
exports.AddpostComponent = AddpostComponent;

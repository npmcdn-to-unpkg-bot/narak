export class ShareController {
    constructor($scope, $window, Facebook, $state, $log, $http, $mdMedia, CONSTANT, DataService) {
        'ngInject';

        this.facebook = Facebook;
        this.$scope = $scope;
        this.loggedIn = false;
        this.isFacebookReady = false;
        this.$state = $state;
        this.$log = $log;
        this.$http = $http;
        this.$window = $window;
        this.constant = CONSTANT;
        this.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        this.dataService = DataService;
        this.post = {};
        this.activate();

        this.$scope.$watch(() => {
            return this.facebook.isReady();
        }, () => {
            this.isFacebookReady = true;
            this.getLoginStatus(()=>{
                this.share();
            });
        });

    }

    activate(){
        this.post = this.dataService.get('post');
        // this.imagePath = 'https://narakclub.com/uploads/images/4888.jpg';
        if(this.post.image_path){
            this.imagePath = this.constant.domainUrl + this.constant.uploadedPath + this.post.image_path;
        }else{
            this.$state.go('intro');
        }
    }
    getLoginStatus(callback) {
        this.facebook.getLoginStatus(callback);
    }

    me(callback) {
        this.facebook.api('/me?locale=en_US&fields=name,email', callback);
    }

    share(){
        var sharingUrl = '';
        if(this.post){
            sharingUrl = this.constant.domainUrl + '?token=' + this.post.random_no + '&' + new Date().getTime();
        }else{
            sharingUrl = this.constant.domainUrl;
        }

        this.facebook.ui({
            method: 'share',
            href: sharingUrl
        }, ()=>{});
    }

    goVote(){
        let sharingUrl = this.constant.domainUrl + '?token=' + this.post.random_no + '&' + new Date().getTime();
        this.$window.location = sharingUrl;
    }
}
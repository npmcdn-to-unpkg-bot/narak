

export class NarakFileUploadComponent{

    static get IMAGE_SUBMITTED_EVENT(){
       return 'imageSubmitted';
    }

    constructor(){
        this.templateUrl = 'app/components/narak.fileupload/narak.fileupload.html';
        this.bindings = {
            model: '='
        }
    }

    controller($scope, $rootScope){
        'ngInject';

        $scope.image = this.model;
        $scope.upload = (dataUrl) => {
            $rootScope.$broadcast(NarakFileUploadComponent.IMAGE_SUBMITTED_EVENT, dataUrl);
        };

        $scope.$watch('image', (newModel)=>{
            this.model = newModel;
        });
    }
}

angular
    .module('narakFileUpload', ['ngFileUpload', 'ngImgCrop'])
    .component('narakFileUpload',new NarakFileUploadComponent());
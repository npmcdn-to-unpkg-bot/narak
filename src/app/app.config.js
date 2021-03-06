export function config ($logProvider, FacebookProvider, cfpLoadingBarProvider, $locationProvider, $mdIconProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(false);
  $locationProvider.html5Mode(true);
  FacebookProvider.init('1692839044337701');

  cfpLoadingBarProvider.spinnerTemplate = '<div class="loading-backdrop"></div>';


  $mdIconProvider.fontSet('md', 'material-icons');

}

( function () {
  'use strict';
  angular.module( 'confusionApp', [ 'ngMessages', 'ui.router' ] );
} )();

// config

( function () {
  'use strict';

  function configApp( $stateProvider, $urlRouterProvider ) {

    $urlRouterProvider.otherwise( '/' );

    // route for the home page
    $stateProvider.state( 'app', {
      url: "/",
      views: {
        'header': {
          'templateUrl': 'views/header.html'
        },
        'content': {
          'controller': 'IndexController',
          'templateUrl': 'views/home.html'
        },
        'footer': {
          'templateUrl': 'views/footer.html'
        },
      }
    } );
    // route for the about page
    $stateProvider.state( 'app.aboutus', {
      url: 'aboutus',
      views: {
        'content@': {
          controller: 'AboutController',
          'templateUrl': 'views/aboutus.html'
        }
      }
    } );

    // route for the dishdetail page
    $stateProvider.state( 'app.dishdetails', {
      url: 'menu/{id}',
      views: {
        'content@': {
          templateUrl: 'views/dish.single.html',
          controller: 'DishDetailController'
        }
      }
    } );

  }

  configApp.$inject = [ '$stateProvider', '$urlRouterProvider' ];

  angular.module( 'confusionApp' ).config( configApp );

} )();

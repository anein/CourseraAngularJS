// DishDetailController
( function () {

  'use strict';

  function DishDetailController( $scope, $stateParams, MenuFactory, DishFactory ) {

    MenuFactory.getDish( $stateParams.id ).then( function ( response ) {
      $scope.dish = response;
    } ).catch( function ( err ) {
      $scope.dish = null;
    } );

    DishFactory.setDish( $scope.dish );

    $scope.dish = DishFactory.getDish();

  }

  // inject
  DishDetailController.$inject = [ '$scope', '$stateParams', 'MenuFactory', 'DishFactory' ];

  //
  angular.module( 'confusionApp' ).controller( 'DishDetailController', DishDetailController );

} )();

// DishCommentController
( function () {

  'use strict';

  function DishCommentController( $scope, DishFactory ) {

    $scope.comment = {
      'rating': 5
    };

    $scope.submitComment = function () {

      //Step 2: This is how you record the date
      $scope.comment.date = new Date().toISOString();

      // Step 3: Push your comment into the dish's comment array
      DishFactory.addComment( $scope.comment );

      //Step 4: reset your form to pristine
      $scope.commentForm.$setPristine();
      $scope.commentForm.$setUntouched();

      //Step 5: reset your JavaScript object that holds your comment
      $scope.comment = {
        'rating': 5
      };
    };

  }

  // inject
  DishCommentController.$inject = [ '$scope', 'DishFactory' ];

  // export
  angular.module( 'confusionApp' ).controller( 'DishCommentController', DishCommentController );
} )();

// IndexController

( function () {
  'use strict';

  function IndexController( $scope, MenuFactory, CorporateFactory ) {

    // in fact it's a bad practice

    // get dishes
    MenuFactory.getDishes( {
      label: 'Hot'
    } ).then( function ( response ) {
      $scope.dishes = response;
    } ).catch( function ( err ) {
      $scope.dishes = null;
      $scope.dishesErrorMessage = "Error: " + err.status + " " + err.statusText;
    } );

    // get a promoted dish
    MenuFactory.getPromotion( 0 ).then( function ( response ) {
      $scope.promo = response;
    } ).catch( function ( err ) {
      $scope.promo = null;
      $scope.promoErrorMessage = "Error: " + err.status + " " + err.statusText;
    } );

    CorporateFactory.getLeader( 3 ).then( function ( response ) {
      $scope.specialist = response;
    } ).catch( function ( err ) {
      $scope.specialistErrorMessage = "Error: " + err.status + " " + err.statusText;
      $scope.specialist = null;
    } );

  }

  // inject
  IndexController.$inject = [ '$scope', 'MenuFactory', 'CorporateFactory' ];

  //
  angular.module( 'confusionApp' ).controller( 'IndexController', IndexController );


} )();

//AboutController

( function () {
  'use strict';

  function AboutController( $scope, CorporateFactory ) {

    CorporateFactory.getLeaders().then( function ( response ) {
      $scope.specialists = response;
    } ).catch( function ( err ) {
      $scope.specialistsErrorMessage = "Error: " + err.status + " " + err.statusText;
      $scope.specialists = null;
    } );

  }

  // inject
  AboutController.$inject = [ '$scope', 'CorporateFactory' ];

  //
  angular.module( 'confusionApp' ).controller( 'AboutController', AboutController );
} )();


//AboutController

( function () {
  'use strict';

  function FeedbackController( $scope, FeedbackFactory ) {

    $scope.feedback = {};

    FeedbackFactory.getAll().then( function ( response ) {
      $scope.feedbacks = response;
    } ).catch( function ( err ) {
      console.log( err );
    } );

    $scope.submitFeedback = function () {

      $scope.feedback.date = new Date().toISOString();

      // save feedback
      var promise = FeedbackFactory.save( $scope.feedback );
      promise.then( function () {
        $scope.feedbackForm.$setPristine();
        $scope.feedbackForm.$setUntouched();
        $scope.feedbacks.push( $scope.feedback );
        $scope.feedback = null;

      } ).catch( function ( err ) {
        console.error( err );
      } );
    };

  }

  // inject
  FeedbackController.$inject = [ '$scope', 'FeedbackFactory' ];

  //
  angular.module( 'confusionApp' ).controller( 'FeedbackController', FeedbackController );
} )();

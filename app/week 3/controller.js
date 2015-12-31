// DishDetailController
( function () {

  'use strict';

  function DishDetailController( $scope, $stateParams, MenuFactory, DishFactory ) {

    var dish = MenuFactory.getDish($stateParams.id);

    DishFactory.setDish( dish );

    $scope.dish = DishFactory.getDish();

  }

  // inject
  DishDetailController.$inject = [ '$scope', '$stateParams', 'MenuFactory' ,'DishFactory' ];

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

    $scope.dishes = MenuFactory.getDishes().filter( function( dish ){
      return dish.label === 'Hot';
    });

    $scope.promo = MenuFactory.getPromotion( 0 );
    $scope.specialist = CorporateFactory.getLeader( 3 );

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
    $scope.specialists = CorporateFactory.getLeaders();
  }

  // inject
  AboutController.$inject = [ '$scope', 'CorporateFactory' ];

  //
  angular.module( 'confusionApp' ).controller( 'AboutController', AboutController );
} )();

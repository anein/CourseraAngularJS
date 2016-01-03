// MenuService
( function () {
  'use strict';

  function MenuFactory( $resource ) {

    var Dish = $resource('//localhost:3000/dishes/:id', {}, {});

    var Promotion = $resource( '//localhost:3000/promotions/:id', {}, {
      get: {
        cache: true,
        method: 'GET'
      }
    } );

    return {
      getDish: function ( index ) {
        console.log( index );
        return Dish.get( { id: index } ).$promise;
      },

      getDishes: function ( params ) {
        return Dish.query( params ).$promise;
      },

      getPromotion: function ( index ) {
        return Promotion.get( { id: index } ).$promise;
      }
    };

  }

  MenuFactory.$inject = [ '$resource' ];

  angular.module( 'confusionApp' ).factory( 'MenuFactory', MenuFactory );

} )();

//Dish service

( function () {
  'use strict';

  function DishFactory( MenuFactory ) {

    var dish = null;

    return {

      getDish: function () {
        return dish;
      },

      setDish: function ( d ) {
        dish = d;
      },

      addComment: function ( comment ) {
        MenuFactory.getDish( dish._id ).comments.push( comment );
      }
    };

  }

  //
  DishFactory.$inject = [ 'MenuFactory' ];

  angular.module( 'confusionApp' ).factory( 'DishFactory', DishFactory );

} )();

// corporate factory

( function () {
  'use strict';

  function CorporateFactory( $resource ) {

    var Leadership = $resource( '//localhost:3000/leadership/:id' );

    return {

      getLeaders: function () {
        return Leadership.query().$promise;
      },

      getLeader: function ( index ) {
        return Leadership.get( { id : index } ).$promise;
      }
    };

  }
  // inject
  CorporateFactory.$inject = [ '$resource' ];
  // export
  angular.module( 'confusionApp' ).factory( 'CorporateFactory', CorporateFactory );

} )();

// Feedback factory

( function () {
  'use strict';

  function FeedbackFactory( $resource ) {

    var Feedback = $resource( '//localhost:3000/feedback/:id' );

    return {

      save: function ( form ) {
        var newFeedback = new Feedback( form );
        return newFeedback.$save();
      },

      get: function ( index ) {
        return Feedback.get( { id : index } ).$promise;
      },
      getAll: function () {
        return Feedback.query().$promise;
      }

    };

  }
  // inject
  FeedbackFactory.$inject = [ '$resource' ];
  // export
  angular.module( 'confusionApp' ).factory( 'FeedbackFactory', FeedbackFactory );

} )();

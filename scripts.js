// Board Controller

const boardController = function() {

}();

// UI Controller

const uiController = function() {

}();

// Global Controller 

const globalController = function(boardCtrl, uiCtrl) {

  return {
      init: function () {
          console.log('Application Initialized');
      }
  }
}(boardController, uiController);

globalController.init();
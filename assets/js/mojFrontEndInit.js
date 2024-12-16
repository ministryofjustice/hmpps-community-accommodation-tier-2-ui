const $buttonmenu = document.querySelectorAll('[data-module="moj-button-menu"]');
MOJFrontend.nodeListForEach($buttonmenu, function ($buttonmenu) {
  new MOJFrontend.ButtonMenu($buttonmenu, {}).init();
});

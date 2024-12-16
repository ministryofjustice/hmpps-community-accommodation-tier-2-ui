const $buttonmenu = document.querySelectorAll('[data-module="moj-button-menu"]');

const debugBeforeLoop = document.createElement('div');
debugBeforeLoop.textContent = 'Debug: Starting to process button menus...';
debugBeforeLoop.style.color = 'red';
document.body.prepend(debugBeforeLoop);

MOJFrontend.nodeListForEach($buttonmenu, function ($buttonmenu, index) {
  const debugInLoop = document.createElement('div');
  debugInLoop.textContent = `Debug: Processing button menu #${index + 1}`;
  debugInLoop.style.color = 'blue';
  document.body.prepend(debugInLoop);
  new MOJFrontend.ButtonMenu($buttonmenu, {}).init();
});

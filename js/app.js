'use strict';

window.addEventListener('load', function () {
  getTasksListFromLocalStorage();
  createTasks(tasksData);
});

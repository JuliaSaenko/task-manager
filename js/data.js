'use strict';

const confirmPopup = document.querySelector('.confirm-popup');
const newTaskBtn = document.querySelector('.tasks__new-btn');

let tasksData = [
  new TaskConstructor(0, `Do the homework`, `Do the HW`),
  new TaskConstructor(1, `Make a dinner`, `Lorem ipsum`),
  new TaskConstructor(2, `Watch a movie`, `Lorem ipsum`),
];

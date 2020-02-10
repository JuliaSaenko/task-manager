'use strict';

function createTasks(tasksData) {
  const tasksBoard = document.querySelector('.tasks-board');
  tasksBoard.innerHTML = "";

  for( let i = 0; i < tasksData.length; i++) {
    let task = createTask(tasksData[i]);
    setTaskType(task, tasksData[i]);
    setTaskPriority(task, tasksData[i]);
    tasksBoard.appendChild(task);
  }

  let tasksArrayWithoutMethods = JSON.stringify(tasksData);
  localStorage.setItem('tasksArrayInJSONFormat', tasksArrayWithoutMethods);
}

function getTasksListFromLocalStorage() {
  if(localStorage.getItem('tasksArrayInJSONFormat')) {
    let tasksListInString = localStorage.getItem('tasksArrayInJSONFormat');
    let tasksArrayWithoutMethods = JSON.parse(tasksListInString);
    tasksData = [];

    for(let i = 0; i < tasksArrayWithoutMethods.length; i++) {
      tasksData.push(new TaskConstructor(tasksArrayWithoutMethods[i].id, tasksArrayWithoutMethods[i].title, tasksArrayWithoutMethods[i].text, tasksArrayWithoutMethods[i].type, tasksArrayWithoutMethods[i].priority));
    }
  } else {
    let tasksArrayWithoutMethods = JSON.stringify(tasksData);
    localStorage.setItem('tasksArrayInJSONFormat', tasksArrayWithoutMethods);
  }
}

function createTask(taskElement) {
  let task = renderElement('article', 'task', null);
  task.innerHTML = '';

  renderTaskInfo(task, taskElement);

  setTaskType(task, taskElement);
  setTaskPriority(task, taskElement);

  const taskForm = task.querySelector('.task__form')

  const taskEditBtn = task.querySelector('.task__edit');
  taskEditBtn.setAttribute('data-id', taskElement.id);

  const taskSaveBtn = task.querySelector('.task__save');
  taskSaveBtn.setAttribute('data-save', taskElement.id);

  taskSaveBtn.addEventListener('click', function() {
    console.log(1);
    if(parseInt(taskSaveBtn.getAttribute('data-save')) === taskElement.id) {
      hideSection(confirmPopup);
      changeTaskInfo(taskElement, task);

      for(let i = 0; i < taskForm.elements.length; i++) {
        taskForm.elements[i].removeAttribute('disabled');
      }
    }
  });

  const taskControlsBtn = task.querySelector('.task__btns');

  taskEditBtn.addEventListener('click', function() {
    taskControlsBtn.classList.toggle('hidden');
    for(let i = 0; i < taskForm.elements.length; i++) {
      taskForm.elements[i].removeAttribute('disabled');
    }
  });

  let removeTaskBtn = task.querySelector('.task__delete');
  removeTaskBtn.setAttribute('data-btn', taskElement.id);

  removeTaskBtn.addEventListener('click', function() {
    if(parseInt(removeTaskBtn.getAttribute('data-btn')) === taskElement.id) {
      showConfirmMessage(tasksData, taskElement.id);
     }
  });
  return task;
}

function renderTaskInfo(container, taskElement) {
  container.innerHTML = `
         <div class="task__inner task__inner--${taskElement.type} task__inner--${taskElement.priority}" ${taskElement.id ? `data-id=${taskElement.id}` : ''}>
           <button class="task__edit btn" type="button">Edit</button>
           <form class="task__form">
               <input class="task__title" type="text" name="title" value="${taskElement.title}" placeholder="Task title here" required disabled>
               <textarea class="task__text" name="text" placeholder="Start text here" required disabled>${taskElement.text}</textarea>
               <select class="task__type-select" name="type" required disabled>
                   <option value="open">open</option>
                   <option value="in progress">in progress</option>
                   <option value="done">done</option>
               </select>
               <select class="task__priority-select" name="priority" required disabled>
                   <option value="low">low</option>
                   <option value="minor">minor</option>
                   <option value="major">major</option>
                   <option value="high">high</option>
               </select>
               <div class="task__btns hidden">
                   <button class="task__save task__btn" type="submit">Save</button>
                   <button class="task__delete task__btn" type="button">Delete</button>
               </div>
           </form>
         </div>
     `;
}

function setTaskType(container, taskElement) {
  const typeSelect = container.querySelector(`.task__type-select`);
  typeSelect.selectedIndex = [...typeSelect.options].findIndex(option => option.text === taskElement.type);
}

function setTaskPriority(container, taskElement) {
  const prioritySelect = container.querySelector(`.task__priority-select`);
  prioritySelect.selectedIndex = [...prioritySelect.options].findIndex(option => option.text === taskElement.priority);
}

function changeTaskInfo(taskElement, task) {
  const taskForm = task.querySelector('.task__form');
  const taskTypeSelect = task.querySelector('.task__type-select');
  const taskPrioritySelect = task.querySelector('.task__priority-select');

  task.innerHTML = '';
  taskElement.title = taskForm.elements.title.value;
  taskElement.text = taskForm.elements.text.value;
  taskElement.type = taskTypeSelect.options[taskTypeSelect.selectedIndex].value;
  taskElement.priority = taskPrioritySelect.options[taskPrioritySelect.selectedIndex].value;

  console.log(tasksData);

  createTasks(tasksData);

  return taskElement;
}



function showConfirmMessage(tasksData, taskId) {
  confirmPopup.classList.remove('hidden');

  const confirmBtn = confirmPopup.querySelector('.confirm-popup__btn--confirm');
  confirmBtn.addEventListener('click', function() {
    removeTask(tasksData, taskId);
    confirmPopup.classList.add('hidden');
  });

  const cancelBtn = confirmPopup.querySelector('.confirm-popup__btn--cancel');
  cancelBtn.addEventListener('click', function() {
    confirmPopup.classList.add('hidden');
  });
}

function removeTask(tasksData, taskId) {
  tasksData.splice(taskId, 1);
  createTasks(tasksData);
}


function addNewTask() {
  const newTask = document.querySelector('.new-task');
  newTask.classList.remove('hidden');
  newTask.innerHTML = `
         <div class="task__inner">
           <form class="task__form task__form--new">
               <input class="task__title" type="text" name="title" value="" placeholder="Task title here" required>
               <textarea class="task__text" name="text" placeholder="Start text here" required></textarea>
               <select class="task__type-select" name="type" required>
                   <option value="open">open</option>
                   <option value="in progress">in progress</option>
                   <option value="done">done</option>
               </select>
               <select class="task__priority-select" name="priority" required>
                   <option value="low">low</option>
                   <option value="minor">minor</option>
                   <option value="major">major</option>
                   <option value="high">high</option>
               </select>
               <div class="task__btns">
                   <button class="task__save" type="submit">Save</button>
                   <button class="task__delete" type="button">Delete</button>
               </div>
           </form>
         </div>
     `;

     const newTaskForm =  newTask.querySelector('.task__form--new');
     const newTaskSaveBtn = newTask.querySelector('.task__save');
     newTaskSaveBtn.addEventListener('click', function() {
       let newTaskElement = getNewTaskInfo(newTaskForm, tasksData);
       tasksData.push(newTaskElement);

       createTasks(tasksData);

       newTask.innerHTML = "";
       newTask.classList.add('hidden');
       newTaskForm.reset();
     });

     const newTaskDeleteBtn = newTask.querySelector('.task__delete');
     newTaskDeleteBtn.addEventListener('click', function() {
       newTask.innerHTML = "";
       newTask.classList.add('hidden');
     });
}

function getNewTaskInfo(form, taskData) {
   let newTaskElement = new TaskConstructor;

   const taskTypeSelect = form.querySelector('.task__type-select');
   const taskPrioritySelect = form.querySelector('.task__priority-select');

   newTaskElement.id = taskData.length;
   newTaskElement.title = form.elements.title.value;
   newTaskElement.text = form.elements.text.value;
   newTaskElement.type = taskTypeSelect.options[taskTypeSelect.selectedIndex].value;
   newTaskElement.priority = taskPrioritySelect.options[taskPrioritySelect.selectedIndex].value;

   return newTaskElement;
}

newTaskBtn.addEventListener('click', function() {
    addNewTask();
});

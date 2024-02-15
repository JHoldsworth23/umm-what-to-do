/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createProjectForm: () => (/* binding */ createProjectForm),
/* harmony export */   createTaskForm: () => (/* binding */ createTaskForm),
/* harmony export */   projectFormButton: () => (/* binding */ projectFormButton),
/* harmony export */   taskFormButton: () => (/* binding */ taskFormButton)
/* harmony export */ });
const createProjectForm = () => {
    const projectDiv = document.querySelector('.projects');
    const addNewBtn = document.querySelector('#add-new-project');
    const form = document.createElement('form');
    form.id = 'project-form';
    form.autocomplete = 'off';
    form.classList.add('hidden');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('project-inputs');

    inputDiv.innerHTML = `
        <input type="text" id="new-project" placeholder="Enter a New Project Name" maxlength="20" required>
        <p class="error-message hidden">You need to add a title for new project!</p>
        <div class="form-buttons">
            <input type="submit" class="submit-btn" value="Add">
            <input type="button" class="cancel-btn" value="Cancel">
        </div>
    `;

    form.appendChild(inputDiv);
    projectDiv.insertBefore(form, addNewBtn);
}

const projectFormButton = () => {
    const projectDiv = document.querySelector('.projects');
    const projectFormButton = document.createElement('button');
    projectFormButton.id = 'add-new-project';
    projectFormButton.innerHTML = '<i class="fa-solid fa-file-circle-plus"></i> Add a New Project';
    projectDiv.appendChild(projectFormButton);
}

const createTaskForm = () => {
    const taskDiv = document.querySelector('.right-panel');
    const addNewTaskBtn = document.querySelector('#add-new-task');
    const form = document.createElement('form');
    form.id = 'task-form';
    form.autocomplete = 'off';
    form.classList.add('hidden');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('task-inputs');

    inputDiv.innerHTML = `
        <div class="form-task-input">
            <label for="task-title">Task Title:</label>
            <input type="text" id="task-title" name="task" maxlength="25" required>
        </div>
        <div class="form-task-input">
            <label for="description">Details (Optional):</label>
            <textarea id="description" name="task-description" rows="5" cols="40" placeholder="A short description or a checklist..."></textarea>
        </div>
        <div class="form-task-input">
            <div>
                <input type="radio" id="low" name="priority" value="low" required>
                <label for="low">Low</label>
                <input type="radio" id="medium" name="priority" value="medium" required>
                <label for="medium">Medium</label>
                <input type="radio" id="high" name="priority" value="high" required>
                <label for="high">High</label>
            </div>
            <label for="due-date">Date:</label>
            <input type="date" id="due-date" name="deadline" required>
        </div>
        <div class="task-form-buttons">
            <input type="submit" class="task-submit-btn" value="Add">
            <input type="button" class="task-cancel-btn" value="Cancel">
        </div>
    `;
    form.appendChild(inputDiv);
    taskDiv.insertBefore(form, addNewTaskBtn);
}

const taskFormButton = () => {
    const taskDiv = document.querySelector('.right-panel');
    const taskFormButton = document.createElement('button');
    taskFormButton.id = 'add-new-task';
    taskFormButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add a New Task';
    taskDiv.appendChild(taskFormButton);
}



/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let defaultProjects = [];

class Project {
    constructor(projectId, projectName) {
        this.id = projectId;
        this.name = projectName;
        this.taskList = [];
    }
}

defaultProjects.push(new Project(0, 'Gym'));
defaultProjects.push(new Project(1, 'Study'));

const createEventListener = () => {
    const addProjectBtn = document.querySelector('#add-new-project');
    addProjectBtn.addEventListener('click', showProjectForm);

    const submitFormBtn = document.querySelector('.submit-btn');
    submitFormBtn.addEventListener('click', processNewProject);

    const cancelFormBtn = document.querySelector('.cancel-btn');
    cancelFormBtn.addEventListener('click', hideProjectForm);

    const leftPanel = document.querySelector('.left-panel');
    leftPanel.addEventListener('click', checkWhichPanel);

    displayProject(defaultProjects);
}

const displayProject = (projectArray) => {
    projectArray.forEach(project => {
        addProject(project.id, project.name);
    });
}

const addProject = (projectId, projectInput) => {
    const project = document.querySelector('.projects');
    
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('panel');
    projectContainer.setAttribute('data-projectid', `${projectId}`);

    const icon = document.createElement('i');
    icon.setAttribute('class', 'fa-solid fa-list');
    projectContainer.appendChild(icon);

    const projectName = document.createElement('p');
    projectName.classList.add('project-name');
    projectName.textContent = projectInput;
    projectContainer.appendChild(projectName);

    const editProjectDiv = document.createElement('div');
    editProjectDiv.classList.add('edit-div');
    const editIcon = document.createElement('i');
    editIcon.setAttribute('class', 'fa-regular fa-pen-to-square');
    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'fa-solid fa-trash');

    editProjectDiv.appendChild(editIcon);
    editProjectDiv.appendChild(deleteIcon);
    projectContainer.appendChild(editProjectDiv);

    const projectForm = document.querySelector('#project-form');
    project.insertBefore(projectContainer, projectForm);
}

const getNextIdNum = () => {
    const allProjects = document.querySelectorAll('[data-projectid]');
    return allProjects.length;
}

const showProjectForm = () => {
    const projectForm = document.querySelector('#project-form');
    projectForm.classList.remove('hidden');
    document.querySelector('#new-project').focus();
}

const hideProjectForm = () => {
    const projectForm = document.querySelector('#project-form');
    const projectInput = document.querySelector('#new-project');
    const errorMessage = document.querySelector('.error-message');

    projectForm.classList.add('hidden');
    projectInput.value = '';
    errorMessage.classList.add('hidden');
}

const processNewProject = (e) => {
    e.preventDefault();

    const textInput = document.querySelector('#new-project');
    const errorMessage = document.querySelector('.error-message');
    const projectIdNum = getNextIdNum();
    if (textInput.checkValidity()) {
        errorMessage.classList.add('hidden');
        textInput.classList.remove('invalid');

        const projectName = textInput.value;
        const newProject = new Project(projectName);
        defaultProjects.push(newProject);
        addProject(projectIdNum, projectName);
        hideProjectForm();    
    } else {
        errorMessage.classList.remove('hidden');
        textInput.classList.add('invalid');
    }
}

const selectPanel = (panelNode) => {
    const selectedPanel = document.querySelector('.selected');
    selectedPanel.classList.remove('selected');
    panelNode.classList.add('selected');
}

const checkWhichPanel = (e) => {
    const homePanels = e.target.closest('.home .panel');
    const projectPanels = e.target.closest('.projects .panel');
    
    if (homePanels) {
        selectPanel(homePanels);
    }
    
    if (projectPanels) {
        selectPanel(projectPanels);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createEventListener);

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   taskEvent: () => (/* binding */ taskEvent)
/* harmony export */ });
let idCounter = 0;

class Task {
    constructor(projectId, taskId, title, details, priority, dueDate) {
        this.projectId = projectId;
        this.id = taskId;
        this.title = title;
        this.details = details;
        this.priority = priority;
        this.dueDate = dueDate;
        this.completed = false;
    }
}

const taskEvent = () => {
    const addTaskBtn = document.querySelector('#add-new-task');
    addTaskBtn.addEventListener('click', showTaskForm);

    const submitTaskForm = document.querySelector('.task-submit-btn');
    submitTaskForm.addEventListener('click', processNewTask);

    const cancelTaskForm = document.querySelector('.task-cancel-btn');
    cancelTaskForm.addEventListener('click', hideTaskForm);
}

// const displayTask = (currentProject) => {
//     const todoDiv = document.querySelector('.todo-list');
//     todoDiv.textContent = '';
//     defaultProjects[currentProject].taskList.forEach(task => {
//         addTask(task.id, task.title, task.details, task.priority, task.dueDate, task.completed);
//     });
// }

const addTask = (taskId, taskTitle, priority, dueDate) => {
    const todoDiv = document.querySelector('.todo-list');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.id = taskId;

    const taskLeftDiv = document.createElement('div');
    taskLeftDiv.classList.add('task-left-div');

    // const checkbox = document.createElement('input');
    // checkbox.type = 'checkbox';
    // taskLeftDiv.appendChild(checkbox);

    const priorityStatus = document.createElement('p');
    priorityStatus.setAttribute('class', `${priority.toLowerCase()}`);
    priorityStatus.textContent = priority;
    taskLeftDiv.appendChild(priorityStatus);

    const title = document.createElement('p');
    title.classList.add('task-title');
    title.textContent = taskTitle;
    taskLeftDiv.appendChild(title);

    const taskBtns = document.createElement('div');
    taskBtns.classList.add('task-btns');

    const detailsBtn = document.createElement('button');
    detailsBtn.classList.add('details');
    detailsBtn.textContent = 'Details';
    taskBtns.appendChild(detailsBtn);
    // add event for the button - dialog

    const date = document.createElement('p');
    date.classList.add('date');
    date.textContent = dueDate;
    taskBtns.appendChild(date);

    const editIcon = document.createElement('i');
    editIcon.setAttribute('class', 'task-icon fa-regular fa-pen-to-square');
    taskBtns.appendChild(editIcon);

    const deleteIcon = document.createElement('i');
    deleteIcon.setAttribute('class', 'task-icon fa-solid fa-trash');
    taskBtns.appendChild(deleteIcon);

    taskDiv.appendChild(taskLeftDiv);
    taskDiv.appendChild(taskBtns);
    todoDiv.appendChild(taskDiv);
}

const showTaskForm = () => {
    const taskForm = document.querySelector('#task-form');
    taskForm.classList.remove('hidden');
    document.querySelector('#task-title').focus();
}

const hideTaskForm = () => {
    const taskForm = document.querySelector('#task-form');
    const taskTitleInput = document.querySelector('#task-title');
    const taskDetails = document.querySelector('#description');
    const dateInput = document.querySelector('#due-date');

    taskTitleInput.value = '';
    taskDetails.value = '';
    dateInput.value = '';
    taskForm.classList.add('hidden');
}

const processNewTask = (e) => {
    e.preventDefault();

    const title = document.querySelector('#task-title').value;
    const details = document.querySelector('#description').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const date = document.querySelector('#due-date').value;

    let currentProject = findCurrentProject();
    let taskId = idCounter;

    const newTask = new Task(currentProject, taskId, title, details, priority, date);
    defaultProjects[currentProject].taskList.push(newTask);
    idCounter++;

    addTask(taskId, title, priority, date);
    hideTaskForm();
}

const findCurrentProject = () => {
    const selectedProject = document.querySelector('.selected');
    return selectedProject.dataset.projectid;
}



/***/ }),

/***/ "./src/webpage.js":
/*!************************!*\
  !*** ./src/webpage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ "./src/form.js");


const createMainComponent = () => {
    const content = document.querySelector('#content');
    const header = document.createElement('header');

    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left-panel');

    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right-panel');

    const footer = document.createElement('footer');

    content.appendChild(header);
    content.appendChild(leftPanel);
    content.appendChild(rightPanel);
    content.appendChild(footer);
}

const createHeader = () => {
    const header = document.querySelector('header');
    const title = document.createElement('h1');

    title.textContent = 'Umm What To Do?';

    header.appendChild(title);
}

const createProjectsDiv = () => {
    const sidebar = document.querySelector('.left-panel');
    const homeProjects = document.createElement('div');
    homeProjects.classList.add('home');
    homeProjects.innerHTML = '<h2>Home</h2>'

    const projectDiv = document.createElement('div');
    projectDiv.classList.add('projects');
    projectDiv.innerHTML = '<h2>Projects</h2>';

    const allTasksDiv = document.createElement('div');
    allTasksDiv.setAttribute('class', 'panel selected');
    allTasksDiv.id = 'all-tasks';
    allTasksDiv.innerHTML = '<i class="fa-solid fa-list-ul"></i><p>All Tasks</p>';
    homeProjects.appendChild(allTasksDiv);

    const todayTasksDiv = document.createElement('div');
    todayTasksDiv.classList.add('panel');
    todayTasksDiv.id = 'today-tasks';
    todayTasksDiv.innerHTML = '<i class="fa-solid fa-calendar-day"></i><p>Today</p>';
    homeProjects.appendChild(todayTasksDiv);

    const weekTasksDiv = document.createElement('div');
    weekTasksDiv.classList.add('panel');
    weekTasksDiv.id = 'seven-days';
    weekTasksDiv.innerHTML = '<i class="fa-solid fa-calendar-week"></i><p>In 7 Days</p>';
    homeProjects.appendChild(weekTasksDiv);

    const highPriorityTasksDiv = document.createElement('div');
    highPriorityTasksDiv.classList.add('panel');
    highPriorityTasksDiv.id = 'high-priority';
    highPriorityTasksDiv.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i><p>High Priority Tasks</p>';
    homeProjects.appendChild(highPriorityTasksDiv);

    sidebar.appendChild(homeProjects);
    sidebar.appendChild(projectDiv);
    (0,_form__WEBPACK_IMPORTED_MODULE_0__.projectFormButton)();
}

const createTaskDiv = () => {
    const rightPanel = document.querySelector('.right-panel');
    const currentProjectTitle = document.createElement('div');
    currentProjectTitle.innerHTML = '<h1 class="project-title">All Tasks</h1>';

    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');

    rightPanel.appendChild(currentProjectTitle);
    rightPanel.appendChild(todoList);
    (0,_form__WEBPACK_IMPORTED_MODULE_0__.taskFormButton)();
}

const createFooter = () => {
    const footer = document.querySelector('footer');
    
    const date = new Date();
    footer.innerHTML = `
        <p>Copyright ©️ ${date.getFullYear()} JHoldsworth23</p>
        <a href="https://github.com/JHoldsworth23" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-github"></i>
        </a>
    `;
}

const loadWebpage = () => {
    createMainComponent();
    createHeader();
    createProjectsDiv();
    (0,_form__WEBPACK_IMPORTED_MODULE_0__.createProjectForm)();
    createTaskDiv();
    (0,_form__WEBPACK_IMPORTED_MODULE_0__.createTaskForm)();
    createFooter();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadWebpage);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webpage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webpage */ "./src/webpage.js");
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./project */ "./src/project.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/task.js");




(0,_webpage__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_task__WEBPACK_IMPORTED_MODULE_2__.addTask)(0, 'Lift Weights', '', 'Medium', '6th Feb', false);
(0,_task__WEBPACK_IMPORTED_MODULE_2__.taskEvent)();
(0,_project__WEBPACK_IMPORTED_MODULE_1__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsVUFBVTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxtQkFBbUI7Ozs7Ozs7Ozs7Ozs7OztBQy9IbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsdUJBQXVCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SDhGO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBaUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxxREFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixvQkFBb0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHdEQUFpQjtBQUNyQjtBQUNBLElBQUkscURBQWM7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsV0FBVzs7Ozs7O1VDdkcxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDUTtBQUNBO0FBQzVDO0FBQ0Esb0RBQVc7QUFDWCw4Q0FBTztBQUNQLGdEQUFTO0FBQ1Qsb0RBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vLi9zcmMvZm9ybS5qcyIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby8uL3NyYy9wcm9qZWN0LmpzIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvLy4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vLi9zcmMvd2VicGFnZS5qcyIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNyZWF0ZVByb2plY3RGb3JtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cycpO1xyXG4gICAgY29uc3QgYWRkTmV3QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctcHJvamVjdCcpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgIGZvcm0uaWQgPSAncHJvamVjdC1mb3JtJztcclxuICAgIGZvcm0uYXV0b2NvbXBsZXRlID0gJ29mZic7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpbnB1dERpdi5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWlucHV0cycpO1xyXG5cclxuICAgIGlucHV0RGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cIm5ldy1wcm9qZWN0XCIgcGxhY2Vob2xkZXI9XCJFbnRlciBhIE5ldyBQcm9qZWN0IE5hbWVcIiBtYXhsZW5ndGg9XCIyMFwiIHJlcXVpcmVkPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiZXJyb3ItbWVzc2FnZSBoaWRkZW5cIj5Zb3UgbmVlZCB0byBhZGQgYSB0aXRsZSBmb3IgbmV3IHByb2plY3QhPC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cInN1Ym1pdC1idG5cIiB2YWx1ZT1cIkFkZFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2FuY2VsLWJ0blwiIHZhbHVlPVwiQ2FuY2VsXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG5cclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXREaXYpO1xyXG4gICAgcHJvamVjdERpdi5pbnNlcnRCZWZvcmUoZm9ybSwgYWRkTmV3QnRuKTtcclxufVxyXG5cclxuY29uc3QgcHJvamVjdEZvcm1CdXR0b24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJyk7XHJcbiAgICBjb25zdCBwcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgcHJvamVjdEZvcm1CdXR0b24uaWQgPSAnYWRkLW5ldy1wcm9qZWN0JztcclxuICAgIHByb2plY3RGb3JtQnV0dG9uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWZpbGUtY2lyY2xlLXBsdXNcIj48L2k+IEFkZCBhIE5ldyBQcm9qZWN0JztcclxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEZvcm1CdXR0b24pO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVUYXNrRm9ybSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmlnaHQtcGFuZWwnKTtcclxuICAgIGNvbnN0IGFkZE5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy10YXNrJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5pZCA9ICd0YXNrLWZvcm0nO1xyXG4gICAgZm9ybS5hdXRvY29tcGxldGUgPSAnb2ZmJztcclxuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcblxyXG4gICAgY29uc3QgaW5wdXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGlucHV0RGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2staW5wdXRzJyk7XHJcblxyXG4gICAgaW5wdXREaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXRhc2staW5wdXRcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInRhc2stdGl0bGVcIj5UYXNrIFRpdGxlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGFzay10aXRsZVwiIG5hbWU9XCJ0YXNrXCIgbWF4bGVuZ3RoPVwiMjVcIiByZXF1aXJlZD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS10YXNrLWlucHV0XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkZXNjcmlwdGlvblwiPkRldGFpbHMgKE9wdGlvbmFsKTo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgaWQ9XCJkZXNjcmlwdGlvblwiIG5hbWU9XCJ0YXNrLWRlc2NyaXB0aW9uXCIgcm93cz1cIjVcIiBjb2xzPVwiNDBcIiBwbGFjZWhvbGRlcj1cIkEgc2hvcnQgZGVzY3JpcHRpb24gb3IgYSBjaGVja2xpc3QuLi5cIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXRhc2staW5wdXRcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImxvd1wiIG5hbWU9XCJwcmlvcml0eVwiIHZhbHVlPVwibG93XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibG93XCI+TG93PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cIm1lZGl1bVwiIG5hbWU9XCJwcmlvcml0eVwiIHZhbHVlPVwibWVkaXVtXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwibWVkaXVtXCI+TWVkaXVtPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBpZD1cImhpZ2hcIiBuYW1lPVwicHJpb3JpdHlcIiB2YWx1ZT1cImhpZ2hcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJoaWdoXCI+SGlnaDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIj5EYXRlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZGF0ZVwiIGlkPVwiZHVlLWRhdGVcIiBuYW1lPVwiZGVhZGxpbmVcIiByZXF1aXJlZD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1mb3JtLWJ1dHRvbnNcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cInRhc2stc3VibWl0LWJ0blwiIHZhbHVlPVwiQWRkXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0YXNrLWNhbmNlbC1idG5cIiB2YWx1ZT1cIkNhbmNlbFwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXREaXYpO1xyXG4gICAgdGFza0Rpdi5pbnNlcnRCZWZvcmUoZm9ybSwgYWRkTmV3VGFza0J0bik7XHJcbn1cclxuXHJcbmNvbnN0IHRhc2tGb3JtQnV0dG9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodC1wYW5lbCcpO1xyXG4gICAgY29uc3QgdGFza0Zvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRhc2tGb3JtQnV0dG9uLmlkID0gJ2FkZC1uZXctdGFzayc7XHJcbiAgICB0YXNrRm9ybUJ1dHRvbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wbHVzXCI+PC9pPiBBZGQgYSBOZXcgVGFzayc7XHJcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tGb3JtQnV0dG9uKTtcclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlUHJvamVjdEZvcm0sIHByb2plY3RGb3JtQnV0dG9uLCBjcmVhdGVUYXNrRm9ybSwgdGFza0Zvcm1CdXR0b24gfTsiLCJsZXQgZGVmYXVsdFByb2plY3RzID0gW107XHJcblxyXG5jbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb2plY3RJZCwgcHJvamVjdE5hbWUpIHtcclxuICAgICAgICB0aGlzLmlkID0gcHJvamVjdElkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IHByb2plY3ROYW1lO1xyXG4gICAgICAgIHRoaXMudGFza0xpc3QgPSBbXTtcclxuICAgIH1cclxufVxyXG5cclxuZGVmYXVsdFByb2plY3RzLnB1c2gobmV3IFByb2plY3QoMCwgJ0d5bScpKTtcclxuZGVmYXVsdFByb2plY3RzLnB1c2gobmV3IFByb2plY3QoMSwgJ1N0dWR5JykpO1xyXG5cclxuY29uc3QgY3JlYXRlRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy1wcm9qZWN0Jyk7XHJcbiAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1Byb2plY3RGb3JtKTtcclxuXHJcbiAgICBjb25zdCBzdWJtaXRGb3JtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1idG4nKTtcclxuICAgIHN1Ym1pdEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzTmV3UHJvamVjdCk7XHJcblxyXG4gICAgY29uc3QgY2FuY2VsRm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtYnRuJyk7XHJcbiAgICBjYW5jZWxGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVByb2plY3RGb3JtKTtcclxuXHJcbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdC1wYW5lbCcpO1xyXG4gICAgbGVmdFBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tXaGljaFBhbmVsKTtcclxuXHJcbiAgICBkaXNwbGF5UHJvamVjdChkZWZhdWx0UHJvamVjdHMpO1xyXG59XHJcblxyXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9IChwcm9qZWN0QXJyYXkpID0+IHtcclxuICAgIHByb2plY3RBcnJheS5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgIGFkZFByb2plY3QocHJvamVjdC5pZCwgcHJvamVjdC5uYW1lKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3RJZCwgcHJvamVjdElucHV0KSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcclxuICAgIHByb2plY3RDb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3RpZCcsIGAke3Byb2plY3RJZH1gKTtcclxuXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhLXNvbGlkIGZhLWxpc3QnKTtcclxuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XHJcblxyXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LW5hbWUnKTtcclxuICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdElucHV0O1xyXG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgY29uc3QgZWRpdFByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGVkaXRQcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ2VkaXQtZGl2Jyk7XHJcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZmEtcmVndWxhciBmYS1wZW4tdG8tc3F1YXJlJyk7XHJcbiAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhLXNvbGlkIGZhLXRyYXNoJyk7XHJcblxyXG4gICAgZWRpdFByb2plY3REaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgZWRpdFByb2plY3REaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRQcm9qZWN0RGl2KTtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcclxuICAgIHByb2plY3QuaW5zZXJ0QmVmb3JlKHByb2plY3RDb250YWluZXIsIHByb2plY3RGb3JtKTtcclxufVxyXG5cclxuY29uc3QgZ2V0TmV4dElkTnVtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0aWRdJyk7XHJcbiAgICByZXR1cm4gYWxsUHJvamVjdHMubGVuZ3RoO1xyXG59XHJcblxyXG5jb25zdCBzaG93UHJvamVjdEZvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcclxuICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1wcm9qZWN0JykuZm9jdXMoKTtcclxufVxyXG5cclxuY29uc3QgaGlkZVByb2plY3RGb3JtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XHJcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXByb2plY3QnKTtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvci1tZXNzYWdlJyk7XHJcblxyXG4gICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcclxuICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxufVxyXG5cclxuY29uc3QgcHJvY2Vzc05ld1Byb2plY3QgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHRleHRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcHJvamVjdCcpO1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yLW1lc3NhZ2UnKTtcclxuICAgIGNvbnN0IHByb2plY3RJZE51bSA9IGdldE5leHRJZE51bSgpO1xyXG4gICAgaWYgKHRleHRJbnB1dC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgdGV4dElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSB0ZXh0SW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuICAgICAgICBkZWZhdWx0UHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgICAgICBhZGRQcm9qZWN0KHByb2plY3RJZE51bSwgcHJvamVjdE5hbWUpO1xyXG4gICAgICAgIGhpZGVQcm9qZWN0Rm9ybSgpOyAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRleHRJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHNlbGVjdFBhbmVsID0gKHBhbmVsTm9kZSkgPT4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xyXG4gICAgc2VsZWN0ZWRQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgcGFuZWxOb2RlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbn1cclxuXHJcbmNvbnN0IGNoZWNrV2hpY2hQYW5lbCA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBob21lUGFuZWxzID0gZS50YXJnZXQuY2xvc2VzdCgnLmhvbWUgLnBhbmVsJyk7XHJcbiAgICBjb25zdCBwcm9qZWN0UGFuZWxzID0gZS50YXJnZXQuY2xvc2VzdCgnLnByb2plY3RzIC5wYW5lbCcpO1xyXG4gICAgXHJcbiAgICBpZiAoaG9tZVBhbmVscykge1xyXG4gICAgICAgIHNlbGVjdFBhbmVsKGhvbWVQYW5lbHMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAocHJvamVjdFBhbmVscykge1xyXG4gICAgICAgIHNlbGVjdFBhbmVsKHByb2plY3RQYW5lbHMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFdmVudExpc3RlbmVyOyIsImxldCBpZENvdW50ZXIgPSAwO1xyXG5cclxuY2xhc3MgVGFzayB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9qZWN0SWQsIHRhc2tJZCwgdGl0bGUsIGRldGFpbHMsIHByaW9yaXR5LCBkdWVEYXRlKSB7XHJcbiAgICAgICAgdGhpcy5wcm9qZWN0SWQgPSBwcm9qZWN0SWQ7XHJcbiAgICAgICAgdGhpcy5pZCA9IHRhc2tJZDtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscztcclxuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XHJcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcclxuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCB0YXNrRXZlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctdGFzaycpO1xyXG4gICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dUYXNrRm9ybSk7XHJcblxyXG4gICAgY29uc3Qgc3VibWl0VGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1zdWJtaXQtYnRuJyk7XHJcbiAgICBzdWJtaXRUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHByb2Nlc3NOZXdUYXNrKTtcclxuXHJcbiAgICBjb25zdCBjYW5jZWxUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWNhbmNlbC1idG4nKTtcclxuICAgIGNhbmNlbFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVRhc2tGb3JtKTtcclxufVxyXG5cclxuLy8gY29uc3QgZGlzcGxheVRhc2sgPSAoY3VycmVudFByb2plY3QpID0+IHtcclxuLy8gICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XHJcbi8vICAgICB0b2RvRGl2LnRleHRDb250ZW50ID0gJyc7XHJcbi8vICAgICBkZWZhdWx0UHJvamVjdHNbY3VycmVudFByb2plY3RdLnRhc2tMaXN0LmZvckVhY2godGFzayA9PiB7XHJcbi8vICAgICAgICAgYWRkVGFzayh0YXNrLmlkLCB0YXNrLnRpdGxlLCB0YXNrLmRldGFpbHMsIHRhc2sucHJpb3JpdHksIHRhc2suZHVlRGF0ZSwgdGFzay5jb21wbGV0ZWQpO1xyXG4vLyAgICAgfSk7XHJcbi8vIH1cclxuXHJcbmNvbnN0IGFkZFRhc2sgPSAodGFza0lkLCB0YXNrVGl0bGUsIHByaW9yaXR5LCBkdWVEYXRlKSA9PiB7XHJcbiAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xyXG5cclxuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZCgndGFzaycpO1xyXG4gICAgdGFza0Rpdi5pZCA9IHRhc2tJZDtcclxuXHJcbiAgICBjb25zdCB0YXNrTGVmdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFza0xlZnREaXYuY2xhc3NMaXN0LmFkZCgndGFzay1sZWZ0LWRpdicpO1xyXG5cclxuICAgIC8vIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIC8vIGNoZWNrYm94LnR5cGUgPSAnY2hlY2tib3gnO1xyXG4gICAgLy8gdGFza0xlZnREaXYuYXBwZW5kQ2hpbGQoY2hlY2tib3gpO1xyXG5cclxuICAgIGNvbnN0IHByaW9yaXR5U3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgcHJpb3JpdHlTdGF0dXMuc2V0QXR0cmlidXRlKCdjbGFzcycsIGAke3ByaW9yaXR5LnRvTG93ZXJDYXNlKCl9YCk7XHJcbiAgICBwcmlvcml0eVN0YXR1cy50ZXh0Q29udGVudCA9IHByaW9yaXR5O1xyXG4gICAgdGFza0xlZnREaXYuYXBwZW5kQ2hpbGQocHJpb3JpdHlTdGF0dXMpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSB0YXNrVGl0bGU7XHJcbiAgICB0YXNrTGVmdERpdi5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcblxyXG4gICAgY29uc3QgdGFza0J0bnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhc2tCdG5zLmNsYXNzTGlzdC5hZGQoJ3Rhc2stYnRucycpO1xyXG5cclxuICAgIGNvbnN0IGRldGFpbHNCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGRldGFpbHNCdG4uY2xhc3NMaXN0LmFkZCgnZGV0YWlscycpO1xyXG4gICAgZGV0YWlsc0J0bi50ZXh0Q29udGVudCA9ICdEZXRhaWxzJztcclxuICAgIHRhc2tCdG5zLmFwcGVuZENoaWxkKGRldGFpbHNCdG4pO1xyXG4gICAgLy8gYWRkIGV2ZW50IGZvciB0aGUgYnV0dG9uIC0gZGlhbG9nXHJcblxyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGRhdGUuY2xhc3NMaXN0LmFkZCgnZGF0ZScpO1xyXG4gICAgZGF0ZS50ZXh0Q29udGVudCA9IGR1ZURhdGU7XHJcbiAgICB0YXNrQnRucy5hcHBlbmRDaGlsZChkYXRlKTtcclxuXHJcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGFzay1pY29uIGZhLXJlZ3VsYXIgZmEtcGVuLXRvLXNxdWFyZScpO1xyXG4gICAgdGFza0J0bnMuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG5cclxuICAgIGNvbnN0IGRlbGV0ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICBkZWxldGVJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGFzay1pY29uIGZhLXNvbGlkIGZhLXRyYXNoJyk7XHJcbiAgICB0YXNrQnRucy5hcHBlbmRDaGlsZChkZWxldGVJY29uKTtcclxuXHJcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tMZWZ0RGl2KTtcclxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0J0bnMpO1xyXG4gICAgdG9kb0Rpdi5hcHBlbmRDaGlsZCh0YXNrRGl2KTtcclxufVxyXG5cclxuY29uc3Qgc2hvd1Rhc2tGb3JtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XHJcbiAgICB0YXNrRm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRpdGxlJykuZm9jdXMoKTtcclxufVxyXG5cclxuY29uc3QgaGlkZVRhc2tGb3JtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1mb3JtJyk7XHJcbiAgICBjb25zdCB0YXNrVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRpdGxlJyk7XHJcbiAgICBjb25zdCB0YXNrRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpO1xyXG4gICAgY29uc3QgZGF0ZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZS1kYXRlJyk7XHJcblxyXG4gICAgdGFza1RpdGxlSW5wdXQudmFsdWUgPSAnJztcclxuICAgIHRhc2tEZXRhaWxzLnZhbHVlID0gJyc7XHJcbiAgICBkYXRlSW5wdXQudmFsdWUgPSAnJztcclxuICAgIHRhc2tGb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG59XHJcblxyXG5jb25zdCBwcm9jZXNzTmV3VGFzayA9IChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay10aXRsZScpLnZhbHVlO1xyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXNjcmlwdGlvbicpLnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicHJpb3JpdHlcIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWUtZGF0ZScpLnZhbHVlO1xyXG5cclxuICAgIGxldCBjdXJyZW50UHJvamVjdCA9IGZpbmRDdXJyZW50UHJvamVjdCgpO1xyXG4gICAgbGV0IHRhc2tJZCA9IGlkQ291bnRlcjtcclxuXHJcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2soY3VycmVudFByb2plY3QsIHRhc2tJZCwgdGl0bGUsIGRldGFpbHMsIHByaW9yaXR5LCBkYXRlKTtcclxuICAgIGRlZmF1bHRQcm9qZWN0c1tjdXJyZW50UHJvamVjdF0udGFza0xpc3QucHVzaChuZXdUYXNrKTtcclxuICAgIGlkQ291bnRlcisrO1xyXG5cclxuICAgIGFkZFRhc2sodGFza0lkLCB0aXRsZSwgcHJpb3JpdHksIGRhdGUpO1xyXG4gICAgaGlkZVRhc2tGb3JtKCk7XHJcbn1cclxuXHJcbmNvbnN0IGZpbmRDdXJyZW50UHJvamVjdCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xyXG4gICAgcmV0dXJuIHNlbGVjdGVkUHJvamVjdC5kYXRhc2V0LnByb2plY3RpZDtcclxufVxyXG5cclxuZXhwb3J0IHsgdGFza0V2ZW50LCBhZGRUYXNrIH07IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdEZvcm0sIHByb2plY3RGb3JtQnV0dG9uLCBjcmVhdGVUYXNrRm9ybSwgdGFza0Zvcm1CdXR0b24gfSBmcm9tIFwiLi9mb3JtXCI7XHJcblxyXG5jb25zdCBjcmVhdGVNYWluQ29tcG9uZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50Jyk7XHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcclxuXHJcbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxlZnRQYW5lbC5jbGFzc0xpc3QuYWRkKCdsZWZ0LXBhbmVsJyk7XHJcblxyXG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcmlnaHRQYW5lbC5jbGFzc0xpc3QuYWRkKCdyaWdodC1wYW5lbCcpO1xyXG5cclxuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG5cclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobGVmdFBhbmVsKTtcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQocmlnaHRQYW5lbCk7XHJcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG5cclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1VtbSBXaGF0IFRvIERvPyc7XHJcblxyXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlUHJvamVjdHNEaXYgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQtcGFuZWwnKTtcclxuICAgIGNvbnN0IGhvbWVQcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaG9tZVByb2plY3RzLmNsYXNzTGlzdC5hZGQoJ2hvbWUnKTtcclxuICAgIGhvbWVQcm9qZWN0cy5pbm5lckhUTUwgPSAnPGgyPkhvbWU8L2gyPidcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJyk7XHJcbiAgICBwcm9qZWN0RGl2LmlubmVySFRNTCA9ICc8aDI+UHJvamVjdHM8L2gyPic7XHJcblxyXG4gICAgY29uc3QgYWxsVGFza3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGFsbFRhc2tzRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGFuZWwgc2VsZWN0ZWQnKTtcclxuICAgIGFsbFRhc2tzRGl2LmlkID0gJ2FsbC10YXNrcyc7XHJcbiAgICBhbGxUYXNrc0Rpdi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0LXVsXCI+PC9pPjxwPkFsbCBUYXNrczwvcD4nO1xyXG4gICAgaG9tZVByb2plY3RzLmFwcGVuZENoaWxkKGFsbFRhc2tzRGl2KTtcclxuXHJcbiAgICBjb25zdCB0b2RheVRhc2tzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0b2RheVRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XHJcbiAgICB0b2RheVRhc2tzRGl2LmlkID0gJ3RvZGF5LXRhc2tzJztcclxuICAgIHRvZGF5VGFza3NEaXYuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItZGF5XCI+PC9pPjxwPlRvZGF5PC9wPic7XHJcbiAgICBob21lUHJvamVjdHMuYXBwZW5kQ2hpbGQodG9kYXlUYXNrc0Rpdik7XHJcblxyXG4gICAgY29uc3Qgd2Vla1Rhc2tzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3ZWVrVGFza3NEaXYuY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcclxuICAgIHdlZWtUYXNrc0Rpdi5pZCA9ICdzZXZlbi1kYXlzJztcclxuICAgIHdlZWtUYXNrc0Rpdi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci13ZWVrXCI+PC9pPjxwPkluIDcgRGF5czwvcD4nO1xyXG4gICAgaG9tZVByb2plY3RzLmFwcGVuZENoaWxkKHdlZWtUYXNrc0Rpdik7XHJcblxyXG4gICAgY29uc3QgaGlnaFByaW9yaXR5VGFza3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGhpZ2hQcmlvcml0eVRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XHJcbiAgICBoaWdoUHJpb3JpdHlUYXNrc0Rpdi5pZCA9ICdoaWdoLXByaW9yaXR5JztcclxuICAgIGhpZ2hQcmlvcml0eVRhc2tzRGl2LmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1leGNsYW1hdGlvblwiPjwvaT48cD5IaWdoIFByaW9yaXR5IFRhc2tzPC9wPic7XHJcbiAgICBob21lUHJvamVjdHMuYXBwZW5kQ2hpbGQoaGlnaFByaW9yaXR5VGFza3NEaXYpO1xyXG5cclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQoaG9tZVByb2plY3RzKTtcclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XHJcbiAgICBwcm9qZWN0Rm9ybUJ1dHRvbigpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVUYXNrRGl2ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodC1wYW5lbCcpO1xyXG4gICAgY29uc3QgY3VycmVudFByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY3VycmVudFByb2plY3RUaXRsZS5pbm5lckhUTUwgPSAnPGgxIGNsYXNzPVwicHJvamVjdC10aXRsZVwiPkFsbCBUYXNrczwvaDE+JztcclxuXHJcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdG9kb0xpc3QuY2xhc3NMaXN0LmFkZCgndG9kby1saXN0Jyk7XHJcblxyXG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZChjdXJyZW50UHJvamVjdFRpdGxlKTtcclxuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xyXG4gICAgdGFza0Zvcm1CdXR0b24oKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZm9vdGVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8cD5Db3B5cmlnaHQgwqnvuI8gJHtkYXRlLmdldEZ1bGxZZWFyKCl9IEpIb2xkc3dvcnRoMjM8L3A+XHJcbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9KSG9sZHN3b3J0aDIzXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLWJyYW5kcyBmYS1naXRodWJcIj48L2k+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgYDtcclxufVxyXG5cclxuY29uc3QgbG9hZFdlYnBhZ2UgPSAoKSA9PiB7XHJcbiAgICBjcmVhdGVNYWluQ29tcG9uZW50KCk7XHJcbiAgICBjcmVhdGVIZWFkZXIoKTtcclxuICAgIGNyZWF0ZVByb2plY3RzRGl2KCk7XHJcbiAgICBjcmVhdGVQcm9qZWN0Rm9ybSgpO1xyXG4gICAgY3JlYXRlVGFza0RpdigpO1xyXG4gICAgY3JlYXRlVGFza0Zvcm0oKTtcclxuICAgIGNyZWF0ZUZvb3RlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2FkV2VicGFnZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkV2VicGFnZSBmcm9tIFwiLi93ZWJwYWdlXCI7XHJcbmltcG9ydCBjcmVhdGVFdmVudExpc3RlbmVyIGZyb20gXCIuL3Byb2plY3RcIjtcclxuaW1wb3J0IHsgdGFza0V2ZW50LCBhZGRUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xyXG5cclxubG9hZFdlYnBhZ2UoKTtcclxuYWRkVGFzaygwLCAnTGlmdCBXZWlnaHRzJywgJycsICdNZWRpdW0nLCAnNnRoIEZlYicsIGZhbHNlKTtcclxudGFza0V2ZW50KCk7XHJcbmNyZWF0ZUV2ZW50TGlzdGVuZXIoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
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
/* harmony export */   createEventListener: () => (/* binding */ createEventListener),
/* harmony export */   defaultProjects: () => (/* binding */ defaultProjects)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");


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
        const projectTitle = projectPanels.querySelector('.project-name').textContent;
        let projectId = projectPanels.dataset.projectid;

        (0,_task__WEBPACK_IMPORTED_MODULE_0__.displayTask)(projectId);
        selectPanel(projectPanels);
        
    }
}



/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addTask: () => (/* binding */ addTask),
/* harmony export */   displayTask: () => (/* binding */ displayTask),
/* harmony export */   taskEvent: () => (/* binding */ taskEvent)
/* harmony export */ });
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./project */ "./src/project.js");


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

const displayTask = (currentProject) => {
    const todoDiv = document.querySelector('.todo-list');
    todoDiv.textContent = '';
    _project__WEBPACK_IMPORTED_MODULE_0__.defaultProjects[currentProject].taskList.forEach(task => {
        addTask(task.id, task.title, task.details, task.priority, task.dueDate, task.completed);
    });
}

const addTask = (taskId, taskTitle, details, priority, dueDate) => {
    const todoDiv = document.querySelector('.todo-list');

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.id = taskId;

    const taskLeftDiv = document.createElement('div');
    taskLeftDiv.classList.add('task-left-div');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    taskLeftDiv.appendChild(checkbox);

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
    _project__WEBPACK_IMPORTED_MODULE_0__.defaultProjects[currentProject].taskList.push(newTask);
    idCounter++;

    addTask(taskId, title, details, priority, date);
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
// addTask(0, 'Lift Weights', '', 'Medium', '6th Feb', false);
(0,_task__WEBPACK_IMPORTED_MODULE_2__.taskEvent)();
(0,_project__WEBPACK_IMPORTED_MODULE_1__.createEventListener)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRnFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxVQUFVO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFXO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JJNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkscURBQWU7QUFDbkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx1QkFBdUI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkscURBQWU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9IOEY7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHdEQUFpQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHFEQUFjO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9CQUFvQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0RBQWlCO0FBQ3JCO0FBQ0EsSUFBSSxxREFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXOzs7Ozs7VUN2RzFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNZO0FBQ0o7QUFDNUM7QUFDQSxvREFBVztBQUNYO0FBQ0EsZ0RBQVM7QUFDVCw2REFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91bW0td2hhdC10by1kby8uL3NyYy9mb3JtLmpzIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvLy4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby8uL3NyYy93ZWJwYWdlLmpzIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJyk7XHJcbiAgICBjb25zdCBhZGROZXdCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy1wcm9qZWN0Jyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5pZCA9ICdwcm9qZWN0LWZvcm0nO1xyXG4gICAgZm9ybS5hdXRvY29tcGxldGUgPSAnb2ZmJztcclxuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcblxyXG4gICAgY29uc3QgaW5wdXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGlucHV0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaW5wdXRzJyk7XHJcblxyXG4gICAgaW5wdXREaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibmV3LXByb2plY3RcIiBwbGFjZWhvbGRlcj1cIkVudGVyIGEgTmV3IFByb2plY3QgTmFtZVwiIG1heGxlbmd0aD1cIjIwXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJlcnJvci1tZXNzYWdlIGhpZGRlblwiPllvdSBuZWVkIHRvIGFkZCBhIHRpdGxlIGZvciBuZXcgcHJvamVjdCE8L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwic3VibWl0LWJ0blwiIHZhbHVlPVwiQWRkXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjYW5jZWwtYnRuXCIgdmFsdWU9XCJDYW5jZWxcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcblxyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dERpdik7XHJcbiAgICBwcm9qZWN0RGl2Lmluc2VydEJlZm9yZShmb3JtLCBhZGROZXdCdG4pO1xyXG59XHJcblxyXG5jb25zdCBwcm9qZWN0Rm9ybUJ1dHRvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKTtcclxuICAgIGNvbnN0IHByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBwcm9qZWN0Rm9ybUJ1dHRvbi5pZCA9ICdhZGQtbmV3LXByb2plY3QnO1xyXG4gICAgcHJvamVjdEZvcm1CdXR0b24uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtZmlsZS1jaXJjbGUtcGx1c1wiPjwvaT4gQWRkIGEgTmV3IFByb2plY3QnO1xyXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0Rm9ybUJ1dHRvbik7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tGb3JtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodC1wYW5lbCcpO1xyXG4gICAgY29uc3QgYWRkTmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXRhc2snKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLmlkID0gJ3Rhc2stZm9ybSc7XHJcbiAgICBmb3JtLmF1dG9jb21wbGV0ZSA9ICdvZmYnO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuXHJcbiAgICBjb25zdCBpbnB1dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaW5wdXREaXYuY2xhc3NMaXN0LmFkZCgndGFzay1pbnB1dHMnKTtcclxuXHJcbiAgICBpbnB1dERpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tdGFzay1pbnB1dFwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay10aXRsZVwiPlRhc2sgVGl0bGU6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLXRpdGxlXCIgbmFtZT1cInRhc2tcIiBtYXhsZW5ndGg9XCIyNVwiIHJlcXVpcmVkPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXRhc2staW5wdXRcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGV0YWlscyAoT3B0aW9uYWwpOjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBpZD1cImRlc2NyaXB0aW9uXCIgbmFtZT1cInRhc2stZGVzY3JpcHRpb25cIiByb3dzPVwiNVwiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwiQSBzaG9ydCBkZXNjcmlwdGlvbiBvciBhIGNoZWNrbGlzdC4uLlwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tdGFzay1pbnB1dFwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwibG93XCIgbmFtZT1cInByaW9yaXR5XCIgdmFsdWU9XCJsb3dcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsb3dcIj5Mb3c8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwibWVkaXVtXCIgbmFtZT1cInByaW9yaXR5XCIgdmFsdWU9XCJtZWRpdW1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtZWRpdW1cIj5NZWRpdW08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiaGlnaFwiIG5hbWU9XCJwcmlvcml0eVwiIHZhbHVlPVwiaGlnaFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImhpZ2hcIj5IaWdoPC9sYWJlbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiPkRhdGU6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiIG5hbWU9XCJkZWFkbGluZVwiIHJlcXVpcmVkPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWZvcm0tYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwidGFzay1zdWJtaXQtYnRuXCIgdmFsdWU9XCJBZGRcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRhc2stY2FuY2VsLWJ0blwiIHZhbHVlPVwiQ2FuY2VsXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dERpdik7XHJcbiAgICB0YXNrRGl2Lmluc2VydEJlZm9yZShmb3JtLCBhZGROZXdUYXNrQnRuKTtcclxufVxyXG5cclxuY29uc3QgdGFza0Zvcm1CdXR0b24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0LXBhbmVsJyk7XHJcbiAgICBjb25zdCB0YXNrRm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGFza0Zvcm1CdXR0b24uaWQgPSAnYWRkLW5ldy10YXNrJztcclxuICAgIHRhc2tGb3JtQnV0dG9uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXBsdXNcIj48L2k+IEFkZCBhIE5ldyBUYXNrJztcclxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0Zvcm1CdXR0b24pO1xyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVQcm9qZWN0Rm9ybSwgcHJvamVjdEZvcm1CdXR0b24sIGNyZWF0ZVRhc2tGb3JtLCB0YXNrRm9ybUJ1dHRvbiB9OyIsImltcG9ydCB7IGRpc3BsYXlUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xyXG5cclxubGV0IGRlZmF1bHRQcm9qZWN0cyA9IFtdO1xyXG5cclxuY2xhc3MgUHJvamVjdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9qZWN0SWQsIHByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IHByb2plY3RJZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBwcm9qZWN0TmFtZTtcclxuICAgICAgICB0aGlzLnRhc2tMaXN0ID0gW107XHJcbiAgICB9XHJcbn1cclxuXHJcbmRlZmF1bHRQcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KDAsICdHeW0nKSk7XHJcbmRlZmF1bHRQcm9qZWN0cy5wdXNoKG5ldyBQcm9qZWN0KDEsICdTdHVkeScpKTtcclxuXHJcbmNvbnN0IGNyZWF0ZUV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhZGRQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctcHJvamVjdCcpO1xyXG4gICAgYWRkUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNob3dQcm9qZWN0Rm9ybSk7XHJcblxyXG4gICAgY29uc3Qgc3VibWl0Rm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtaXQtYnRuJyk7XHJcbiAgICBzdWJtaXRGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc05ld1Byb2plY3QpO1xyXG5cclxuICAgIGNvbnN0IGNhbmNlbEZvcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FuY2VsLWJ0bicpO1xyXG4gICAgY2FuY2VsRm9ybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVQcm9qZWN0Rm9ybSk7XHJcblxyXG4gICAgY29uc3QgbGVmdFBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQtcGFuZWwnKTtcclxuICAgIGxlZnRQYW5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrV2hpY2hQYW5lbCk7XHJcblxyXG4gICAgZGlzcGxheVByb2plY3QoZGVmYXVsdFByb2plY3RzKTtcclxufVxyXG5cclxuY29uc3QgZGlzcGxheVByb2plY3QgPSAocHJvamVjdEFycmF5KSA9PiB7XHJcbiAgICBwcm9qZWN0QXJyYXkuZm9yRWFjaChwcm9qZWN0ID0+IHtcclxuICAgICAgICBhZGRQcm9qZWN0KHByb2plY3QuaWQsIHByb2plY3QubmFtZSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgYWRkUHJvamVjdCA9IChwcm9qZWN0SWQsIHByb2plY3RJbnB1dCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0cycpO1xyXG4gICAgXHJcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XHJcbiAgICBwcm9qZWN0Q29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9qZWN0aWQnLCBgJHtwcm9qZWN0SWR9YCk7XHJcblxyXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIGljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYS1zb2xpZCBmYS1saXN0Jyk7XHJcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGljb24pO1xyXG5cclxuICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgcHJvamVjdE5hbWUuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1uYW1lJyk7XHJcbiAgICBwcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHByb2plY3RJbnB1dDtcclxuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdE5hbWUpO1xyXG5cclxuICAgIGNvbnN0IGVkaXRQcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBlZGl0UHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdlZGl0LWRpdicpO1xyXG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhLXJlZ3VsYXIgZmEtcGVuLXRvLXNxdWFyZScpO1xyXG4gICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdmYS1zb2xpZCBmYS10cmFzaCcpO1xyXG5cclxuICAgIGVkaXRQcm9qZWN0RGl2LmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuICAgIGVkaXRQcm9qZWN0RGl2LmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xyXG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0UHJvamVjdERpdik7XHJcblxyXG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XHJcbiAgICBwcm9qZWN0Lmluc2VydEJlZm9yZShwcm9qZWN0Q29udGFpbmVyLCBwcm9qZWN0Rm9ybSk7XHJcbn1cclxuXHJcbmNvbnN0IGdldE5leHRJZE51bSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFsbFByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJvamVjdGlkXScpO1xyXG4gICAgcmV0dXJuIGFsbFByb2plY3RzLmxlbmd0aDtcclxufVxyXG5cclxuY29uc3Qgc2hvd1Byb2plY3RGb3JtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XHJcbiAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcHJvamVjdCcpLmZvY3VzKCk7XHJcbn1cclxuXHJcbmNvbnN0IGhpZGVQcm9qZWN0Rm9ybSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtZm9ybScpO1xyXG4gICAgY29uc3QgcHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1wcm9qZWN0Jyk7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3ItbWVzc2FnZScpO1xyXG5cclxuICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgcHJvamVjdElucHV0LnZhbHVlID0gJyc7XHJcbiAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbn1cclxuXHJcbmNvbnN0IHByb2Nlc3NOZXdQcm9qZWN0ID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCB0ZXh0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXByb2plY3QnKTtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvci1tZXNzYWdlJyk7XHJcbiAgICBjb25zdCBwcm9qZWN0SWROdW0gPSBnZXROZXh0SWROdW0oKTtcclxuICAgIGlmICh0ZXh0SW5wdXQuY2hlY2tWYWxpZGl0eSgpKSB7XHJcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRleHRJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnZhbGlkJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGV4dElucHV0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XHJcbiAgICAgICAgZGVmYXVsdFByb2plY3RzLnB1c2gobmV3UHJvamVjdCk7XHJcbiAgICAgICAgYWRkUHJvamVjdChwcm9qZWN0SWROdW0sIHByb2plY3ROYW1lKTtcclxuICAgICAgICBoaWRlUHJvamVjdEZvcm0oKTsgICAgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICB0ZXh0SW5wdXQuY2xhc3NMaXN0LmFkZCgnaW52YWxpZCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBzZWxlY3RQYW5lbCA9IChwYW5lbE5vZGUpID0+IHtcclxuICAgIGNvbnN0IHNlbGVjdGVkUGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcclxuICAgIHNlbGVjdGVkUGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgIHBhbmVsTm9kZS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG59XHJcblxyXG5jb25zdCBjaGVja1doaWNoUGFuZWwgPSAoZSkgPT4ge1xyXG4gICAgY29uc3QgaG9tZVBhbmVscyA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5ob21lIC5wYW5lbCcpO1xyXG4gICAgY29uc3QgcHJvamVjdFBhbmVscyA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5wcm9qZWN0cyAucGFuZWwnKTtcclxuICAgIFxyXG4gICAgaWYgKGhvbWVQYW5lbHMpIHtcclxuICAgICAgICBzZWxlY3RQYW5lbChob21lUGFuZWxzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHByb2plY3RQYW5lbHMpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBwcm9qZWN0UGFuZWxzLnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LW5hbWUnKS50ZXh0Q29udGVudDtcclxuICAgICAgICBsZXQgcHJvamVjdElkID0gcHJvamVjdFBhbmVscy5kYXRhc2V0LnByb2plY3RpZDtcclxuXHJcbiAgICAgICAgZGlzcGxheVRhc2socHJvamVjdElkKTtcclxuICAgICAgICBzZWxlY3RQYW5lbChwcm9qZWN0UGFuZWxzKTtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHsgY3JlYXRlRXZlbnRMaXN0ZW5lciwgZGVmYXVsdFByb2plY3RzIH07IiwiaW1wb3J0IHsgZGVmYXVsdFByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdFwiO1xyXG5cclxubGV0IGlkQ291bnRlciA9IDA7XHJcblxyXG5jbGFzcyBUYXNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb2plY3RJZCwgdGFza0lkLCB0aXRsZSwgZGV0YWlscywgcHJpb3JpdHksIGR1ZURhdGUpIHtcclxuICAgICAgICB0aGlzLnByb2plY3RJZCA9IHByb2plY3RJZDtcclxuICAgICAgICB0aGlzLmlkID0gdGFza0lkO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzO1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xyXG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHRhc2tFdmVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy10YXNrJyk7XHJcbiAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1Rhc2tGb3JtKTtcclxuXHJcbiAgICBjb25zdCBzdWJtaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXN1Ym1pdC1idG4nKTtcclxuICAgIHN1Ym1pdFRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcHJvY2Vzc05ld1Rhc2spO1xyXG5cclxuICAgIGNvbnN0IGNhbmNlbFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stY2FuY2VsLWJ0bicpO1xyXG4gICAgY2FuY2VsVGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoaWRlVGFza0Zvcm0pO1xyXG59XHJcblxyXG5jb25zdCBkaXNwbGF5VGFzayA9IChjdXJyZW50UHJvamVjdCkgPT4ge1xyXG4gICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcclxuICAgIHRvZG9EaXYudGV4dENvbnRlbnQgPSAnJztcclxuICAgIGRlZmF1bHRQcm9qZWN0c1tjdXJyZW50UHJvamVjdF0udGFza0xpc3QuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICBhZGRUYXNrKHRhc2suaWQsIHRhc2sudGl0bGUsIHRhc2suZGV0YWlscywgdGFzay5wcmlvcml0eSwgdGFzay5kdWVEYXRlLCB0YXNrLmNvbXBsZXRlZCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgYWRkVGFzayA9ICh0YXNrSWQsIHRhc2tUaXRsZSwgZGV0YWlscywgcHJpb3JpdHksIGR1ZURhdGUpID0+IHtcclxuICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1saXN0Jyk7XHJcblxyXG4gICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKCd0YXNrJyk7XHJcbiAgICB0YXNrRGl2LmlkID0gdGFza0lkO1xyXG5cclxuICAgIGNvbnN0IHRhc2tMZWZ0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0YXNrTGVmdERpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWxlZnQtZGl2Jyk7XHJcblxyXG4gICAgY29uc3QgY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XHJcbiAgICB0YXNrTGVmdERpdi5hcHBlbmRDaGlsZChjaGVja2JveCk7XHJcblxyXG4gICAgY29uc3QgcHJpb3JpdHlTdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBwcmlvcml0eVN0YXR1cy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYCR7cHJpb3JpdHkudG9Mb3dlckNhc2UoKX1gKTtcclxuICAgIHByaW9yaXR5U3RhdHVzLnRleHRDb250ZW50ID0gcHJpb3JpdHk7XHJcbiAgICB0YXNrTGVmdERpdi5hcHBlbmRDaGlsZChwcmlvcml0eVN0YXR1cyk7XHJcblxyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCd0YXNrLXRpdGxlJyk7XHJcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IHRhc2tUaXRsZTtcclxuICAgIHRhc2tMZWZ0RGl2LmFwcGVuZENoaWxkKHRpdGxlKTtcclxuXHJcbiAgICBjb25zdCB0YXNrQnRucyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFza0J0bnMuY2xhc3NMaXN0LmFkZCgndGFzay1idG5zJyk7XHJcblxyXG4gICAgY29uc3QgZGV0YWlsc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgZGV0YWlsc0J0bi5jbGFzc0xpc3QuYWRkKCdkZXRhaWxzJyk7XHJcbiAgICBkZXRhaWxzQnRuLnRleHRDb250ZW50ID0gJ0RldGFpbHMnO1xyXG4gICAgdGFza0J0bnMuYXBwZW5kQ2hpbGQoZGV0YWlsc0J0bik7XHJcbiAgICAvLyBhZGQgZXZlbnQgZm9yIHRoZSBidXR0b24gLSBkaWFsb2dcclxuXHJcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgZGF0ZS5jbGFzc0xpc3QuYWRkKCdkYXRlJyk7XHJcbiAgICBkYXRlLnRleHRDb250ZW50ID0gZHVlRGF0ZTtcclxuICAgIHRhc2tCdG5zLmFwcGVuZENoaWxkKGRhdGUpO1xyXG5cclxuICAgIGNvbnN0IGVkaXRJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgZWRpdEljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICd0YXNrLWljb24gZmEtcmVndWxhciBmYS1wZW4tdG8tc3F1YXJlJyk7XHJcbiAgICB0YXNrQnRucy5hcHBlbmRDaGlsZChlZGl0SWNvbik7XHJcblxyXG4gICAgY29uc3QgZGVsZXRlSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIGRlbGV0ZUljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICd0YXNrLWljb24gZmEtc29saWQgZmEtdHJhc2gnKTtcclxuICAgIHRhc2tCdG5zLmFwcGVuZENoaWxkKGRlbGV0ZUljb24pO1xyXG5cclxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0xlZnREaXYpO1xyXG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrQnRucyk7XHJcbiAgICB0b2RvRGl2LmFwcGVuZENoaWxkKHRhc2tEaXYpO1xyXG59XHJcblxyXG5jb25zdCBzaG93VGFza0Zvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcclxuICAgIHRhc2tGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stdGl0bGUnKS5mb2N1cygpO1xyXG59XHJcblxyXG5jb25zdCBoaWRlVGFza0Zvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWZvcm0nKTtcclxuICAgIGNvbnN0IHRhc2tUaXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stdGl0bGUnKTtcclxuICAgIGNvbnN0IHRhc2tEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XHJcbiAgICBjb25zdCBkYXRlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlLWRhdGUnKTtcclxuXHJcbiAgICB0YXNrVGl0bGVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgdGFza0RldGFpbHMudmFsdWUgPSAnJztcclxuICAgIGRhdGVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgdGFza0Zvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbn1cclxuXHJcbmNvbnN0IHByb2Nlc3NOZXdUYXNrID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLXRpdGxlJykudmFsdWU7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJykudmFsdWU7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwcmlvcml0eVwiXTpjaGVja2VkJykudmFsdWU7XHJcbiAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2R1ZS1kYXRlJykudmFsdWU7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRQcm9qZWN0ID0gZmluZEN1cnJlbnRQcm9qZWN0KCk7XHJcbiAgICBsZXQgdGFza0lkID0gaWRDb3VudGVyO1xyXG5cclxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhjdXJyZW50UHJvamVjdCwgdGFza0lkLCB0aXRsZSwgZGV0YWlscywgcHJpb3JpdHksIGRhdGUpO1xyXG4gICAgZGVmYXVsdFByb2plY3RzW2N1cnJlbnRQcm9qZWN0XS50YXNrTGlzdC5wdXNoKG5ld1Rhc2spO1xyXG4gICAgaWRDb3VudGVyKys7XHJcblxyXG4gICAgYWRkVGFzayh0YXNrSWQsIHRpdGxlLCBkZXRhaWxzLCBwcmlvcml0eSwgZGF0ZSk7XHJcbiAgICBoaWRlVGFza0Zvcm0oKTtcclxufVxyXG5cclxuY29uc3QgZmluZEN1cnJlbnRQcm9qZWN0ID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJyk7XHJcbiAgICByZXR1cm4gc2VsZWN0ZWRQcm9qZWN0LmRhdGFzZXQucHJvamVjdGlkO1xyXG59XHJcblxyXG5leHBvcnQgeyB0YXNrRXZlbnQsIGRpc3BsYXlUYXNrLCBhZGRUYXNrIH07IiwiaW1wb3J0IHsgY3JlYXRlUHJvamVjdEZvcm0sIHByb2plY3RGb3JtQnV0dG9uLCBjcmVhdGVUYXNrRm9ybSwgdGFza0Zvcm1CdXR0b24gfSBmcm9tIFwiLi9mb3JtXCI7XHJcblxyXG5jb25zdCBjcmVhdGVNYWluQ29tcG9uZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50Jyk7XHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcclxuXHJcbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxlZnRQYW5lbC5jbGFzc0xpc3QuYWRkKCdsZWZ0LXBhbmVsJyk7XHJcblxyXG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcmlnaHRQYW5lbC5jbGFzc0xpc3QuYWRkKCdyaWdodC1wYW5lbCcpO1xyXG5cclxuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG5cclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobGVmdFBhbmVsKTtcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQocmlnaHRQYW5lbCk7XHJcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG5cclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1VtbSBXaGF0IFRvIERvPyc7XHJcblxyXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlUHJvamVjdHNEaXYgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQtcGFuZWwnKTtcclxuICAgIGNvbnN0IGhvbWVQcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaG9tZVByb2plY3RzLmNsYXNzTGlzdC5hZGQoJ2hvbWUnKTtcclxuICAgIGhvbWVQcm9qZWN0cy5pbm5lckhUTUwgPSAnPGgyPkhvbWU8L2gyPidcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJyk7XHJcbiAgICBwcm9qZWN0RGl2LmlubmVySFRNTCA9ICc8aDI+UHJvamVjdHM8L2gyPic7XHJcblxyXG4gICAgY29uc3QgYWxsVGFza3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGFsbFRhc2tzRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGFuZWwgc2VsZWN0ZWQnKTtcclxuICAgIGFsbFRhc2tzRGl2LmlkID0gJ2FsbC10YXNrcyc7XHJcbiAgICBhbGxUYXNrc0Rpdi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0LXVsXCI+PC9pPjxwPkFsbCBUYXNrczwvcD4nO1xyXG4gICAgaG9tZVByb2plY3RzLmFwcGVuZENoaWxkKGFsbFRhc2tzRGl2KTtcclxuXHJcbiAgICBjb25zdCB0b2RheVRhc2tzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0b2RheVRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XHJcbiAgICB0b2RheVRhc2tzRGl2LmlkID0gJ3RvZGF5LXRhc2tzJztcclxuICAgIHRvZGF5VGFza3NEaXYuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItZGF5XCI+PC9pPjxwPlRvZGF5PC9wPic7XHJcbiAgICBob21lUHJvamVjdHMuYXBwZW5kQ2hpbGQodG9kYXlUYXNrc0Rpdik7XHJcblxyXG4gICAgY29uc3Qgd2Vla1Rhc2tzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3ZWVrVGFza3NEaXYuY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcclxuICAgIHdlZWtUYXNrc0Rpdi5pZCA9ICdzZXZlbi1kYXlzJztcclxuICAgIHdlZWtUYXNrc0Rpdi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci13ZWVrXCI+PC9pPjxwPkluIDcgRGF5czwvcD4nO1xyXG4gICAgaG9tZVByb2plY3RzLmFwcGVuZENoaWxkKHdlZWtUYXNrc0Rpdik7XHJcblxyXG4gICAgY29uc3QgaGlnaFByaW9yaXR5VGFza3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGhpZ2hQcmlvcml0eVRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XHJcbiAgICBoaWdoUHJpb3JpdHlUYXNrc0Rpdi5pZCA9ICdoaWdoLXByaW9yaXR5JztcclxuICAgIGhpZ2hQcmlvcml0eVRhc2tzRGl2LmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1leGNsYW1hdGlvblwiPjwvaT48cD5IaWdoIFByaW9yaXR5IFRhc2tzPC9wPic7XHJcbiAgICBob21lUHJvamVjdHMuYXBwZW5kQ2hpbGQoaGlnaFByaW9yaXR5VGFza3NEaXYpO1xyXG5cclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQoaG9tZVByb2plY3RzKTtcclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XHJcbiAgICBwcm9qZWN0Rm9ybUJ1dHRvbigpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVUYXNrRGl2ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodC1wYW5lbCcpO1xyXG4gICAgY29uc3QgY3VycmVudFByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY3VycmVudFByb2plY3RUaXRsZS5pbm5lckhUTUwgPSAnPGgxIGNsYXNzPVwicHJvamVjdC10aXRsZVwiPkFsbCBUYXNrczwvaDE+JztcclxuXHJcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdG9kb0xpc3QuY2xhc3NMaXN0LmFkZCgndG9kby1saXN0Jyk7XHJcblxyXG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZChjdXJyZW50UHJvamVjdFRpdGxlKTtcclxuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xyXG4gICAgdGFza0Zvcm1CdXR0b24oKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZm9vdGVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8cD5Db3B5cmlnaHQgwqnvuI8gJHtkYXRlLmdldEZ1bGxZZWFyKCl9IEpIb2xkc3dvcnRoMjM8L3A+XHJcbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9KSG9sZHN3b3J0aDIzXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLWJyYW5kcyBmYS1naXRodWJcIj48L2k+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgYDtcclxufVxyXG5cclxuY29uc3QgbG9hZFdlYnBhZ2UgPSAoKSA9PiB7XHJcbiAgICBjcmVhdGVNYWluQ29tcG9uZW50KCk7XHJcbiAgICBjcmVhdGVIZWFkZXIoKTtcclxuICAgIGNyZWF0ZVByb2plY3RzRGl2KCk7XHJcbiAgICBjcmVhdGVQcm9qZWN0Rm9ybSgpO1xyXG4gICAgY3JlYXRlVGFza0RpdigpO1xyXG4gICAgY3JlYXRlVGFza0Zvcm0oKTtcclxuICAgIGNyZWF0ZUZvb3RlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2FkV2VicGFnZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkV2VicGFnZSBmcm9tIFwiLi93ZWJwYWdlXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUV2ZW50TGlzdGVuZXIgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcbmltcG9ydCB7IHRhc2tFdmVudCwgYWRkVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcclxuXHJcbmxvYWRXZWJwYWdlKCk7XHJcbi8vIGFkZFRhc2soMCwgJ0xpZnQgV2VpZ2h0cycsICcnLCAnTWVkaXVtJywgJzZ0aCBGZWInLCBmYWxzZSk7XHJcbnRhc2tFdmVudCgpO1xyXG5jcmVhdGVFdmVudExpc3RlbmVyKCk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
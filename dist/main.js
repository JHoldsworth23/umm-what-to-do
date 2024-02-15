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
    taskFormButton.classList.add('hidden');
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

const showAddTaskBtn = () => {
    const addBtn = document.querySelector('#add-new-task');
    addBtn.classList.remove('hidden');
}

const hideAddTaskBtn = () => {
    const addBtn = document.querySelector('#add-new-task');
    addBtn.classList.add('hidden');
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
        hideAddTaskBtn();
    }
    
    if (projectPanels) {
        const projectTitle = projectPanels.querySelector('.project-name').textContent;
        let projectId = projectPanels.dataset.projectid;

        (0,_task__WEBPACK_IMPORTED_MODULE_0__.displayTask)(projectId);
        selectPanel(projectPanels);
        showAddTaskBtn();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELFVBQVU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGtEQUFXO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hKNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkscURBQWU7QUFDbkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx1QkFBdUI7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUkscURBQWU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQy9IOEY7QUFDOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHdEQUFpQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHFEQUFjO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9CQUFvQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0RBQWlCO0FBQ3JCO0FBQ0EsSUFBSSxxREFBYztBQUNsQjtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxXQUFXOzs7Ozs7VUN2RzFCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNZO0FBQ0o7QUFDNUM7QUFDQSxvREFBVztBQUNYO0FBQ0EsZ0RBQVM7QUFDVCw2REFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91bW0td2hhdC10by1kby8uL3NyYy9mb3JtLmpzIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvLy4vc3JjL3Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vLi9zcmMvdGFzay5qcyIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby8uL3NyYy93ZWJwYWdlLmpzIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3JlYXRlUHJvamVjdEZvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJyk7XHJcbiAgICBjb25zdCBhZGROZXdCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy1wcm9qZWN0Jyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xyXG4gICAgZm9ybS5pZCA9ICdwcm9qZWN0LWZvcm0nO1xyXG4gICAgZm9ybS5hdXRvY29tcGxldGUgPSAnb2ZmJztcclxuICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcblxyXG4gICAgY29uc3QgaW5wdXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGlucHV0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaW5wdXRzJyk7XHJcblxyXG4gICAgaW5wdXREaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwibmV3LXByb2plY3RcIiBwbGFjZWhvbGRlcj1cIkVudGVyIGEgTmV3IFByb2plY3QgTmFtZVwiIG1heGxlbmd0aD1cIjIwXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJlcnJvci1tZXNzYWdlIGhpZGRlblwiPllvdSBuZWVkIHRvIGFkZCBhIHRpdGxlIGZvciBuZXcgcHJvamVjdCE8L3A+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwic3VibWl0LWJ0blwiIHZhbHVlPVwiQWRkXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjYW5jZWwtYnRuXCIgdmFsdWU9XCJDYW5jZWxcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcblxyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dERpdik7XHJcbiAgICBwcm9qZWN0RGl2Lmluc2VydEJlZm9yZShmb3JtLCBhZGROZXdCdG4pO1xyXG59XHJcblxyXG5jb25zdCBwcm9qZWN0Rm9ybUJ1dHRvbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKTtcclxuICAgIGNvbnN0IHByb2plY3RGb3JtQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBwcm9qZWN0Rm9ybUJ1dHRvbi5pZCA9ICdhZGQtbmV3LXByb2plY3QnO1xyXG4gICAgcHJvamVjdEZvcm1CdXR0b24uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtZmlsZS1jaXJjbGUtcGx1c1wiPjwvaT4gQWRkIGEgTmV3IFByb2plY3QnO1xyXG4gICAgcHJvamVjdERpdi5hcHBlbmRDaGlsZChwcm9qZWN0Rm9ybUJ1dHRvbik7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tGb3JtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodC1wYW5lbCcpO1xyXG4gICAgY29uc3QgYWRkTmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXRhc2snKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLmlkID0gJ3Rhc2stZm9ybSc7XHJcbiAgICBmb3JtLmF1dG9jb21wbGV0ZSA9ICdvZmYnO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuXHJcbiAgICBjb25zdCBpbnB1dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaW5wdXREaXYuY2xhc3NMaXN0LmFkZCgndGFzay1pbnB1dHMnKTtcclxuXHJcbiAgICBpbnB1dERpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tdGFzay1pbnB1dFwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwidGFzay10aXRsZVwiPlRhc2sgVGl0bGU6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0YXNrLXRpdGxlXCIgbmFtZT1cInRhc2tcIiBtYXhsZW5ndGg9XCIyNVwiIHJlcXVpcmVkPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXRhc2staW5wdXRcIj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImRlc2NyaXB0aW9uXCI+RGV0YWlscyAoT3B0aW9uYWwpOjwvbGFiZWw+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBpZD1cImRlc2NyaXB0aW9uXCIgbmFtZT1cInRhc2stZGVzY3JpcHRpb25cIiByb3dzPVwiNVwiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwiQSBzaG9ydCBkZXNjcmlwdGlvbiBvciBhIGNoZWNrbGlzdC4uLlwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tdGFzay1pbnB1dFwiPlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwibG93XCIgbmFtZT1cInByaW9yaXR5XCIgdmFsdWU9XCJsb3dcIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJsb3dcIj5Mb3c8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwibWVkaXVtXCIgbmFtZT1cInByaW9yaXR5XCIgdmFsdWU9XCJtZWRpdW1cIiByZXF1aXJlZD5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJtZWRpdW1cIj5NZWRpdW08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGlkPVwiaGlnaFwiIG5hbWU9XCJwcmlvcml0eVwiIHZhbHVlPVwiaGlnaFwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImhpZ2hcIj5IaWdoPC9sYWJlbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiPkRhdGU6PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJkYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiIG5hbWU9XCJkZWFkbGluZVwiIHJlcXVpcmVkPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWZvcm0tYnV0dG9uc1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwidGFzay1zdWJtaXQtYnRuXCIgdmFsdWU9XCJBZGRcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInRhc2stY2FuY2VsLWJ0blwiIHZhbHVlPVwiQ2FuY2VsXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dERpdik7XHJcbiAgICB0YXNrRGl2Lmluc2VydEJlZm9yZShmb3JtLCBhZGROZXdUYXNrQnRuKTtcclxufVxyXG5cclxuY29uc3QgdGFza0Zvcm1CdXR0b24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0LXBhbmVsJyk7XHJcbiAgICBjb25zdCB0YXNrRm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdGFza0Zvcm1CdXR0b24uaWQgPSAnYWRkLW5ldy10YXNrJztcclxuICAgIHRhc2tGb3JtQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgdGFza0Zvcm1CdXR0b24uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtcGx1c1wiPjwvaT4gQWRkIGEgTmV3IFRhc2snO1xyXG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRm9ybUJ1dHRvbik7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGNyZWF0ZVByb2plY3RGb3JtLCBwcm9qZWN0Rm9ybUJ1dHRvbiwgY3JlYXRlVGFza0Zvcm0sIHRhc2tGb3JtQnV0dG9uIH07IiwiaW1wb3J0IHsgZGlzcGxheVRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XHJcblxyXG5sZXQgZGVmYXVsdFByb2plY3RzID0gW107XHJcblxyXG5jbGFzcyBQcm9qZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb2plY3RJZCwgcHJvamVjdE5hbWUpIHtcclxuICAgICAgICB0aGlzLmlkID0gcHJvamVjdElkO1xyXG4gICAgICAgIHRoaXMubmFtZSA9IHByb2plY3ROYW1lO1xyXG4gICAgICAgIHRoaXMudGFza0xpc3QgPSBbXTtcclxuICAgIH1cclxufVxyXG5cclxuZGVmYXVsdFByb2plY3RzLnB1c2gobmV3IFByb2plY3QoMCwgJ0d5bScpKTtcclxuZGVmYXVsdFByb2plY3RzLnB1c2gobmV3IFByb2plY3QoMSwgJ1N0dWR5JykpO1xyXG5cclxuY29uc3QgY3JlYXRlRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLW5ldy1wcm9qZWN0Jyk7XHJcbiAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd1Byb2plY3RGb3JtKTtcclxuXHJcbiAgICBjb25zdCBzdWJtaXRGb3JtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1Ym1pdC1idG4nKTtcclxuICAgIHN1Ym1pdEZvcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzTmV3UHJvamVjdCk7XHJcblxyXG4gICAgY29uc3QgY2FuY2VsRm9ybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYW5jZWwtYnRuJyk7XHJcbiAgICBjYW5jZWxGb3JtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGlkZVByb2plY3RGb3JtKTtcclxuXHJcbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdC1wYW5lbCcpO1xyXG4gICAgbGVmdFBhbmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tXaGljaFBhbmVsKTtcclxuXHJcbiAgICBkaXNwbGF5UHJvamVjdChkZWZhdWx0UHJvamVjdHMpO1xyXG59XHJcblxyXG5jb25zdCBkaXNwbGF5UHJvamVjdCA9IChwcm9qZWN0QXJyYXkpID0+IHtcclxuICAgIHByb2plY3RBcnJheS5mb3JFYWNoKHByb2plY3QgPT4ge1xyXG4gICAgICAgIGFkZFByb2plY3QocHJvamVjdC5pZCwgcHJvamVjdC5uYW1lKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBhZGRQcm9qZWN0ID0gKHByb2plY3RJZCwgcHJvamVjdElucHV0KSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcclxuICAgIHByb2plY3RDb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLXByb2plY3RpZCcsIGAke3Byb2plY3RJZH1gKTtcclxuXHJcbiAgICBjb25zdCBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhLXNvbGlkIGZhLWxpc3QnKTtcclxuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoaWNvbik7XHJcblxyXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBwcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LW5hbWUnKTtcclxuICAgIHByb2plY3ROYW1lLnRleHRDb250ZW50ID0gcHJvamVjdElucHV0O1xyXG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgY29uc3QgZWRpdFByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGVkaXRQcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ2VkaXQtZGl2Jyk7XHJcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIGVkaXRJY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZmEtcmVndWxhciBmYS1wZW4tdG8tc3F1YXJlJyk7XHJcbiAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ZhLXNvbGlkIGZhLXRyYXNoJyk7XHJcblxyXG4gICAgZWRpdFByb2plY3REaXYuYXBwZW5kQ2hpbGQoZWRpdEljb24pO1xyXG4gICAgZWRpdFByb2plY3REaXYuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRQcm9qZWN0RGl2KTtcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcclxuICAgIHByb2plY3QuaW5zZXJ0QmVmb3JlKHByb2plY3RDb250YWluZXIsIHByb2plY3RGb3JtKTtcclxufVxyXG5cclxuY29uc3QgZ2V0TmV4dElkTnVtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0aWRdJyk7XHJcbiAgICByZXR1cm4gYWxsUHJvamVjdHMubGVuZ3RoO1xyXG59XHJcblxyXG5jb25zdCBzaG93UHJvamVjdEZvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LWZvcm0nKTtcclxuICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1wcm9qZWN0JykuZm9jdXMoKTtcclxufVxyXG5cclxuY29uc3QgaGlkZVByb2plY3RGb3JtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1mb3JtJyk7XHJcbiAgICBjb25zdCBwcm9qZWN0SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXByb2plY3QnKTtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lcnJvci1tZXNzYWdlJyk7XHJcblxyXG4gICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICBwcm9qZWN0SW5wdXQudmFsdWUgPSAnJztcclxuICAgIGVycm9yTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxufVxyXG5cclxuY29uc3QgcHJvY2Vzc05ld1Byb2plY3QgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHRleHRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcHJvamVjdCcpO1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yLW1lc3NhZ2UnKTtcclxuICAgIGNvbnN0IHByb2plY3RJZE51bSA9IGdldE5leHRJZE51bSgpO1xyXG4gICAgaWYgKHRleHRJbnB1dC5jaGVja1ZhbGlkaXR5KCkpIHtcclxuICAgICAgICBlcnJvck1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgdGV4dElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2ludmFsaWQnKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSB0ZXh0SW5wdXQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KHByb2plY3ROYW1lKTtcclxuICAgICAgICBkZWZhdWx0UHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgICAgICBhZGRQcm9qZWN0KHByb2plY3RJZE51bSwgcHJvamVjdE5hbWUpO1xyXG4gICAgICAgIGhpZGVQcm9qZWN0Rm9ybSgpOyAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXJyb3JNZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICAgIHRleHRJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnZhbGlkJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0IHNob3dBZGRUYXNrQnRuID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctdGFzaycpO1xyXG4gICAgYWRkQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG59XHJcblxyXG5jb25zdCBoaWRlQWRkVGFza0J0biA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXRhc2snKTtcclxuICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxufVxyXG5cclxuY29uc3Qgc2VsZWN0UGFuZWwgPSAocGFuZWxOb2RlKSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZFBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkJyk7XHJcbiAgICBzZWxlY3RlZFBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICBwYW5lbE5vZGUuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxufVxyXG5cclxuY29uc3QgY2hlY2tXaGljaFBhbmVsID0gKGUpID0+IHtcclxuICAgIGNvbnN0IGhvbWVQYW5lbHMgPSBlLnRhcmdldC5jbG9zZXN0KCcuaG9tZSAucGFuZWwnKTtcclxuICAgIGNvbnN0IHByb2plY3RQYW5lbHMgPSBlLnRhcmdldC5jbG9zZXN0KCcucHJvamVjdHMgLnBhbmVsJyk7XHJcbiAgICBcclxuICAgIGlmIChob21lUGFuZWxzKSB7XHJcbiAgICAgICAgc2VsZWN0UGFuZWwoaG9tZVBhbmVscyk7XHJcbiAgICAgICAgaGlkZUFkZFRhc2tCdG4oKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHByb2plY3RQYW5lbHMpIHtcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBwcm9qZWN0UGFuZWxzLnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LW5hbWUnKS50ZXh0Q29udGVudDtcclxuICAgICAgICBsZXQgcHJvamVjdElkID0gcHJvamVjdFBhbmVscy5kYXRhc2V0LnByb2plY3RpZDtcclxuXHJcbiAgICAgICAgZGlzcGxheVRhc2socHJvamVjdElkKTtcclxuICAgICAgICBzZWxlY3RQYW5lbChwcm9qZWN0UGFuZWxzKTtcclxuICAgICAgICBzaG93QWRkVGFza0J0bigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBjcmVhdGVFdmVudExpc3RlbmVyLCBkZWZhdWx0UHJvamVjdHMgfTsiLCJpbXBvcnQgeyBkZWZhdWx0UHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0XCI7XHJcblxyXG5sZXQgaWRDb3VudGVyID0gMDtcclxuXHJcbmNsYXNzIFRhc2sge1xyXG4gICAgY29uc3RydWN0b3IocHJvamVjdElkLCB0YXNrSWQsIHRpdGxlLCBkZXRhaWxzLCBwcmlvcml0eSwgZHVlRGF0ZSkge1xyXG4gICAgICAgIHRoaXMucHJvamVjdElkID0gcHJvamVjdElkO1xyXG4gICAgICAgIHRoaXMuaWQgPSB0YXNrSWQ7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHM7XHJcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xyXG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgdGFza0V2ZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXRhc2snKTtcclxuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzaG93VGFza0Zvcm0pO1xyXG5cclxuICAgIGNvbnN0IHN1Ym1pdFRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stc3VibWl0LWJ0bicpO1xyXG4gICAgc3VibWl0VGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwcm9jZXNzTmV3VGFzayk7XHJcblxyXG4gICAgY29uc3QgY2FuY2VsVGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1jYW5jZWwtYnRuJyk7XHJcbiAgICBjYW5jZWxUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVUYXNrRm9ybSk7XHJcbn1cclxuXHJcbmNvbnN0IGRpc3BsYXlUYXNrID0gKGN1cnJlbnRQcm9qZWN0KSA9PiB7XHJcbiAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdCcpO1xyXG4gICAgdG9kb0Rpdi50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgZGVmYXVsdFByb2plY3RzW2N1cnJlbnRQcm9qZWN0XS50YXNrTGlzdC5mb3JFYWNoKHRhc2sgPT4ge1xyXG4gICAgICAgIGFkZFRhc2sodGFzay5pZCwgdGFzay50aXRsZSwgdGFzay5kZXRhaWxzLCB0YXNrLnByaW9yaXR5LCB0YXNrLmR1ZURhdGUsIHRhc2suY29tcGxldGVkKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBhZGRUYXNrID0gKHRhc2tJZCwgdGFza1RpdGxlLCBkZXRhaWxzLCBwcmlvcml0eSwgZHVlRGF0ZSkgPT4ge1xyXG4gICAgY29uc3QgdG9kb0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QnKTtcclxuXHJcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2snKTtcclxuICAgIHRhc2tEaXYuaWQgPSB0YXNrSWQ7XHJcblxyXG4gICAgY29uc3QgdGFza0xlZnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRhc2tMZWZ0RGl2LmNsYXNzTGlzdC5hZGQoJ3Rhc2stbGVmdC1kaXYnKTtcclxuXHJcbiAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBjaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcclxuICAgIHRhc2tMZWZ0RGl2LmFwcGVuZENoaWxkKGNoZWNrYm94KTtcclxuXHJcbiAgICBjb25zdCBwcmlvcml0eVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHByaW9yaXR5U3RhdHVzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgJHtwcmlvcml0eS50b0xvd2VyQ2FzZSgpfWApO1xyXG4gICAgcHJpb3JpdHlTdGF0dXMudGV4dENvbnRlbnQgPSBwcmlvcml0eTtcclxuICAgIHRhc2tMZWZ0RGl2LmFwcGVuZENoaWxkKHByaW9yaXR5U3RhdHVzKTtcclxuXHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gdGFza1RpdGxlO1xyXG4gICAgdGFza0xlZnREaXYuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG5cclxuICAgIGNvbnN0IHRhc2tCdG5zID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0YXNrQnRucy5jbGFzc0xpc3QuYWRkKCd0YXNrLWJ0bnMnKTtcclxuXHJcbiAgICBjb25zdCBkZXRhaWxzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBkZXRhaWxzQnRuLmNsYXNzTGlzdC5hZGQoJ2RldGFpbHMnKTtcclxuICAgIGRldGFpbHNCdG4udGV4dENvbnRlbnQgPSAnRGV0YWlscyc7XHJcbiAgICB0YXNrQnRucy5hcHBlbmRDaGlsZChkZXRhaWxzQnRuKTtcclxuICAgIC8vIGFkZCBldmVudCBmb3IgdGhlIGJ1dHRvbiAtIGRpYWxvZ1xyXG5cclxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBkYXRlLmNsYXNzTGlzdC5hZGQoJ2RhdGUnKTtcclxuICAgIGRhdGUudGV4dENvbnRlbnQgPSBkdWVEYXRlO1xyXG4gICAgdGFza0J0bnMuYXBwZW5kQ2hpbGQoZGF0ZSk7XHJcblxyXG4gICAgY29uc3QgZWRpdEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICBlZGl0SWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Rhc2staWNvbiBmYS1yZWd1bGFyIGZhLXBlbi10by1zcXVhcmUnKTtcclxuICAgIHRhc2tCdG5zLmFwcGVuZENoaWxkKGVkaXRJY29uKTtcclxuXHJcbiAgICBjb25zdCBkZWxldGVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xyXG4gICAgZGVsZXRlSWNvbi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Rhc2staWNvbiBmYS1zb2xpZCBmYS10cmFzaCcpO1xyXG4gICAgdGFza0J0bnMuYXBwZW5kQ2hpbGQoZGVsZXRlSWNvbik7XHJcblxyXG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrTGVmdERpdik7XHJcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tCdG5zKTtcclxuICAgIHRvZG9EaXYuYXBwZW5kQ2hpbGQodGFza0Rpdik7XHJcbn1cclxuXHJcbmNvbnN0IHNob3dUYXNrRm9ybSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xyXG4gICAgdGFza0Zvcm0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay10aXRsZScpLmZvY3VzKCk7XHJcbn1cclxuXHJcbmNvbnN0IGhpZGVUYXNrRm9ybSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZm9ybScpO1xyXG4gICAgY29uc3QgdGFza1RpdGxlSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay10aXRsZScpO1xyXG4gICAgY29uc3QgdGFza0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKTtcclxuICAgIGNvbnN0IGRhdGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWUtZGF0ZScpO1xyXG5cclxuICAgIHRhc2tUaXRsZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICB0YXNrRGV0YWlscy52YWx1ZSA9ICcnO1xyXG4gICAgZGF0ZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICB0YXNrRm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxufVxyXG5cclxuY29uc3QgcHJvY2Vzc05ld1Rhc2sgPSAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stdGl0bGUnKS52YWx1ZTtcclxuICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVzY3JpcHRpb24nKS52YWx1ZTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInByaW9yaXR5XCJdOmNoZWNrZWQnKS52YWx1ZTtcclxuICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlLWRhdGUnKS52YWx1ZTtcclxuXHJcbiAgICBsZXQgY3VycmVudFByb2plY3QgPSBmaW5kQ3VycmVudFByb2plY3QoKTtcclxuICAgIGxldCB0YXNrSWQgPSBpZENvdW50ZXI7XHJcblxyXG4gICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKGN1cnJlbnRQcm9qZWN0LCB0YXNrSWQsIHRpdGxlLCBkZXRhaWxzLCBwcmlvcml0eSwgZGF0ZSk7XHJcbiAgICBkZWZhdWx0UHJvamVjdHNbY3VycmVudFByb2plY3RdLnRhc2tMaXN0LnB1c2gobmV3VGFzayk7XHJcbiAgICBpZENvdW50ZXIrKztcclxuXHJcbiAgICBhZGRUYXNrKHRhc2tJZCwgdGl0bGUsIGRldGFpbHMsIHByaW9yaXR5LCBkYXRlKTtcclxuICAgIGhpZGVUYXNrRm9ybSgpO1xyXG59XHJcblxyXG5jb25zdCBmaW5kQ3VycmVudFByb2plY3QgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcclxuICAgIHJldHVybiBzZWxlY3RlZFByb2plY3QuZGF0YXNldC5wcm9qZWN0aWQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHRhc2tFdmVudCwgZGlzcGxheVRhc2ssIGFkZFRhc2sgfTsiLCJpbXBvcnQgeyBjcmVhdGVQcm9qZWN0Rm9ybSwgcHJvamVjdEZvcm1CdXR0b24sIGNyZWF0ZVRhc2tGb3JtLCB0YXNrRm9ybUJ1dHRvbiB9IGZyb20gXCIuL2Zvcm1cIjtcclxuXHJcbmNvbnN0IGNyZWF0ZU1haW5Db21wb25lbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQnKTtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2hlYWRlcicpO1xyXG5cclxuICAgIGNvbnN0IGxlZnRQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbGVmdFBhbmVsLmNsYXNzTGlzdC5hZGQoJ2xlZnQtcGFuZWwnKTtcclxuXHJcbiAgICBjb25zdCByaWdodFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICByaWdodFBhbmVsLmNsYXNzTGlzdC5hZGQoJ3JpZ2h0LXBhbmVsJyk7XHJcblxyXG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9vdGVyJyk7XHJcblxyXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChoZWFkZXIpO1xyXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChsZWZ0UGFuZWwpO1xyXG4gICAgY29udGVudC5hcHBlbmRDaGlsZChyaWdodFBhbmVsKTtcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoZm9vdGVyKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlSGVhZGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJyk7XHJcblxyXG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSAnVW1tIFdoYXQgVG8gRG8/JztcclxuXHJcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGl0bGUpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVQcm9qZWN0c0RpdiA9ICgpID0+IHtcclxuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVmdC1wYW5lbCcpO1xyXG4gICAgY29uc3QgaG9tZVByb2plY3RzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBob21lUHJvamVjdHMuY2xhc3NMaXN0LmFkZCgnaG9tZScpO1xyXG4gICAgaG9tZVByb2plY3RzLmlubmVySFRNTCA9ICc8aDI+SG9tZTwvaDI+J1xyXG5cclxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHByb2plY3REaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdHMnKTtcclxuICAgIHByb2plY3REaXYuaW5uZXJIVE1MID0gJzxoMj5Qcm9qZWN0czwvaDI+JztcclxuXHJcbiAgICBjb25zdCBhbGxUYXNrc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgYWxsVGFza3NEaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdwYW5lbCBzZWxlY3RlZCcpO1xyXG4gICAgYWxsVGFza3NEaXYuaWQgPSAnYWxsLXRhc2tzJztcclxuICAgIGFsbFRhc2tzRGl2LmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWxpc3QtdWxcIj48L2k+PHA+QWxsIFRhc2tzPC9wPic7XHJcbiAgICBob21lUHJvamVjdHMuYXBwZW5kQ2hpbGQoYWxsVGFza3NEaXYpO1xyXG5cclxuICAgIGNvbnN0IHRvZGF5VGFza3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRvZGF5VGFza3NEaXYuY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcclxuICAgIHRvZGF5VGFza3NEaXYuaWQgPSAndG9kYXktdGFza3MnO1xyXG4gICAgdG9kYXlUYXNrc0Rpdi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci1kYXlcIj48L2k+PHA+VG9kYXk8L3A+JztcclxuICAgIGhvbWVQcm9qZWN0cy5hcHBlbmRDaGlsZCh0b2RheVRhc2tzRGl2KTtcclxuXHJcbiAgICBjb25zdCB3ZWVrVGFza3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHdlZWtUYXNrc0Rpdi5jbGFzc0xpc3QuYWRkKCdwYW5lbCcpO1xyXG4gICAgd2Vla1Rhc2tzRGl2LmlkID0gJ3NldmVuLWRheXMnO1xyXG4gICAgd2Vla1Rhc2tzRGl2LmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNhbGVuZGFyLXdlZWtcIj48L2k+PHA+SW4gNyBEYXlzPC9wPic7XHJcbiAgICBob21lUHJvamVjdHMuYXBwZW5kQ2hpbGQod2Vla1Rhc2tzRGl2KTtcclxuXHJcbiAgICBjb25zdCBoaWdoUHJpb3JpdHlUYXNrc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaGlnaFByaW9yaXR5VGFza3NEaXYuY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcclxuICAgIGhpZ2hQcmlvcml0eVRhc2tzRGl2LmlkID0gJ2hpZ2gtcHJpb3JpdHknO1xyXG4gICAgaGlnaFByaW9yaXR5VGFza3NEaXYuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2lyY2xlLWV4Y2xhbWF0aW9uXCI+PC9pPjxwPkhpZ2ggUHJpb3JpdHkgVGFza3M8L3A+JztcclxuICAgIGhvbWVQcm9qZWN0cy5hcHBlbmRDaGlsZChoaWdoUHJpb3JpdHlUYXNrc0Rpdik7XHJcblxyXG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChob21lUHJvamVjdHMpO1xyXG4gICAgc2lkZWJhci5hcHBlbmRDaGlsZChwcm9qZWN0RGl2KTtcclxuICAgIHByb2plY3RGb3JtQnV0dG9uKCk7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZVRhc2tEaXYgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByaWdodFBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0LXBhbmVsJyk7XHJcbiAgICBjb25zdCBjdXJyZW50UHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjdXJyZW50UHJvamVjdFRpdGxlLmlubmVySFRNTCA9ICc8aDEgY2xhc3M9XCJwcm9qZWN0LXRpdGxlXCI+QWxsIFRhc2tzPC9oMT4nO1xyXG5cclxuICAgIGNvbnN0IHRvZG9MaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0b2RvTGlzdC5jbGFzc0xpc3QuYWRkKCd0b2RvLWxpc3QnKTtcclxuXHJcbiAgICByaWdodFBhbmVsLmFwcGVuZENoaWxkKGN1cnJlbnRQcm9qZWN0VGl0bGUpO1xyXG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZCh0b2RvTGlzdCk7XHJcbiAgICB0YXNrRm9ybUJ1dHRvbigpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVGb290ZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKTtcclxuICAgIFxyXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBmb290ZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxwPkNvcHlyaWdodCDCqe+4jyAke2RhdGUuZ2V0RnVsbFllYXIoKX0gSkhvbGRzd29ydGgyMzwvcD5cclxuICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL0pIb2xkc3dvcnRoMjNcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtYnJhbmRzIGZhLWdpdGh1YlwiPjwvaT5cclxuICAgICAgICA8L2E+XHJcbiAgICBgO1xyXG59XHJcblxyXG5jb25zdCBsb2FkV2VicGFnZSA9ICgpID0+IHtcclxuICAgIGNyZWF0ZU1haW5Db21wb25lbnQoKTtcclxuICAgIGNyZWF0ZUhlYWRlcigpO1xyXG4gICAgY3JlYXRlUHJvamVjdHNEaXYoKTtcclxuICAgIGNyZWF0ZVByb2plY3RGb3JtKCk7XHJcbiAgICBjcmVhdGVUYXNrRGl2KCk7XHJcbiAgICBjcmVhdGVUYXNrRm9ybSgpO1xyXG4gICAgY3JlYXRlRm9vdGVyKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvYWRXZWJwYWdlOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IGxvYWRXZWJwYWdlIGZyb20gXCIuL3dlYnBhZ2VcIjtcclxuaW1wb3J0IHsgY3JlYXRlRXZlbnRMaXN0ZW5lciB9IGZyb20gXCIuL3Byb2plY3RcIjtcclxuaW1wb3J0IHsgdGFza0V2ZW50LCBhZGRUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xyXG5cclxubG9hZFdlYnBhZ2UoKTtcclxuLy8gYWRkVGFzaygwLCAnTGlmdCBXZWlnaHRzJywgJycsICdNZWRpdW0nLCAnNnRoIEZlYicsIGZhbHNlKTtcclxudGFza0V2ZW50KCk7XHJcbmNyZWF0ZUV2ZW50TGlzdGVuZXIoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
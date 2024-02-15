/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/webpage.js":
/*!************************!*\
  !*** ./src/webpage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
    projectFormButton();
}

const createTaskDiv = () => {
    const rightPanel = document.querySelector('.right-panel');
    const currentProjectTitle = document.createElement('div');
    currentProjectTitle.innerHTML = '<h1 class="project-title">All Tasks</h1>';

    const todoList = document.createElement('div');
    todoList.classList.add('todo-list');

    rightPanel.appendChild(currentProjectTitle);
    rightPanel.appendChild(todoList);
    taskFormButton();
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

// IMPORT THESE FUNCTIONS FROM FORM.JS
const projectFormButton = () => {
    const projectDiv = document.querySelector('.projects');
    const projectFormButton = document.createElement('button');
    projectFormButton.id = 'add-new-project';
    projectFormButton.innerHTML = '<i class="fa-solid fa-file-circle-plus"></i> Add a New Project';
    projectDiv.appendChild(projectFormButton);
}

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

const taskFormButton = () => {
    const taskDiv = document.querySelector('.right-panel');
    const taskFormButton = document.createElement('button');
    taskFormButton.id = 'add-new-task';
    taskFormButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add a New Task';
    taskDiv.appendChild(taskFormButton);
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
// 

const loadWebpage = () => {
    createMainComponent();
    createHeader();
    createProjectsDiv();
    createProjectForm();
    createTaskDiv();
    createTaskForm();
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


(0,_webpage__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixvQkFBb0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsV0FBVzs7Ozs7O1VDeEwxQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ3BDO0FBQ0Esb0RBQVcsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3VtbS13aGF0LXRvLWRvLy4vc3JjL3dlYnBhZ2UuanMiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3VtbS13aGF0LXRvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdW1tLXdoYXQtdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly91bW0td2hhdC10by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjcmVhdGVNYWluQ29tcG9uZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50Jyk7XHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoZWFkZXInKTtcclxuXHJcbiAgICBjb25zdCBsZWZ0UGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGxlZnRQYW5lbC5jbGFzc0xpc3QuYWRkKCdsZWZ0LXBhbmVsJyk7XHJcblxyXG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcmlnaHRQYW5lbC5jbGFzc0xpc3QuYWRkKCdyaWdodC1wYW5lbCcpO1xyXG5cclxuICAgIGNvbnN0IGZvb3RlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvb3RlcicpO1xyXG5cclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQobGVmdFBhbmVsKTtcclxuICAgIGNvbnRlbnQuYXBwZW5kQ2hpbGQocmlnaHRQYW5lbCk7XHJcbiAgICBjb250ZW50LmFwcGVuZENoaWxkKGZvb3Rlcik7XHJcbn1cclxuXHJcbmNvbnN0IGNyZWF0ZUhlYWRlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xyXG5cclxuICAgIHRpdGxlLnRleHRDb250ZW50ID0gJ1VtbSBXaGF0IFRvIERvPyc7XHJcblxyXG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRpdGxlKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlUHJvamVjdHNEaXYgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlZnQtcGFuZWwnKTtcclxuICAgIGNvbnN0IGhvbWVQcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaG9tZVByb2plY3RzLmNsYXNzTGlzdC5hZGQoJ2hvbWUnKTtcclxuICAgIGhvbWVQcm9qZWN0cy5pbm5lckhUTUwgPSAnPGgyPkhvbWU8L2gyPidcclxuXHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3RzJyk7XHJcbiAgICBwcm9qZWN0RGl2LmlubmVySFRNTCA9ICc8aDI+UHJvamVjdHM8L2gyPic7XHJcblxyXG4gICAgY29uc3QgYWxsVGFza3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGFsbFRhc2tzRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncGFuZWwgc2VsZWN0ZWQnKTtcclxuICAgIGFsbFRhc2tzRGl2LmlkID0gJ2FsbC10YXNrcyc7XHJcbiAgICBhbGxUYXNrc0Rpdi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1saXN0LXVsXCI+PC9pPjxwPkFsbCBUYXNrczwvcD4nO1xyXG4gICAgaG9tZVByb2plY3RzLmFwcGVuZENoaWxkKGFsbFRhc2tzRGl2KTtcclxuXHJcbiAgICBjb25zdCB0b2RheVRhc2tzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0b2RheVRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XHJcbiAgICB0b2RheVRhc2tzRGl2LmlkID0gJ3RvZGF5LXRhc2tzJztcclxuICAgIHRvZGF5VGFza3NEaXYuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmEtc29saWQgZmEtY2FsZW5kYXItZGF5XCI+PC9pPjxwPlRvZGF5PC9wPic7XHJcbiAgICBob21lUHJvamVjdHMuYXBwZW5kQ2hpbGQodG9kYXlUYXNrc0Rpdik7XHJcblxyXG4gICAgY29uc3Qgd2Vla1Rhc2tzRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB3ZWVrVGFza3NEaXYuY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcclxuICAgIHdlZWtUYXNrc0Rpdi5pZCA9ICdzZXZlbi1kYXlzJztcclxuICAgIHdlZWtUYXNrc0Rpdi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1jYWxlbmRhci13ZWVrXCI+PC9pPjxwPkluIDcgRGF5czwvcD4nO1xyXG4gICAgaG9tZVByb2plY3RzLmFwcGVuZENoaWxkKHdlZWtUYXNrc0Rpdik7XHJcblxyXG4gICAgY29uc3QgaGlnaFByaW9yaXR5VGFza3NEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGhpZ2hQcmlvcml0eVRhc2tzRGl2LmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XHJcbiAgICBoaWdoUHJpb3JpdHlUYXNrc0Rpdi5pZCA9ICdoaWdoLXByaW9yaXR5JztcclxuICAgIGhpZ2hQcmlvcml0eVRhc2tzRGl2LmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWNpcmNsZS1leGNsYW1hdGlvblwiPjwvaT48cD5IaWdoIFByaW9yaXR5IFRhc2tzPC9wPic7XHJcbiAgICBob21lUHJvamVjdHMuYXBwZW5kQ2hpbGQoaGlnaFByaW9yaXR5VGFza3NEaXYpO1xyXG5cclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQoaG9tZVByb2plY3RzKTtcclxuICAgIHNpZGViYXIuYXBwZW5kQ2hpbGQocHJvamVjdERpdik7XHJcbiAgICBwcm9qZWN0Rm9ybUJ1dHRvbigpO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVUYXNrRGl2ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmlnaHRQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodC1wYW5lbCcpO1xyXG4gICAgY29uc3QgY3VycmVudFByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY3VycmVudFByb2plY3RUaXRsZS5pbm5lckhUTUwgPSAnPGgxIGNsYXNzPVwicHJvamVjdC10aXRsZVwiPkFsbCBUYXNrczwvaDE+JztcclxuXHJcbiAgICBjb25zdCB0b2RvTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdG9kb0xpc3QuY2xhc3NMaXN0LmFkZCgndG9kby1saXN0Jyk7XHJcblxyXG4gICAgcmlnaHRQYW5lbC5hcHBlbmRDaGlsZChjdXJyZW50UHJvamVjdFRpdGxlKTtcclxuICAgIHJpZ2h0UGFuZWwuYXBwZW5kQ2hpbGQodG9kb0xpc3QpO1xyXG4gICAgdGFza0Zvcm1CdXR0b24oKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlRm9vdGVyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJyk7XHJcbiAgICBcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgZm9vdGVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8cD5Db3B5cmlnaHQgwqnvuI8gJHtkYXRlLmdldEZ1bGxZZWFyKCl9IEpIb2xkc3dvcnRoMjM8L3A+XHJcbiAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9KSG9sZHN3b3J0aDIzXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLWJyYW5kcyBmYS1naXRodWJcIj48L2k+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgYDtcclxufVxyXG5cclxuLy8gSU1QT1JUIFRIRVNFIEZVTkNUSU9OUyBGUk9NIEZPUk0uSlNcclxuY29uc3QgcHJvamVjdEZvcm1CdXR0b24gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBwcm9qZWN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzJyk7XHJcbiAgICBjb25zdCBwcm9qZWN0Rm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgcHJvamVjdEZvcm1CdXR0b24uaWQgPSAnYWRkLW5ldy1wcm9qZWN0JztcclxuICAgIHByb2plY3RGb3JtQnV0dG9uLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhLXNvbGlkIGZhLWZpbGUtY2lyY2xlLXBsdXNcIj48L2k+IEFkZCBhIE5ldyBQcm9qZWN0JztcclxuICAgIHByb2plY3REaXYuYXBwZW5kQ2hpbGQocHJvamVjdEZvcm1CdXR0b24pO1xyXG59XHJcblxyXG5jb25zdCBjcmVhdGVQcm9qZWN0Rm9ybSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdHMnKTtcclxuICAgIGNvbnN0IGFkZE5ld0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtbmV3LXByb2plY3QnKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XHJcbiAgICBmb3JtLmlkID0gJ3Byb2plY3QtZm9ybSc7XHJcbiAgICBmb3JtLmF1dG9jb21wbGV0ZSA9ICdvZmYnO1xyXG4gICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuXHJcbiAgICBjb25zdCBpbnB1dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgaW5wdXREaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pbnB1dHMnKTtcclxuXHJcbiAgICBpbnB1dERpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJuZXctcHJvamVjdFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBOZXcgUHJvamVjdCBOYW1lXCIgbWF4bGVuZ3RoPVwiMjBcIiByZXF1aXJlZD5cclxuICAgICAgICA8cCBjbGFzcz1cImVycm9yLW1lc3NhZ2UgaGlkZGVuXCI+WW91IG5lZWQgdG8gYWRkIGEgdGl0bGUgZm9yIG5ldyBwcm9qZWN0ITwvcD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1idXR0b25zXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJzdWJtaXQtYnRuXCIgdmFsdWU9XCJBZGRcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNhbmNlbC1idG5cIiB2YWx1ZT1cIkNhbmNlbFwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYDtcclxuXHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0RGl2KTtcclxuICAgIHByb2plY3REaXYuaW5zZXJ0QmVmb3JlKGZvcm0sIGFkZE5ld0J0bik7XHJcbn1cclxuXHJcbmNvbnN0IHRhc2tGb3JtQnV0dG9uID0gKCkgPT4ge1xyXG4gICAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yaWdodC1wYW5lbCcpO1xyXG4gICAgY29uc3QgdGFza0Zvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHRhc2tGb3JtQnV0dG9uLmlkID0gJ2FkZC1uZXctdGFzayc7XHJcbiAgICB0YXNrRm9ybUJ1dHRvbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1wbHVzXCI+PC9pPiBBZGQgYSBOZXcgVGFzayc7XHJcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tGb3JtQnV0dG9uKTtcclxufVxyXG5cclxuY29uc3QgY3JlYXRlVGFza0Zvcm0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJpZ2h0LXBhbmVsJyk7XHJcbiAgICBjb25zdCBhZGROZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1uZXctdGFzaycpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcclxuICAgIGZvcm0uaWQgPSAndGFzay1mb3JtJztcclxuICAgIGZvcm0uYXV0b2NvbXBsZXRlID0gJ29mZic7XHJcbiAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG5cclxuICAgIGNvbnN0IGlucHV0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpbnB1dERpdi5jbGFzc0xpc3QuYWRkKCd0YXNrLWlucHV0cycpO1xyXG5cclxuICAgIGlucHV0RGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS10YXNrLWlucHV0XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJ0YXNrLXRpdGxlXCI+VGFzayBUaXRsZTo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRhc2stdGl0bGVcIiBuYW1lPVwidGFza1wiIG1heGxlbmd0aD1cIjI1XCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tdGFzay1pbnB1dFwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiZGVzY3JpcHRpb25cIj5EZXRhaWxzIChPcHRpb25hbCk6PC9sYWJlbD5cclxuICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiZGVzY3JpcHRpb25cIiBuYW1lPVwidGFzay1kZXNjcmlwdGlvblwiIHJvd3M9XCI1XCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJBIHNob3J0IGRlc2NyaXB0aW9uIG9yIGEgY2hlY2tsaXN0Li4uXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS10YXNrLWlucHV0XCI+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJsb3dcIiBuYW1lPVwicHJpb3JpdHlcIiB2YWx1ZT1cImxvd1wiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImxvd1wiPkxvdzwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJtZWRpdW1cIiBuYW1lPVwicHJpb3JpdHlcIiB2YWx1ZT1cIm1lZGl1bVwiIHJlcXVpcmVkPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIm1lZGl1bVwiPk1lZGl1bTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgaWQ9XCJoaWdoXCIgbmFtZT1cInByaW9yaXR5XCIgdmFsdWU9XCJoaWdoXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiaGlnaFwiPkhpZ2g8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCI+RGF0ZTo8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImRhdGVcIiBpZD1cImR1ZS1kYXRlXCIgbmFtZT1cImRlYWRsaW5lXCIgcmVxdWlyZWQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZm9ybS1idXR0b25zXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJ0YXNrLXN1Ym1pdC1idG5cIiB2YWx1ZT1cIkFkZFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidGFzay1jYW5jZWwtYnRuXCIgdmFsdWU9XCJDYW5jZWxcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGA7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0RGl2KTtcclxuICAgIHRhc2tEaXYuaW5zZXJ0QmVmb3JlKGZvcm0sIGFkZE5ld1Rhc2tCdG4pO1xyXG59XHJcbi8vIFxyXG5cclxuY29uc3QgbG9hZFdlYnBhZ2UgPSAoKSA9PiB7XHJcbiAgICBjcmVhdGVNYWluQ29tcG9uZW50KCk7XHJcbiAgICBjcmVhdGVIZWFkZXIoKTtcclxuICAgIGNyZWF0ZVByb2plY3RzRGl2KCk7XHJcbiAgICBjcmVhdGVQcm9qZWN0Rm9ybSgpO1xyXG4gICAgY3JlYXRlVGFza0RpdigpO1xyXG4gICAgY3JlYXRlVGFza0Zvcm0oKTtcclxuICAgIGNyZWF0ZUZvb3RlcigpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsb2FkV2VicGFnZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBsb2FkV2VicGFnZSBmcm9tIFwiLi93ZWJwYWdlXCI7XHJcblxyXG5sb2FkV2VicGFnZSgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
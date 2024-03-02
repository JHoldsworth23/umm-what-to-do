import loadWebpage from "./webpage";
import { createEventListener } from "./project";
import { taskEvent } from "./task";
import { renameProjectEvents } from "./editProject";
import { displayAllTasks } from "./homePanels";
import './style.css';

loadWebpage();
taskEvent();
createEventListener();
renameProjectEvents();
displayAllTasks();

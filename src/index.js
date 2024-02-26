import loadWebpage from "./webpage";
import { createEventListener } from "./project";
import { taskEvent } from "./task";
import { renameProjectEvents } from "./editProject";
import { displayAllTasks } from "./homePanels";

loadWebpage();
taskEvent();
createEventListener();
renameProjectEvents();
displayAllTasks();

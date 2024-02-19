import loadWebpage from "./webpage";
import { createEventListener } from "./project";
import { taskEvent } from "./task";
import { renameProjectEvents } from "./editProject";

loadWebpage();
taskEvent();
createEventListener();
renameProjectEvents();

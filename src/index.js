import loadWebpage from "./webpage";
import createEventListener from "./project";
import { taskEvent, addTask } from "./task";

loadWebpage();
addTask(0, 'Lift Weights', '', 'Medium', '6th Feb', false);
taskEvent();
createEventListener();

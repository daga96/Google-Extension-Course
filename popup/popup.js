let tasks = [];

const startTimerBtn = document.getElementById("start-task-btn");
const resetTimerBtn = document.getElementById("reset-timer-btn");

function timerFunction() {
  chrome.storage.local.get(["timer", "optionInput"], (res) => {
    const time = document.getElementById("time");
    const minutes = `${res.optionInput - Math.ceil(res.timer / 60)}`.padStart(
      2,
      "0"
    );
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
  });
}

timerFunction();
setInterval(timerFunction, 1000);

resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
});

startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? "Pause timer"
          : "Start timer";
      }
    );
  });
});

//tasks

const addTaskButton = document.getElementById("add-task-btn");
addTaskButton.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTast() {
  chrome.storage.sync.set({
    tasks,
  });
}

//render the new tasks
function renderTask(taskLength) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskLength];

  text.addEventListener("change", () => {
    tasks[taskLength] = text.value;
    saveTast();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "x";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskLength);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskLength = tasks.length;
  tasks.push("");
  renderTask(taskLength);
  saveTast();
}

function deleteTask(taskLength) {
  tasks.splice(taskLength, 1);
  renderTasks();
  saveTast();
}

//after deletion reloads all tasks
function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((taskText, taskLength) => {
    renderTask(taskLength);
  });
}

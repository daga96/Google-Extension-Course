chrome.alarms.create("pomodoroTimer", {
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    chrome.storage.local.get(["timer", "isRunning", "optionInput"], (res) => {
      if (res.isRunning) {
        let timer = res.timer + 1;
        let isRunning = true;
        if (timer === 60 * res.optionInput) {
          this.registration.showNotification("Pomodoro Notification", {
            body: `${res.optionInput}  minutes has passed!`,
            icon: "icon.png",
          });
          timer = 0;
          isRunning = false;
        }
        chrome.storage.local.set({
          timer,
          isRunning,
        });
      }
    });
  }
});

chrome.storage.local.get(["timer", "isRunning", "optionInput"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer : 0,
    optionInput: "optionInput" in res ? res.optionInput : 25,
    isRunning: " isRunning" in res ? res.isRunning : false,
  });
});

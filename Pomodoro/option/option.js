const optionInput = document.getElementById("time-option");
const saveBtn = document.getElementById("save-btn");

optionInput.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    optionInput.value = 25;
  }
});

saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    optionInput: optionInput.value,
    timer: 0,
    isRunning: false,
  });
});

chrome.storage.local.get(["optionInput"], (res) => {
  optionInput.value = res.optionInput;
});

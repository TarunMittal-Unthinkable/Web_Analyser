document.addEventListener("DOMContentLoaded", function () {
  const outputDiv = document.getElementById("output");
  const loadingDiv = document.getElementById("loading");

  function handleResponse(response) {
    if (response?.error) {
      outputDiv.textContent = "An error occurred. Please try again.";
    } else {
      outputDiv.textContent = response?.data;
    }
    loadingDiv.style.display = "none";
  }

  document
    .getElementById("summaryButton")
    .addEventListener("click", function () {
      loadingDiv.style.display = "block";
      console.log("Hi2");
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getSummary" },
          handleResponse
        );
      });
    });

  document
    .getElementById("pointsButton")
    .addEventListener("click", function () {
      loadingDiv.style.display = "block";
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getPoints" },
          handleResponse
        );
      });
    });
});

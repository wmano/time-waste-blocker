// function that saves the toggler status
function saveTogglerStatus() {
    const toggleButton = document.getElementById('toggleButton');
    const status = toggleButton.checked;

    // save the status to local storage
    chrome.storage.local.set({
        togglerStatus: status,
    });
}

// function that loads the toggler status from local storage
function loadTogglerStatus() {
    chrome.storage.local.get('togglerStatus', function(data) {
        const status = data.togglerStatus;

        // if the status is not found, set it to false
        if (typeof status === 'undefined') {
            status = false;
        }

        // set the toggle button to the saved status
        const toggleButton = document.getElementById('toggleButton');
        toggleButton.checked = status;
    });
}

// call the saveTogglerStatus function when the toggle button is changed
document.getElementById('toggleButton').addEventListener('change', saveTogglerStatus);

// call the loadTogglerStatus function when the page loads
loadTogglerStatus();
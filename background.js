// function that injects code to a specific tab
function injectScript(tabId) {

    chrome.scripting.executeScript(
        {
            target: {tabId: tabId},
            files: ['inject.js'],
        }
    );

}

function getButtonStatus() {
    const toggleButton = document.getElementById('toggleButton');
    return toggleButton.checked;
  }

function loadToggleButtonStatus() {
    return new Promise((resolve) => {
        chrome.storage.local.get('togglerStatus', function(data) {
            const status = data.togglerStatus;

            // If the status is not found, set it to false
            const togglerStatus = typeof status !== 'undefined' ? status : false;

            // Resolve the Promise with the toggleButton status
            resolve(togglerStatus);
        });
    });
}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Array of strings to check in the URL
    const stringsToCheck = ["youtube.com/shorts", "instagram.com/explore/", "tiktok.com"];
    const stringsToCheckLernmodus = ["youtube.com", "instagram.com", "tiktok.com", "reddit.com", "twitter.com"];
    
    // check for a URL in the changeInfo parameter (url is only added when it is changed)
    //if (changeInfo.url && stringsToCheck.some(str => changeInfo.url.includes(str))) {
        //injectScript(tabId);
    //}

    loadToggleButtonStatus().then((status) => {
        console.log(status);
        if (status){
            if (changeInfo.url && stringsToCheckLernmodus.some(str => changeInfo.url.includes(str))) {
                injectScript(tabId);
            }
        } else {
            if (changeInfo.url && stringsToCheck.some(str => changeInfo.url.includes(str))) {
                injectScript(tabId);
            }
        }
    });
});


const DEFAULT_ENDPOINT = 'https://rss-discovery.home.adduc.win/';

function saveOptions(e) {
    chrome.storage.sync.set({
        endpoint: document.querySelector("#endpoint").value
    });
    e.preventDefault();
}

function restoreOptions() {
    chrome.storage.sync.get('endpoint', function (res) {
        document.querySelector("#endpoint").value = res.endpoint || DEFAULT_ENDPOINT;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
const DEFAULT_ENDPOINT = 'https://rss-discovery.home.adduc.win/';

function saveOptions(e) {
    browser.storage.sync.set({
        endpoint: document.querySelector("#endpoint").value
    });
    e.preventDefault();
}

function restoreOptions() {
    let gettingItem = browser.storage.sync.get('endpoint');
    gettingItem.then((res) => {
        document.querySelector("#endpoint").value = res.endpoint || DEFAULT_ENDPOINT;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
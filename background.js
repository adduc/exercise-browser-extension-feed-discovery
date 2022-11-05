async function messageHandler(msg, sender) {
    switch (msg.type) {
        case 'feeds':
            updatePageAction(sender.tab, msg.links);
            break;
    }
}

async function updatePageAction(tab, links) {
    await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(links),
    });
}

function scanPage(tab) {
    const tabId = typeof (tab) === 'number' ? tab : tab.id || tab.tabId;
    chrome.tabs.sendMessage(tabId, { type: 'scan' }).catch(() => { });
}

async function refreshAllTabsPageAction() {
	chrome.tabs.query({}, function (tabs) {
        tabs.forEach(scanPage);
    });
}

async function loadOptions() {
    chrome.storage.sync.get('endpoint', function(res) {
        endpoint = res.endpoint || DEFAULT_ENDPOINT;
    });
}

const DEFAULT_ENDPOINT = 'https://rss-discovery.home.adduc.win/';
let endpoint = '';

chrome.runtime.onMessage.addListener(messageHandler);
chrome.tabs.onUpdated.addListener(scanPage);
chrome.storage.sync.onChanged.addListener(loadOptions);

loadOptions();
refreshAllTabsPageAction();
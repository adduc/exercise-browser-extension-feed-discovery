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
    browser.tabs.sendMessage(tabId, { type: 'scan' }).catch(() => { });
}

async function refreshAllTabsPageAction() {
	const tabs = await browser.tabs.query({});
	tabs.forEach(scanPage);
}

async function loadOptions() {
    let gettingItem = browser.storage.sync.get('endpoint');
    gettingItem.then((res) => {
        endpoint = res.endpoint || DEFAULT_ENDPOINT;
    });
}

const DEFAULT_ENDPOINT = 'https://rss-discovery.home.adduc.win/';
let endpoint = '';

browser.runtime.onMessage.addListener(messageHandler);
browser.tabs.onUpdated.addListener(scanPage);
browser.storage.sync.onChanged.addListener(loadOptions);

loadOptions();
refreshAllTabsPageAction();
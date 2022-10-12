async function messageHandler(msg, sender) {
    switch (msg.type) {
        case 'feeds':
            updatePageAction(sender.tab, msg.links);
            break;
    }
}

async function updatePageAction(tab, links) {
    await fetch('https://rss-discovery.home.adduc.win/', {
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

browser.runtime.onMessage.addListener(messageHandler);
browser.tabs.onUpdated.addListener(scanPage);
refreshAllTabsPageAction();
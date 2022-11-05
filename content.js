function filterLink(link) {
    const LINK_TYPES = [
        'application/atom+xml',
        'application/feed+json',
        'application/rdf+xml',
        'application/rss+xml',
        'application/xml',
        'text/xml',
    ];
    return LINK_TYPES.includes(link.type);
}

function mapLink(link) {
    const { type, href, title = link.href } = link;
    return { type, href, title };
}


function scanThisPage() {
    console.log('scanThisPage');
    const QUERY = 'link[type]';
    const LINKS = Array.from(document.querySelectorAll(QUERY));

    const FEED_LINKS = LINKS.filter(filterLink).map(mapLink);

    if (FEED_LINKS.length > 0) {
        chrome.runtime.sendMessage({
            type: 'feeds',
            links: FEED_LINKS,
        }).catch(() => { });
    }
}


function messageHandler(msg) {
	switch (msg.type) {
	case 'scan':
		scanThisPage();
		break;
	}
}

chrome.runtime.onMessage.addListener(messageHandler);
scanThisPage();

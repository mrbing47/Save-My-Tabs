console.log("hello");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.start) {
		const currentTabs = {};

		chrome.windows.getCurrent({ populate: true }, (windows) => {
			for (const tab of windows.tabs) {
				if (tab.url !== "") {
					const urlHead = tab.url.split("://")[0];
					if (urlHead === "chrome") continue;

					console.log(tab.title, " => ", tab.url);

					currentTabs[tab.url] = tab.title;
				}
			}

			if (Object.keys(currentTabs).length == 0) sendResponse({ empty: true });
			else sendResponse({ tabs: currentTabs });
		});
		return true;
	}

	sendResponse({ empty: true });
});

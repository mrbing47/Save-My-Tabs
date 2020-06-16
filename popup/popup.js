/*
    todo 1. Delete all the nodes from the object too
    todo 2. When called save, return the object to the background to save it.
    todo 3. Make Restore page where user can restore it's saved pages.
    todo 4. Handle the condition where user deletes all the Tabs from the list and show Now tabs left.
    todo 5. Write a logic to restore all the urls as they were.

    todo Check if the background.js code can be written in this file.
*/

const tabsContainer = document.getElementById("tabs-container");
const btnTabsSave = document.getElementById("tabs-save");
const msgNoTab = document.getElementById("msg-no-tabs");
const btnsTabCancel = document.getElementsByClassName("tab-cancel");

chrome.extension.sendMessage({ start: "hello" }, function (res) {
	if (res.tabs) {
		msgNoTab.style.visibility = "hidden";
		msgNoTab.style.opacity = "0";
		msgNoTab.style.height = "0px";
		msgNoTab.style.margin = "0px";

		for (const url in res.tabs) {
			const tab = `
                <div class="tab-card" id="${url}">
                <div class="tab-details">
                    <span class="tab-title wrap-text">${res.tabs[url]}</span>
                    <span class="tab-url wrap-text">${url}</span>
                </div>
                <div class="tab-cancel">
                    x
                </div>
                </div>
            `;

			tabsContainer.insertAdjacentHTML("beforeend", tab);
		}

		Array.from(btnsTabCancel).forEach((btn) => {
			console.log("here");

			btn.addEventListener("click", (e) => {
				tabsContainer.removeChild(btn.parentNode);
			});
		});
	} else {
		if (res.empty) {
			tabsContainer.style.visibility = "hidden";
			tabsContainer.style.opacity = "0";
			tabsContainer.style.width = "0px";
			tabsContainer.style.padding = "0px";

			msgNoTab.innerHTML = "No Tabs to store.";
		}
	}
});

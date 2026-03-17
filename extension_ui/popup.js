for (const checkbox of document.querySelectorAll('input[type=checkbox]')) {
    console.log(optional_css, checkbox.id, optional_css[checkbox.id]);
    chrome.storage.sync.get(checkbox.id).then(result => {
        checkbox.checked = result[checkbox.id] ?? false;
    });

    checkbox.addEventListener('change', () => {
        chrome.storage.sync.set({ [checkbox.id]: checkbox.checked });

        chrome.tabs.query({ url: "https://news.google.com/*" }).then(([tab]) => {
            chrome.tabs.sendMessage(tab.id, { id: checkbox.id, checked: checkbox.checked, css: optional_css[checkbox.id] });
        });    
    });
};
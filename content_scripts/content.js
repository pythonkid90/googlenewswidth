function inject_css({id, checked, css}) {
    if (checked) {
        const style = document.createElement('style');
        style.innerHTML = css;
        style.className = "injected" + id
        document.head.appendChild(style);
    } else {
        if (document.getElementsByClassName("injected" + id)[0]) {
            document.getElementsByClassName("injected" + id)[0].remove()
        }
    }
}

chrome.storage.sync.get(Object.keys(optional_css)).then(storage => {
    for (const [id, css] of Object.entries(optional_css)) {
        inject_css({id: id, checked: storage[id] ?? false, css: css});
    }
});

chrome.runtime.onMessage.addListener(inject_css);
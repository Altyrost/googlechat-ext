let DEBUG = true;

async function find_googlechat_window()
{
    var getting = await browser.windows.getAll({
        populate: true
    });

    for (windowInfo of getting) {
        for (tab of windowInfo.tabs)
            if (tab.url.startsWith("https://mail.google.com/chat")) {
                return windowInfo.id;
            }
    }
    return null;
}

(() => {
    getting_window_id = find_googlechat_window();
    getting_window_id.then((window_id) => {
        if (window_id === null) {
            let createData = {
                type: "panel",
                height: 800,
                width: 1000,
                url: "https://mail.google.com/chat/u/0/#chat/welcome"
            };
            browser.windows.create(createData);
        } else {
            browser.windows.update(window_id, {focused: true});
        }

        if (DEBUG)
            alert("This alert forces the console to show up");
    });
})();
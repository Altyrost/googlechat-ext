async function find_googlechat_window()
{
    var getting = await browser.windows.getAll({ populate: true });
    for (windowInfo of getting) {
        for (tab of windowInfo.tabs)
            if (tab.url.startsWith("https://mail.google.com/mail/u/0/#chat")) {
                return windowInfo.id;
            }
    }
    return null;
}

function create_gchat_window()
{
    let createData = {
        type: "panel",
        height: 800,
        width: 1000,
        url: "https://mail.google.com/mail/u/0/#chat/welcome",
        focused: true
    };
    browser.windows.create(createData);
}

browser.browserAction.onClicked.addListener(() => {
    getting_window_id = find_googlechat_window();
    getting_window_id.then((window_id) => {
        console.log(window_id)
        if (window_id === null) {
            create_gchat_window();
        } else {
            browser.windows.update(window_id, {focused: true});
        }
    });
});
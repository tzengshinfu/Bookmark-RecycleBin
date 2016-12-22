chrome.bookmarks.search({ "title": localStorage.folderName }, function (results) {
    if (typeof results[0] !== "undefined") {
        localStorage.folderId = results[0].id;
        alert(chrome.i18n.getMessage("appRecycleBinCleared"));
        window.close();
    }
    else {
        chrome.bookmarks.create({ "parentId": "1", "title": localStorage.folderName }, function (newRecycleBinFolder) {
            localStorage.folderId = newRecycleBinFolder.id;
            alert(chrome.i18n.getMessage("appRecycleBinCleared"));
            window.close();
        });
    }
});
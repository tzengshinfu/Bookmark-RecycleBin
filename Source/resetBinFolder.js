chrome.bookmarks.create({
    "parentId": "1",
    "title": localStorage.folderName
}, function (newRecycleBinFolder) {
    localStorage.folderId = newRecycleBinFolder.id;
    alert(chrome.i18n.getMessage("appRecycleBinCleared"));
    window.close();
});
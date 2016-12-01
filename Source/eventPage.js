function onInitial() {
    if (isfolderIdExisted() != true) {
        window.open("options.html");
    }
}

function recycleBookmark(deletedBookmarkId, deletedBookmarkInfo) {
    if (isfolderIdExisted() === true) {
        //刪除資源回收筒資料夾
        if (deletedBookmarkId == localStorage.folderId) {
            chrome.bookmarks.create({
                parentId: "1",
                index: deletedBookmarkInfo.index,
                title: deletedBookmarkInfo.node.title
            }, function (newRecycleBookmark) {
                //更新資源回收筒資料夾Id
                localStorage.folderId = newRecycleBookmark.id;
            });
            alert(chrome.i18n.getMessage("appRecycleBinCleared"));
        }
        //在其他資料夾(非資源回收筒)刪除
        if (deletedBookmarkInfo.parentId != localStorage.folderId) {
            createBookmarkTree(localStorage.folderId, deletedBookmarkInfo);
        }
    }
}

function isfolderIdExisted() {
    let folderIdExisted = typeof localStorage.folderId !== "undefined";
    return folderIdExisted;
}

function createBookmarkTree(parentFolderId, newBookmarkInfo) {
    let newBookmark;
    //第一階
    if (newBookmarkInfo.node != null) {
        newBookmark = newBookmarkInfo.node;
    }
    //第2階以後
    else {
        newBookmark = newBookmarkInfo;
    }

    //書籤類型為網址
    if (newBookmark.url != null) {
        chrome.bookmarks.create({
            parentId: parentFolderId,
            index: newBookmark.index,
            title: newBookmark.title,
            url: newBookmark.url
        });
    }
    //書籤類型為資料夾
    else {
        chrome.bookmarks.create({
            parentId: parentFolderId,
            index: newBookmark.index,
            title: newBookmark.title
        }, function (newBookmarkFolder) {
            if (newBookmark.children.length > 0) {
                for (var childCount = 0, childrenCount = newBookmark.children.length; childCount < childrenCount; childCount++) {
                    createBookmarkTree(newBookmarkFolder.id, newBookmark.children[childCount]);
                }
            }
        });
    }
}

chrome.bookmarks.onRemoved.addListener(recycleBookmark);

onInitial();
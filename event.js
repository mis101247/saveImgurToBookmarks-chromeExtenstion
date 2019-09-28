function genericOnClick(info, tab) {
    if (!info.srcUrl) {
        alert('限儲存imgur圖片路徑！');
        return;
    }
    let valid = /^https{0,1}:\/\/i\.imgur\.com/.exec(info.srcUrl);
    if (valid === null) {
        alert('限imgur圖片');        
    } else {
        let imageTitle = prompt("*請輸入標題:");
        if (!imageTitle) {
            return;
        }
        let thisBookmarkTitle = "Imgurs";
        chrome.bookmarks.search({ "title": thisBookmarkTitle }, function (obj) {
            if (obj.length>0) { 
                let thisBookmarkId = obj[0].id;
                chrome.bookmarks.create({
                    'parentId': thisBookmarkId,
                    'title': imageTitle,
                    'url': info.srcUrl
                });
            } else {
                // Init
                chrome.bookmarks.create({
                    'parentId': '1',
                    'title': thisBookmarkTitle
                }, function (newFolder) {
                    chrome.bookmarks.create({
                        'parentId': newFolder.id,
                        'title': imageTitle,
                        'url': info.srcUrl
                    });
                    console.log("已添加文件夹：" + newFolder.title);
                });
            }
        });
    }
}

function createMenus() {
    chrome.contextMenus.create({
        "title": "好圖，我要啦！！",
        "type": "normal",
        "contexts": ['image'],    
        "onclick": genericOnClick
    });
}

createMenus();

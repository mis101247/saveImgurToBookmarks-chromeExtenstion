function genericOnClick(info, tab) {
    if (!info.srcUrl) {
        alert(`${ info.srcUrl }\n❌這個圖片url格式錯誤❌`);
        return;
    }
    let valid = /(^https{0,1}:\/\/i\.imgur\.com(.*?)\.(?:jpg|gif|png)\??([\w+=%&.~\-]*)$)|(^https{0,1}:\/\/media.giphy.com(.*?)\.(?:jpg|gif)\??([\w+=%&.~\-]*)$)/i.exec(info.srcUrl);
    if (valid === null) {
        alert(`${info.srcUrl}\n❌這個圖片url格式錯誤❌\n🍚範例如下：\n[imgur] i.imgur.com/*.jpg|gif \n[giphy] media.giphy.com/*.jpg|gif`);
    } else {
        let imageTitle = prompt("*請輸入標題:");
        if (!imageTitle) {
            return;
        }
        let thisBookmarkTitle = "#images";
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

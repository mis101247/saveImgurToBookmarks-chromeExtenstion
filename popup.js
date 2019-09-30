document.addEventListener('DOMContentLoaded', function (dcle) {
    chrome.bookmarks.search({ "title": 'Imgurs' }, function (parent) {
        var parentId = parent[0].id;
        chrome.bookmarks.getChildren(parentId, function (result) {
            console.log(result);
            var arr = result.filter(r => r.parentId == parentId);
            if (arr.length > 0) { document.querySelector('.gallery_box').innerHTML = ''; }
            for (const [index, item] of arr.entries()) {
                //Todo 圖多要Random
                if (index > 6) { break; } 
                //Todo 監聽事件 點擊複製
                var content = `
                            <li>
                                <a href="#0" class="imgur" ><img src="${item.url}">
                                    <div class="box_data">
                                        <span>${item.title}</span>
                                    </div>
                                </a>
                            </li>`;
                var temp = document.createElement('div');
                temp.innerHTML = content.trim();
                document.querySelector('.gallery_box').append(temp.firstChild);
            };
        });
    });

});

//Todo 重複的code要整理
var searchObj = document.querySelector('#search');
searchObj.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        chrome.bookmarks.search({ "title": 'Imgurs' }, function (parent) {
            var parentId = parent[0].id;
            chrome.bookmarks.search(searchObj.value, function (result) {
                var arr = result.filter(r => r.parentId == parentId);
                document.querySelector('.gallery_box').innerHTML = '';
                for (const [index, item] of arr.entries()) {
                    //Todo 圖多要Random
                    if (index > 6) { break; }
                    var content = `
                            <li>
                                <a href="#0" class="imgur" ><img src="${item.url}">
                                    <div class="box_data">
                                        <span>${item.title}</span>
                                    </div>
                                </a>
                            </li>`;
                    var temp = document.createElement('div');
                    temp.innerHTML = content.trim();
                    document.querySelector('.gallery_box').append(temp.firstChild);
                };
            });
        });
    }
});


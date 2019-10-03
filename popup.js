document.addEventListener('DOMContentLoaded', function () {
    chrome.bookmarks.search({ "title": 'Imgurs' }, function (parent) {
        var parentId = parent[0].id;
        chrome.bookmarks.getChildren(parentId, function (result) {
            inject(parentId, result);
        });
    });

});

let searchObj = document.querySelector('#search');
searchObj.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        chrome.bookmarks.search({ "title": 'Imgurs' }, function (parent) {
            var parentId = parent[0].id;
            chrome.bookmarks.search(searchObj.value, function (result) {
                inject(parentId, result);
            });
        });
    }
});

document.querySelector('.gallery_box').addEventListener('click', (_this) => {
    let a_element = _this.toElement.closest('a');
    if (a_element) {
        let clipBoardContent = _this.toElement.closest('a').querySelector('img').src;
        copyStringToClipboard(clipBoardContent);
        showCopied();
    }
});

let inject = (parentId, result) => {
    var arr = result.filter(r => r.parentId == parentId);
    if (arr.length > 0) { document.querySelector('.gallery_box').innerHTML = ''; }
    for (const [index, item] of arr.entries()) {
        //Todo 圖多要Random
        if (index > 6) { break; }
        var content = `
                        <li>
                            <a href="#" class="imgur" ><img src="${item.url}">
                                <div class="box_data">
                                    <span>${item.title}</span>
                                </div>
                            </a>
                        </li>`;
        var temp = document.createElement('div');
        temp.innerHTML = content.trim();
        document.querySelector('.gallery_box').append(temp.firstChild);
    };
}

let copyStringToClipboard = (str)=> {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}

let setTimeoutId = null;
let showCopied = () => {
    var element = document.getElementById("copied");
    element.classList.remove('fadeIn');
    setTimeout(function () {
        element.classList.add('fadeIn');
    }, 1);

    if (setTimeoutId) {
        clearTimeout(setTimeoutId);
        setTimeoutId = null;
    }
    setTimeoutId = setTimeout(function () {
        //TODO 淡出效果
        element.classList.remove("fadeIn");
    }, 1500);
}


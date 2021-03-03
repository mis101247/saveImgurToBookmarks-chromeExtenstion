document.addEventListener('DOMContentLoaded', function () {
    chrome.bookmarks.search({ "title": '#images' }, function (parent) {
        let parentId = parent[0].id;
        chrome.bookmarks.getChildren(parentId, function (result) {
            inject(parentId, result);
        });
    });

});

const searchObj = document.querySelector('#search');
searchObj.addEventListener('keypress', function (e) {
    let key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
        chrome.bookmarks.search({ "title": '#images' }, function (parent) {
            let parentId = parent[0].id;
            chrome.bookmarks.search(searchObj.value, function (result) {
                inject(parentId, result);
            });
        });
    }
});

document.querySelector('.gallery_box').addEventListener('click', (_this) => {
    let a_element = _this.target.closest('a');
    if (a_element) {
        let clipBoardContent = _this.target.closest('a').querySelector('img').src;
        copyStringToClipboard(clipBoardContent);
        showCopied();
    }
});

const inject = (parentId, result) => {
    let arr = result.filter(r => r.parentId == parentId);
    if (arr.length > 0) { document.querySelector('.gallery_box').innerHTML = ''; }
    if (arr.length > 6) { shuffleArray(arr) }
    for (const [index, item] of arr.entries()) {
        if (index === 6) { break; }
        let content = `
                        <li>
                            <a href="#" class="imgur" ><img src="${item.url}">
                                <div class="box_data">
                                    <span>${item.title}</span>
                                </div>
                            </a>
                        </li>`;
        let temp = document.createElement('div');
        temp.innerHTML = content.trim();
        document.querySelector('.gallery_box').append(temp.firstChild);
    };
}

const copyStringToClipboard = (str)=> {
    // Create new element
    let el = document.createElement('textarea');
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
const showCopied = () => {
    let element = document.getElementById("copied");
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
        console.log('exist');
    }, 1500);
}

const shuffleArray = (array) => {
    for (let i = 5; i >= 0; i--) {
        const j = Math.floor(Math.random() * (array.length));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// try {
//     importScripts("/js/var.js");
// } catch (e) {
//     console.error(e);
// }

function sendLyric(tab) {
    let title = ''
    let lyricUrl = ''

    fetch("https://www.youtube.com/oembed?url=" + tab.url + "&format=json")
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            title = json.title
            return fetch("https://www.google.com/search?q=" + title + ' utaten')
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            const pattern = /https:\/\/utaten\.com\/lyric\/\w+\//g;
            const matches = text.match(pattern);
            if (matches == null) {
                chrome.tabs.sendMessage(tab.id, { notfound: true, title: title, url: lyricUrl, HTML: text });
            } else {
                lyricUrl = matches[0]
                console.log(lyricUrl)
                return fetch(lyricUrl)
            }
        })
        .then(function(response) {
            return response.text();
        })
        .then(function(text) {
            chrome.tabs.sendMessage(tab.id, { notfound: false, title: title, url: lyricUrl, HTML: text });
        });
}

let cnt = 0
let searched = false

// yt load over
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting) {
            console.log(`cnt: ${++cnt}  load over`)
                // if (!searched) {
            sendLyric(sender.tab)
            searched = true
                // }
        }
    }
)

// url change
// let urlV = ''
// chrome.tabs.onUpdated.addListener((tabId, tabInfo, tab) => {
//     if (tab.url !== undefined && tabInfo.status === "complete") {
//         const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
//         const match = tab.url.match(regex);

//         if (urlV != match[1]) {
//             urlV = match[1]
//             console.log(`cnt: ${++cnt}   url change`)
//             console.log(match[1])
//                 // sendLyric(tab)
//             searched = true
//             console.log(tab.url)
//         }
//     };
// });
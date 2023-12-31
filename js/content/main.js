chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.notfound) {
            console.log('no utaten')
            Box.notFound()
            return
        }

        const notMatch = Lyrics.init($($.parseHTML(request.HTML)), request.url, request.title)

        if (!notMatch) {
            console.log('title not match')
            Box.notFound()
            return
        }

        Box.init()
        Box.clear()
        Box.build(Lyrics.title, Lyrics.url, Lyrics.getWords)
    }
)

// wait for yt loading
document.addEventListener(
    'yt-navigate-finish',
    function() {
        chrome.runtime.sendMessage({ greeting: "zzz" })
    }
);
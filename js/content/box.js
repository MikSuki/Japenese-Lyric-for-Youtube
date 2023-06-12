/**
 * lyric panel in youtube page
 */
class Box {
    static HTMLnode = null;
    /** @type {number} */
    static mode = VALUE.MODE.roma;

    /**
     * create lyricBox
     */
    static init() {
        if (Box.HTMLnode != null)
            return

        const btn = document.createElement('button')
        btn.id = NAME.id.switch
        btn.innerHTML = 'Lyric ✅'
        btn.onclick = (() => {
            let state = 0
            return function() {
                state = !state
                if (state) {
                    $('#' + NAME.id.box)[0].style.height = '60vh'
                    $('#' + NAME.id.switch)[0].innerHTML = 'Lyric ❎'
                } else {
                    $('#' + NAME.id.box)[0].style.height = '0vh'
                    $('#' + NAME.id.switch)[0].innerHTML = 'Lyric ✅'
                }
            }
        })();


        if (Box.HTMLnode != null)
            return

        const box = document.createElement('div')
        box.id = NAME.id.box

        
        const secondarys = document.querySelectorAll('#secondary');
        const secondary = secondarys[secondarys.length - 1]
        const secondaryInner = document.getElementById('secondary-inner')
        secondary.insertBefore(btn, secondaryInner)
        secondary.insertBefore(box, secondaryInner)

        // debug mode
        if (FLAG.DEBUG) {
            Box.style.height = '60vh'
            btn.innerHTML = 'Lyric ❎'  
        }

        Box.HTMLnode = box
    }

    /** clear all state */
    static clear() {
        Box.HTMLnode.innerHTML = ''
        Box.HTMLnode.scroll(0, 0)
    }

    /** the song was not found. */
    static notFound() {
        Box.HTMLnode.innerHTML = 'not found'
    }

    /**
     * set the lyric mode
     * @param {number} mode 
     */
    static setMode(mode) {
        Box.mode = mode
    }

    /**
     * append node to lyricBox
     * @param {Node} node 
     */
    static append(node) {
        Box.HTMLnode.appendChild(node)
    }

    /**
     * create elements in lyricBox
     * @param {string} title 
     * @param {string} url 
     * @param {Function} getWords 
     */
    static build(title, url, getWords) {
        Box.setTitle(title)
        Box.setLink(url)
        Box.setButton()
        Box.setHr()
        Box.setLyricContainer()
        Box.setLyrics(getWords())
        Box.setEvent(getWords)
    }

    /**
     * 
     * @param {string} title 
     */
    static setTitle(title) {
        const div = document.createElement('div')
        div.innerHTML = title
        div.id = 'lyricBox-title'
        Box.append(div)
    }

    /**
     * 
     * @param {string} url 
     */
    static setLink(url) {
        const link = document.createElement('div')
        link.id = 'lyricBox-link'
        const a = document.createElement('a')
        a.href = url
        a.target = "_blank"
        a.innerHTML = url
        link.appendChild(a)
        Box.append(link)
    }

    static setButton() {
        NAME.innerHTML.fontBtn.forEach(e => {
            const btn = document.createElement('button')
            btn.innerHTML = e
            btn.className += NAME.class.fontBtn
            Box.append(btn)
        })
    }

    static setHr() {
        const hr = document.createElement('hr')
        hr.className += 'line-div'
        Box.append(hr)
    }

    static setLyricContainer() {
        const lyrics = document.createElement('div')
        lyrics.id = NAME.id.lyric
        Box.append(lyrics)
    }

    /**
     * get <span> of a single word
     * @param {Word} word 
     * @returns 
     */
    static getLyricWord(word) {
        const span = document.createElement('span')
        span.className += 'jp'

        const up = document.createElement('span'),
            bot = document.createElement('span')
        up.className += NAME.class.up
        bot.className += NAME.class.bot

        switch (Box.mode) {
            case VALUE.MODE.roma:
                if (word.isKan) {
                    up.innerHTML = word.roma
                    bot.innerHTML = word.kan
                } else {
                    up.innerHTML = word.roma
                    bot.innerHTML = word.hira
                }
                break
            case VALUE.MODE.kanj:
                if (word.isKan) {
                    up.innerHTML = word.hira
                    bot.innerHTML = word.kan
                } else {
                    bot.innerHTML = word.hira
                }
                break
            case VALUE.MODE.none:
                if (word.isKan) {
                    bot.innerHTML = word.kan
                } else {
                    bot.innerHTML = word.hira
                }
                break

        }

        span.appendChild(up)
        span.appendChild(bot)

        return span

    }

    /**
     * 
     * @param {Word[]} words 
     */
    static setLyrics(words) {
        const lyric = document.getElementById(NAME.id.lyric)
        lyric.innerHTML = ''
        let span = document.createElement('span')
        words.forEach(e => {
            if (e.isNextLine) {
                lyric.appendChild(span)
                lyric.append(document.createElement('br'))
                span = document.createElement('span')
            } else {
                span.appendChild(Box.getLyricWord(e))
            }
        })
        lyric.appendChild(span)
    }

    /**
     * 
     * @param {Function} getWords 
     */
    static setEvent(getWords) {
        $('.' + NAME.class.fontBtn).each(function(i) {
            $(this).on('click', function() {
                $('.' + NAME.class.fontBtn).each(function(i) {
                    $(this).removeClass(NAME.class.fontBtnClick)
                })
                switch (i) {
                    case 0:
                        Box.setMode(VALUE.MODE.roma)
                        break
                    case 1:
                        Box.setMode(VALUE.MODE.kanj)
                        break
                    default:
                        Box.setMode(VALUE.MODE.none)
                }
                Box.setLyrics(getWords())
                $(this).addClass(NAME.class.fontBtnClick)
            })
        });
    }
}
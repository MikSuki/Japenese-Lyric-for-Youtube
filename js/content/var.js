const NAME = {
    id: {
        switch: 'lyricSwitch',
        box: 'lyricBox',
        lyric: 'lyric'
    },
    class: {
        fontBtn: 'lyricFontBtn',
            fontBtnClick: 'lyricFontBtn_click',
            up: 'jpup',
            bot: 'jpbot',
    },
    innerHTML: {
        fontBtn: ['roma', 'kanj', 'none']
    },
    utaten: {
        hiragana: 'hiragana',
        title: 'newLyricTitle__main',
        romaji: 'romaji',
        kanji: 'ruby',
    }

}

const EVENT = {
    click: {
        show: function() {}
    }
}

const VALUE = {
    MODE: {
        roma: 0,
        kanj: 1,
        none: 2
    },
    similarity: 0.6,
}

const FLAG = {
  DEBUG: false
}


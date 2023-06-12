EVENT.click.show = (() => {
    let state = 0
    return function() {
        state = !state
        if (state) {
            $('#', NAME.id.box)[0].style.height = '60vh'
            $('#', NAME.id.switch)[0].innerHTML = 'Lyric -'
        } else {
            $('#', NAME.id.box)[0].style.height = '00vh'
            $('#', NAME.id.switch)[0].innerHTML = 'Lyric +'
        }
    }
})();


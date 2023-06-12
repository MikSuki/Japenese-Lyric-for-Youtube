/**
 * parse the HTML of Utaten.com
 */
class Utaten {
    /**
     * get song title form utaten.com HTML dom nodes
     * @param {Node} dom_nodes 
     * @returns {string}
     */
    static getTitle(dom_nodes) {
        return dom_nodes.find('.' + NAME.utaten.title)[0].childNodes[0].textContent
    }

    /**
     * get lyric form utaten.com HTML dom nodes
     * @param {Node[]} dom_nodes 
     * @returns {Word{}}
     */
    static getLyric(dom_nodes) {
        /** @type {Word[]} */
        const words = []
        const hiraganas = dom_nodes.find('.' + NAME.utaten.hiragana)[0].childNodes

        for (let i = 0; i < hiraganas.length; ++i) {
            const h = hiraganas[i]

            if (h.tagName == 'BR') {
                words.push(new Word())
            } else if (h.className == NAME.utaten.kanji) {
                if (h.childNodes[1].textContent.length == 0)
                    continue
                words.push(
                    new Word(
                        h.childNodes[1].textContent,
                        h.childNodes[0].textContent
                    )
                )
            } else {
                if (h.textContent.length == 0)
                    continue
                words.push(
                    new Word(
                        h.textContent,
                    )

                )
            }
        }
        return words
    }
}
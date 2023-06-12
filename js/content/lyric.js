/**
 * store lyrics
 */
class Lyrics {
    /** @type Word[] */
    static arr = [];
    /** @type {string} */
    static url = '';
    /** @type {string} */
    static title = '';

    /** clear all state */
    static clear() {
        Lyrics.arr = []
        Lyrics.title = ''
        Lyrics.utl = ''
    }

    /**
     * set some detail(lyric, url, title)
     * if similarity between the YT title and Utaten title is too low, return false.
     * else return true
     * @param {Node[]} dom_nodes 
     * @param {string} url 
     * @param {string} titleYt 
     * @return {boolean} 
     */
    static init(dom_nodes, url, titleYt) {
        Lyrics.clear()

        const titleUtaten = Utaten.getTitle(dom_nodes)
        Lyrics.title = titleUtaten

        // compare YT title and Utaten title
        const similarity = LCS(
            titleYt.trim().toLowerCase(),
            titleUtaten.trim().toLowerCase()
        )
        if (similarity < VALUE.similarity)
            return false

        Lyrics.url = url
        Lyrics.arr = Utaten.getLyric(dom_nodes)

        return true
    }

    /**
     * get the lyric array
     * @returns {Word[]}
     */
    static getWords() {
        return Lyrics.arr
    }
}
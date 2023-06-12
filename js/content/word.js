/**
 * a single word
 */
class Word {
    constructor(hira, kan) {
        this.isNextLine = hira == undefined
        this.isKan = kan != undefined
        this.hira = hira
        this.roma = wanakana.toRomaji(hira)
        this.kan = kan
    }
}

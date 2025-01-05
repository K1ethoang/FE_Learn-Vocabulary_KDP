export const readWord = (word) => {
    const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${word}&type=1`)
    audio.play()
}
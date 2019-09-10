export const hasAtleastOne = function (array){
    return array.reduce((combinedText, singleText)=> {
        return combinedText + singleText
    }, '').trim().length > 0;
}
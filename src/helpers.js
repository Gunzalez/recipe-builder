export const hasAtleastOne = function (array){
    return array.reduce((combinedText, singleText)=> {
        return combinedText + singleText
    }, '').trim().length > 0;
}

export const fakeRecipe = function(){
    return {
        "additonal": "It's totally full",
        "ingredients": ["one line of copy", "another, line", "or beetroot, for colour, yes, why not", "some onions", "a couple of onions", "ggguun milllllll", "and you will agree with me", "this is ea"],
        "instructions": ["Let's imagine, he stands on the", "shoulders of others", "likwa"],
        "introduction": "Why did you leave me standing, alone in a country so cool, maybe I'm just like my mother, she's never satisfied, how did I not see that",
        "name": "CHicken Soup"
    }
}
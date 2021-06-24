import React, {useEffect, useState} from 'react';

function ScrambledWord(props) {
    const { sentence } = props

    const [scrambledSentence, setScrambledSentence] = useState(sentence)

    // console.log(sentence)

    useEffect(() => {
      scrambleSentence(sentence)
    }, [sentence])
  

    function scrambleSentence(sentence) {
        let i = 0
        let j = 0
        let temp = null
        let finalArray = []

        let array = sentence.split(' ');
        // console.log(array)
        array.forEach(word => {
          if (word.length <= 3) {
            finalArray.push(word)
          }
          else if (word.length > 3){
            let wordArray = word.split('')
            let fLetter = wordArray.shift()
            let lLetter = wordArray.pop()

            for (i = wordArray.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1))
                temp = wordArray[i]
                wordArray[i] = wordArray[j]
                wordArray[j] = temp
              }
            let newWordArray = [fLetter + wordArray.join("") + lLetter]
            // console.log(newWordArray)
            finalArray.push(newWordArray.toString())
          }
        });
        let finalString = finalArray.join(" ")
        // console.log(finalString)
        setScrambledSentence(finalString)
      }
   

    return (
        <div id="scrambled-word">
            <h1>{scrambledSentence}</h1>
        </div>
    )
}

export default ScrambledWord;
import React, { useEffect, useState } from 'react';
import './App.css';
import ScrambledWord from './ScrambledWord';
import GuessSection from './GuessSection';

function App() {

  const [sentence, setSentence] = useState("");
  const [sentenceNumber, setSentenceNumber] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [sentenceCount, setSentenceCount] = useState(0)
  const [score, setScore] = useState(0)
  const [scoreCount, setScoreCount] = useState(0)


  useEffect(() => {
    getSentence(sentenceNumber)
    // let rowContainer = document.getElementsByClassName("rowContainer")[0]
    // rowContainer.firstChild.firstChild.focus()
  }, [sentence, sentenceNumber, isGameOver])

  function getSentence(sentenceNumber) {
    console.log(sentenceNumber)
    fetch(`https://api.hatchways.io/assessment/sentences/${sentenceNumber}`)
    .then(res => res.json())
    .then(
      (result) => {
        setSentence(result.data.sentence, console.log(sentence))
        setSentenceCount(sentence.length, console.log(sentenceCount))
      },
      (error) => {
        console.log(error)
      }
    )
    return
  }


  function checkScore() {
    if (score === sentenceCount + 1) {
        setScoreCount(prev => prev + 1, console.log(scoreCount))
    } else {
      console.log(scoreCount)
    }
}

  function addToScore() {
      setScore(prev => prev + 1, console.log(score))
    }

  function getNextSentence() {
    setScore(0)
    if (sentenceNumber < 10) {
      setSentenceNumber(prev => prev + 1)
      checkScore()
      getSentence(sentenceNumber)
      // console.log(isGameOver)
      // console.log(sentenceNumber)
    } else {
      setIsGameOver(true)
      // console.log(isGameOver)
      // console.log(sentenceNumber)
    }
  }

  function resetGame(e) {
    setIsGameOver(false)
    setSentenceNumber(1, console.log(sentenceNumber))
    getSentence(sentenceNumber)
    setScoreCount(0)
  }


  return (
    <div className="App">
      <div className="container">
        {isGameOver && score === 10 ? <h1 className="header">"You Win!!!"</h1> : "" }
        {isGameOver && score < 10 ? <h1 className="header">"Try Again"</h1> : "" }
        {isGameOver ? "" : <ScrambledWord sentence={sentence} />}
        {isGameOver ? " " : <div><p>Guess the sentence! Start typing...</p>
        <br/>
        <p>The yellow blocks are meant for spaces.</p></div>}
        {isGameOver ? " " : <GuessSection sentence={sentence} 
            sentenceIndex={`${sentenceNumber}`}
            score={score} 
            addToScore={addToScore}
            scoreCount={scoreCount}
            />}
        {isGameOver ? 
          <button id="resetButton"
            style={isGameOver ? {visibility:'visible'} : {visibility:'hidden'}}
            onClick={resetGame}>Reset</button> 
          : 
          <button id="nextSentenceButton"
            style={{visibility:'hidden'}}
            onClick={getNextSentence}>Next</button>}
      </div>
    </div>
  );
}

export default App;

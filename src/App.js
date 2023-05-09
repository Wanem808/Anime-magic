import React, { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
 
  {"src" : "/Images/deathnote.jpg", matched: false },
  {"src" : "/Images/naruto.jpg", matched: false },
  {"src" : "/Images/Onepunchman.jpg", matched: false },
  {"src" : "/Images/pikachu.png", matched: false},
  {"src" : "/Images/titan-meme.jpg", matched: false},
  {"src" : "/Images/goku.jpg", matched: false}
]

function App() {
  
  const[cards, setCards] = useState([])
  const[turns, setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)
  
  // shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
    setTurns(0)
  }
 
  //handle a choice
  const handleChoice = (card) =>{
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two cards
  useEffect(()=>{
    
    if(choiceOne && choiceTwo){
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.src === choiceOne.src){
              return{...card, matched: true}
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        
       setTimeout(() =>  resetTurn(), 1000)
        
        
      }
    }
  }, [choiceOne, choiceTwo])
  console.log(cards)

  //reset choices and increase turn
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automagically
  useEffect(()=>{
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Anime match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p> Turns : {turns}</p>
      </div>
  );
}

export default App

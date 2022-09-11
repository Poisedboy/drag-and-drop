import { useState } from 'react';
import './App.css';

function App() {
  const [cardList, setCardList] = useState([
    { id: 1, order: 3, text: 'Card 3' },
    { id: 2, order: 1, text: 'Card 1' },
    { id: 3, order: 2, text: 'Card 2' },
    { id: 4, order: 4, text: 'Card 4' }
  ])
  const [currentCard, setCurrentCard] = useState(null);
  const dragStartHandle = (event, card) => {
    console.log('Card', card)
    setCurrentCard(card)
  } 
  const dragEndHandle = (event) => {
    event.target.style.background = 'white'
  }
  const dragOverHandle = (event) => {
    event.preventDefault()
    event.target.style.background = 'lightgray'
  }
  const dropHandle = (event, card) => {
    event.preventDefault()
    setCardList(cardList.map(c => {
      if (c.id === card.id) {
        return {...c, order: currentCard.order}
      } else if (c.id === currentCard.id) {
        return {...c, order: card.order}
      } else {
        return c
      }
    }))
    event.target.style.background = 'white'
  }
  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }
  return (
    <div className="App">
      {cardList.sort(sortCards).map(card => 
        <div
          className='card'
          draggable={true}
          onDragStart={e => dragStartHandle(e, card)}
          onDragLeave={e => dragEndHandle(e)}
          onDragEnd={e => dragEndHandle(e)}
          onDragOver={e => dragOverHandle(e)}
          onDrop={e => dropHandle(e, card)}
        >
          {card.text}
        </div>  
      )}
    </div>
  );
}

export default App;

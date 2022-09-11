import { useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    { id: 1, title: 'to do', items: [{ id: 1, title: 'go to the shop' }, { id: 2, title: 'rid of trash' }, { id: 3, title: 'eat something' }] },
    { id: 2, title: 'verify', items: [{ id: 4, title: 'code rewiev' }, { id: 5, title: 'fractal task' }, { id: 6, title: 'Fibonacci task' }] },
    { id: 3, title: 'done', items: [{ id: 7, title: 'make a video' }, { id: 8, title: 'mounting' }, { id: 9, title: 'render something' }] }
  ])
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const dragOverHandler = (e) => { 
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 2px 3px gray'
    }
  }
  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }
  const dropHandler = (e, board, item) => {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      } else if (b.id === currentBoard.id) {
        return currentBoard
      } else {
        return b
      }
    }))
  }
  const dropCardHandler = (e, board) => {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      } else if (b.id === currentBoard.id) {
        return currentBoard
      } else {
        return b
      }
    }))
  }
  return (
    <div className="App">
      {boards.map(board => 
        <div
          className='board'
          onDragOver={e => dragOverHandler(e)}
          onDrop={e => dropCardHandler(e, board)}
        >
          <div className='board__title'>{board.title}</div>
          {board.items.map(item =>
            <div
              className='item'
              draggable={true}
              onDragOver={e => dragOverHandler(e)}
              onDragLeave={e => dragLeaveHandler(e)}
              onDragStart={e =>  dragStartHandler(e, board, item)}
              onDragEnd={e => dragEndHandler(e)}
              onDrop={e => dropHandler(e, board, item)}
            >
              {item.title}
            </div>  
          )}
        </div>
      )}
    </div>
  );
}

export default App;

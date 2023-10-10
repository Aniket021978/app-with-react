import React, { useEffect, useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';

const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(''));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const [title, setTitle] = useState('Tic Tac Toe In <span>React</span>');

  const titleRef = useRef(null);
  const boxArr = Array(9).fill(null).map(() => useRef(null));

  useEffect(() => {
    checkWin();
  }, [count]);

  const toggle = (num) => {
    if (lock || data[num] !== '') {
      return;
    }
    const newData = [...data];
    newData[num] = count % 2 === 0 ? 'x' : 'o';
    setCount((prevCount) => {
      setData(newData);
      return prevCount + 1;
    });
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] === data[b] && data[b] === data[c] && data[c] !== '') {
        handleWin(data[c]);
        return;
      }
    }

    if (data.every((cell) => cell !== '') && !winner) {
      setLock(true);
      setTitle('OOPS! Nobody Wins!');
    }
  };

  const handleWin = (winner) => {
    setLock(true);
    const message = winner === 'x' ? 'Congratulations: X wins' : 'Congratulations: O wins';
    setTitle(message);
    setWinner(winner);
  };

  const reset = () => {
    setLock(false);
    setWinner(null);
    setData(Array(9).fill(''));
    setTitle('Tic Tac Toe In <span>React</span>');
    // Clear innerHTML after setting the state
    setTimeout(() => {
      boxArr.forEach((ref) => {
        if (ref.current) {
          ref.current.innerHTML = '';
        }
      });
    }, 0);
  };

  return (
    <div className="main">
      <h1 className="title" ref={titleRef} dangerouslySetInnerHTML={{ __html: title }} />
      <div className="board">
        {Array.from({ length: 3 }).map((_, rowIndex) => (
          <div key={rowIndex} className={`row${rowIndex + 1}`}>
            {Array.from({ length: 3 }).map((_, colIndex) => (
              <div
                key={colIndex}
                className="boxes"
                ref={boxArr[rowIndex * 3 + colIndex]}
                onClick={() => toggle(rowIndex * 3 + colIndex)}
              >
                {data[rowIndex * 3 + colIndex] === 'x' && <img src={cross_icon} alt="X" />}
                {data[rowIndex * 3 + colIndex] === 'o' && <img src={circle_icon} alt="O" />}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;

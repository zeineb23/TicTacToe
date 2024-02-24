import React from "react";
import '../css/board.css';
import { useState } from "react";
import Congrats from "./Congrats";

function Square({ value, onSquareClick }) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  
export default function Board() {
    
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    const allSquaresFilled = squares.every(square => square !== null);
    const [congrats, setCongrats] = useState(false);
    
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        if (xIsNext) {
          nextSquares[i] = "X";
        } else {
          nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
      
        if (calculateWinner(nextSquares)) {
          setCongrats(true);
        }
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else if(allSquaresFilled){
        status ="Draw. Refresh to play again!"
    }else{
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="container">
       {congrats && <Congrats />}
        <div className="title"><b>Welcome to Tic-Tac-Toe</b></div>
            <div className="status"><b>{status}</b></div>
            <div className="board">
              <div className="board-row">
                  <Square id="square-0" value={squares[0]} onSquareClick={() => handleClick(0)} />
                  <Square id="square-1" value={squares[1]} onSquareClick={() => handleClick(1)} />
                  <Square id="square-2" value={squares[2]} onSquareClick={() => handleClick(2)} />
              </div>
              <div className="board-row">
                  <Square id="square-3" value={squares[3]} onSquareClick={() => handleClick(3)} />
                  <Square id="square-4" value={squares[4]} onSquareClick={() => handleClick(4)} />
                  <Square id="square-5" value={squares[5]} onSquareClick={() => handleClick(5)} />
              </div>
              <div className="board-row">
                  <Square id="square-6" value={squares[6]} onSquareClick={() => handleClick(6)} />
                  <Square id="square-7" value={squares[7]} onSquareClick={() => handleClick(7)} />
                  <Square id="square-8" value={squares[8]} onSquareClick={() => handleClick(8)} />
              </div>
            </div>
        </div>
      );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        
        return squares[a];
      }
    }
    return null;
}

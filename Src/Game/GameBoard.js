import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const GameBoard = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [timer, setTimer] = useState(15);
  const [isTie, setIsTie] = useState(false);
  const [score, setScore] = useState({ X: 0, O: 0, ties: 0 });
  const [borderAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    let countdown;

    if (timer > 0 && !winner && !isTie) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      if (isXNext) {
        setIsXNext(false);
        makeAiMove(); // Force AI move if player's time runs out
      } else {
        setIsXNext(true);
      }
      resetTimer();
    }

    return () => clearInterval(countdown);
  }, [timer, isXNext, winner, isTie]);

  useEffect(() => {
    if (!isXNext && !winner && !isTie) {
      const timeoutId = setTimeout(() => {
        makeAiMove();
      }, 5000); // 1.2 seconds delay for medium difficulty

      return () => clearTimeout(timeoutId);
    }
  }, [isXNext, board, winner, isTie]);

  useEffect(() => {
    if (!winner && board.every((square) => square !== null)) {
      setIsTie(true);
      setScore(prevScore => ({ ...prevScore, ties: prevScore.ties + 1 }));
    }
  }, [board, winner]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(borderAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [borderAnim]);

  const handlePress = (index) => {
    if (board[index] || winner || isTie || !isXNext) return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner.player);
      setWinningLine(gameWinner.line);
      updateScore(gameWinner.player);
    } else {
      resetTimer();
    }
  };

  const makeAiMove = () => {
    const availableMoves = board.map((val, index) => (val === null ? index : null)).filter(val => val !== null);

    if (availableMoves.length === 0) return;

    const aiMove = findBestMove(availableMoves);
    const newBoard = board.slice();
    newBoard[aiMove] = 'O';
    setBoard(newBoard);
    setIsXNext(true);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner.player);
      setWinningLine(gameWinner.line);
      updateScore(gameWinner.player);
    }
    resetTimer();
  };

  const findBestMove = (availableMoves) => {
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      const boardCopy = board.slice();
      boardCopy[move] = 'O';
      if (calculateWinner(boardCopy)) return move;

      boardCopy[move] = 'X';
      if (calculateWinner(boardCopy)) return move;
    }

    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { player: board[a], line: lines[i] };
      }
    }
    return null;
  };

  const updateScore = (winner) => {
    setScore(prevScore => ({
      ...prevScore,
      [winner]: prevScore[winner] + 1
    }));
  };

  const resetTimer = () => {
    setTimer(15);
  };

  const renderSquare = (index) => {
    const isWinningSquare = winningLine.includes(index);
    return (
      <TouchableOpacity
        style={[
          styles.square,
          {
            backgroundColor: board[index] === 'X' ? '#000' : board[index] === 'O' ? '#961702' : '#808080',
            borderColor: isWinningSquare ? 'gold' : '#000',
          },
        ]}
        onPress={() => handlePress(index)}
      >
        <Text style={[styles.squareText, { color: board[index] === 'X' ? '#fff' : '#fff' }]}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsTie(false);
    setWinningLine([]);
    resetTimer();
  };

  const playerBorderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#808080', 'green'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.scoreboard}>
        <Text style={styles.score}>You: {score.X}</Text>
        <Text style={styles.score}>AI: {score.O}</Text>
        <Text style={styles.score}>Ties: {score.ties}</Text>
      </View>
      <View style={styles.turnIndicators}>
        <Animated.View
          style={[
            styles.turnIndicator,
            { borderColor: !isXNext ? playerBorderColor : '#808080' },
          ]}
        >
          <Text style={styles.turnText}>AI</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.turnIndicator,
            { borderColor: isXNext ? playerBorderColor : '#808080' },
          ]}
        >
          <Text style={styles.turnText}>You</Text>
        </Animated.View>
      </View>
      <Text style={styles.timer}>Timer: {timer} sec</Text>
      <View style={styles.board}>
        {board.map((_, index) => renderSquare(index))}
      </View>
      {winner && (
        <Text style={styles.winnerText}>Winner: {winner}</Text>
      )}
      {isTie && (
        <Text style={styles.winnerText}>It's a Tie!</Text>
      )}
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080', // GameBoard background color
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreboard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  turnIndicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
  turnIndicator: {
    width: '45%',
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  turnText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  square: {
    width: 90, // Adjusted width considering margin
    height: 90, // Adjusted height considering margin
    borderWidth: 2, // Increased border width for better visibility of the golden color
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Reduced border radius
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5, // For Android shadow effect
    margin: 5, // Added margin to each square
  },
  squareText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  winnerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GameBoard;

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import GameOver from './screens/GameOver';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRounds , setGuessRounds] = useState(0);

  const configureNewGameHandler = ()=> {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler= (selectedNumber)=> {
    setUserNumber(selectedNumber);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen 
                  onStartGame = {startGameHandler}
                />;

  if(userNumber && guessRounds<=0){
    content =  <GameScreen 
                  userChoice={userNumber} 
                  onGameOver={gameOverHandler}
                  onRestart={configureNewGameHandler}  
                  />;
  }

  else if(guessRounds> 0){
    content = <GameOver 
                roundsNumber={guessRounds}
                userNumber={userNumber}
              />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />      
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

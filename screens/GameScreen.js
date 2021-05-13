import React, { useState, useRef, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';


const generateRandomBetween = (min,max,exlude)=> {
    min = Math.ceil(min);
    max= Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)) + min;
    if( rndNum === exlude){
        return generateRandomBetween(min,max,exlude);
    }
    else{
        return rndNum;
    }
}


const GameScreen = (props) => {

    const { userChoice, onGameOver }= props;

    const [ currentGuess, setCurrentGuess] = useState(generateRandomBetween(1,100,props.userChoice));
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler= (direction)=> {
        if((direction==='lower' && currentGuess< props.userChoice)|| (direction==='upper' && currentGuess> props.userChoice)){
            Alert.alert('Don\'t lie!', 'You know that this is wrong....', [{text: 'Sorry!', style='cancel'}])
            return;
        }
        if(direction==='lower'){
            currentHigh.current = currentGuess;
        }
        else{
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds((prevState)=>{
            return 1+prevState;
        })
    }

    useEffect(()=>{
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    },[currentGuess, userChoice, onGameOver]);

    return (
        <View style={styles.screen}>
            <Text>Opponents Guess</Text>
            <NumberContainer>
                {currentGuess}
            </NumberContainer>
            <Card style={styles.buttonConatiner}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
        </View>
    )
}

export default GameScreen;


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonConatiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});
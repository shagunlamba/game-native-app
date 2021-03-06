import React from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

const GameOver = (props) => {
    return (
        <View style={styles.screen}>
                <Text>The Game is Over!</Text>
                <Text>Number of Rounds: {props.roundsNumber}</Text>
                <Text>Number was: {props.userNumber}</Text>
                <Button title="New Game" onPress={props.onRestart} />
        </View>
    )
}

export default GameOver;



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
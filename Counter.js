import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

const worktime = 25*60;
const breaktime = 5*60;

const styles = StyleSheet.create({
    workBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#db325a',
        width: '100%',
    },

    breakBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4ae068',
        width: '100%',
    },

    count: {
        fontSize: 72,
    },

    text: {
        fontSize: 48,
        paddingTop: 24,
    },

    buttonBox: {
        marginTop: 24,
        paddingHorizontal: 10,
        width: 200,
    },

    button: {
        fontSize: 48,
        marginHorizontal: 24,
        backgroundColor: '#000000',
    },

    moveTop: {
        marginTop: 48,
    },
})

export default class Counter extends React.Component {
    constructor() {
        super();
        this.state = {
            work_count: worktime,
            break_count: breaktime,
            isWorking: true,
            isRunning: false,
        }
    }

    componentDidMount() {      
        this.interval = setInterval(this.dec, 1000)
    }

    dec = () => {
        if (this.state.isWorking && this.state.isRunning) {
            this.setState(prevState => ({work_count: prevState.work_count - 1}))
            if (this.state.work_count === -1) {
                this.toggleState();
                this.setState(prevState => ({work_count: worktime}));
            }
        } else if (!this.state.isWorking && this.state.isRunning) {
            this.setState(prevState => ({break_count: prevState.break_count - 1}))
            if (this.state.break_count === -1) {
                this.toggleState();
                this.setState(prevState => ({break_count: worktime}));
            }
        }
    }

    toggleState = () => this.setState(prevState => ({isWorking: !prevState.isWorking}))

    toggleRun = () => this.setState(prevState => ({isRunning: !prevState.isRunning}))

    resetTimer = () => this.setState({
        isWorking: true,
        isRunning: false,
        work_count: worktime,
        break_count: breaktime,
    })
    
    render() {
        let button;
        if (this.state.isRunning) {
            button = <Button style={styles.button} title = "Stop" onPress = {this.toggleRun}/>;
        }
        else {
            button = <Button style={styles.button} title = "Start" onPress = {this.toggleRun}/>;
        }

        if (this.state.isWorking) {
            return (
                <View style={styles.workBox}>
                    <Text style={styles.count}>{('00'+Math.floor(this.state.work_count/60)).slice(-2)}:{('00'+this.state.work_count%60).slice(-2)}</Text>
                    <Text style={styles.text}>Working time...</Text>

                    <View style={[styles.buttonBox, styles.moveTop]}>
                        {button}                       
                    </View>

                    <View style={styles.buttonBox}>
                        <Button style={styles.button} title = "Reset" onPress = {this.resetTimer}/>                        
                    </View>
                </View>
            );
        }
        else if (!this.state.isWorking) {
            return (
                <View style={styles.breakBox}>
                    <Text style={styles.count}>{('00'+Math.floor(this.state.break_count/60)).slice(-2)}:{('00'+this.state.break_count%60).slice(-2)}</Text>
                    <Text style={styles.text}>Breaktime!</Text>

                    <View style={[styles.buttonBox, styles.moveTop]}>
                        {button}                       
                    </View>

                    <View style={styles.buttonBox}>
                        <Button style={styles.button} title = "Reset" onPress = {this.resetTimer}/>                        
                    </View>
                </View>
            );
        }
    }
}

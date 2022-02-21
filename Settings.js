import {StyleSheet, TextInput, View, Button, Text, KeyboardAvoidingView} from 'react-native';
import React from 'react';

let wt = 25;
let bt = 5;

const styles = StyleSheet.create({
    settingsBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#db325a',
        width: '100%',
    },

    input: {
        fontSize: 24,
        borderColor: 'black',
        borderBottomWidth: 1,
        width: 30,
    },

    inputBox: {
        marginTop: 25,
        flexDirection:'row',
    },

    inputText: {
        fontSize: 24,
    },

    settext: {
        fontSize: 48,
        justifyContent: 'center',
        textAlign: 'center',
    },
})

export default class Settings extends React.Component {
    state = {
        worktime: wt,
        breaktime: bt,
    }

    handleWorkChange = worktime => {
        if (+worktime >= 0 && +worktime <= 99)
            this.setState({worktime})
    }

    handleBreakChange = breaktime => {
        if (+breaktime >= 0 && +breaktime <= 99)
            this.setState({breaktime})
    }

    validate = () => {
        if (+this.state.worktime > 0 && +this.state.breaktime > 0) return true;
        return false;
    }

    handleSubmit = () => {
        if (this.validate()) {
            this.props.onSubmit({worktime: this.state.worktime*60, breaktime: this.state.breaktime*60})
        }
    }

    componentWillUnmount() {
        wt = this.state.worktime
        bt = this.state.breaktime
    }

    render () {
        return (
            <KeyboardAvoidingView style={styles.settingsBox} behavior='padding'>
                <Text style={styles.settext}>Change Timer Settings</Text>
                <View style={styles.inputBox}>
                    <Text style={styles.inputText}>Working time: </Text>
                    <TextInput 
                        style={styles.input}
                        value={`${this.state.worktime}`}
                        placeholder='25'
                        onChangeText={this.handleWorkChange}
                        keyboardType='numeric'
                    />
                    <Text style={styles.inputText}> min.</Text>
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.inputText}>Break time: </Text>
                    <TextInput 
                        style={styles.input}
                        value={`${this.state.breaktime}`}
                        placeholder='5'
                        onChangeText={this.handleBreakChange}
                        keyboardType='numeric'
                    />
                    <Text style={styles.inputText}> min.</Text>
                </View>

                <View style={styles.inputBox}>
                    <Button title='Save Changes' onPress={this.handleSubmit} disabled={!this.validate()}/>
                </View>             
            </KeyboardAvoidingView>
        );
    }
}
import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeElapsed: null,
      running: null,
      startTime: null,
      laps: [],
    };
    this.handleStartPress = this.handleStartPress.bind(this);
    this.startStopButton = this.startStopButton.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
  }
  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    this.setState({startTime: new Date()});
  
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true,
      })
    }, 30);
  }
  handleLapPress() {
    var lap =  this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  }
  startStopButton() {
    var style = this.state.running
    ? styles.stopButton
    : styles.startButton;
    return <TouchableHighlight underlayColor='gray'
    onPress={this.handleStartPress} style={[styles.button, style]}>
      <Text>
        {this.state.running
        ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  }
  lapButton() {
    return <TouchableHighlight style={styles.button} 
    underlayColor='gray' onPress={this.handleLapPress}>
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  }
  laps() {
    return this.state.laps.map(function(time, index){
      return <View key={index} style={styles.lapItem}>
        <Text style={styles.lapText}>
          Lap #{index + 1} :
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  }
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timeWrapper}>
            <Text style={styles.timer}>{formatTime(this.state.timeElapsed)}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            {/* <TouchableHighlight style={styles.button} underlayColor="green" onPress={this.handleStartPress}>
              <Text style={styles.button}>Start</Text>
            </TouchableHighlight> */}
            {this.startStopButton()}
            {/* <TouchableHighlight style={styles.button} underlayColor="green" onPress={this.handleLapPress}>
              <Text style={styles.button}>Lap</Text>
            </TouchableHighlight> */}
            {this.lapButton()}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.lap}>
            {/* <Text style={styles.lapText}>
              Lap #2
            </Text>
            <Text style={styles.lapText}>
              00:00.00
            </Text>
          </View>
          <View style={styles.lap}>
            <Text style={styles.lapText}>
              Lap #1
            </Text>
            <Text style={styles.lapText}>
              00:00.00
            </Text> */}
            <ScrollView>
            {this.laps()}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 100,
  },
  timeWrapper:{
    alignItems: 'center',
    justifyContent: 'center',
    flex:5,
  },
  buttonWrapper:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginTop: 20,
    flex:3,
  },
  lap:{
    flexDirection:'column',
    justifyContent:'space-around',
    backgroundColor:'lightgrey',
    marginTop: 20,
  },
  timer:{
    fontSize: 60,
    fontWeight:'bold',
  },
  header:{
    flex:1,
  },
  footer: {
    flex:1,
  },
  button: {
    borderColor:'black',
    borderWidth:2,
    padding: 40,
    borderRadius: 60,
    height: 120,
    width: 120,
    fontSize: 17,
    fontWeight:'bold',
    justifyContent:'center',
    alignItems:"center",
  },
  lapText: {
    fontSize: 30,
  },
  startButton: {
    borderColor:'green',
  },
  stopButton: {
    borderColor:'red',
  },
  lapItem: {
    flexDirection:'row',
    marginTop: 10,
  }
});

export default App;
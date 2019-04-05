import React, { Component } from 'react'
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Image, AsyncStorage
  } from 'react-native'
import moment from 'moment'
import { AppInputField, AppSuccessButton } from '../../components';
import { 
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';
import HomeIcon from '../../assets/images/homeicon.png'
import PhoneIcon from '../../assets/images/mobileicon.jpeg'
import Home from '../containers/home/home';
 
function Timer({ interval, style}) {
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  return (
    <View style={styles.timerView}>
      <Text style={style}>{pad(duration.hours())}hr</Text>
      <Text style={style}>{pad(duration.minutes())}m</Text>
      <Text style={style}>{pad(duration.seconds())}s</Text>
    </View>
  )
}

function TodayGMT({ interval, style, mins }) {
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)

  const hours = 0
  const actualmins = parseFloat(pad(duration.minutes()))+mins
  const minute=0;

  if( actualmins > 60 ){
    minute = actualmins - 60
    hours = hours + 1
  }
  return (
    <View style={styles.todayTimer}>
      <Text style={style}>{parseFloat(pad(duration.minutes()))+mins}:</Text>
      <Text style={style}>{parseFloat(pad(duration.hours()))} hrs</Text>
    </View>
  )
}

function WeekGMT({ interval, style ,mins }) {
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds() / 10)
  return (
    <View style={styles.weekTimer}>
      <Text style={style}>{parseFloat(pad(duration.minutes()))+mins}:</Text>
      <Text style={style}>{pad(duration.seconds())}</Text>
      <Text style={style}> of </Text>
      <Text style={style}>{pad(duration.hours())} hr</Text>
    </View>
  )
}

function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[ styles.button, { backgroundColor: background }]}
      activeOpacity={disabled ? 1.0 : 0.7}
    >
        <Text style={[ styles.buttonTitle, { color }]}>{title}</Text>
    </TouchableOpacity>
  )
}

function ButtonsRow({ children }) {
  return (
    <View style={styles.buttonsRow}>{children}</View>
  )
}
export default class TimerClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: 0,
      now: 0,
      laps: [ ],
      timerValue:0,
      timerSeconds:0,
      timerMinutes:0,
      timerHours:0
    }
  }

  componentWillMount(){

    // AsyncStorage.getItem('start').then((response) => {
    //   let res= JSON.parse(response);
    //   console.log('start valuee ==>', res);
    // });

    AsyncStorage.getItem('timer').then((response) => {
      let res= JSON.parse(response);
      console.log('timerValue ==>', res);

      const time = res.split(':');
      this.setState({timerMinutes:parseInt(time[0])},
        this.setState({timerSeconds:parseInt(time[1])},
          console.log('timersec state',this.state.timerSeconds,'timermins state', this.state.timerMinutes)))
    });
    // AsyncStorage.getItem('now').then((response) => {
    //   let res= JSON.parse(response);
    //   console.log('now ==>', res);
    // });
    // AsyncStorage.getItem('laps').then((response) => {
    //   let res= JSON.parse(response);
    //   console.log('laps ==>', res);
    // });

  }

  componentWillUnmount() {
    AsyncStorage.setItem('timerValue',JSON.stringify(this.state.timerValue));
    AsyncStorage.setItem('start',JSON.stringify(this.state.start));
    AsyncStorage.setItem('now',JSON.stringify(this.state.now));
    AsyncStorage.setItem('laps',JSON.stringify(this.state.laps));
    console.log('set success');
    this.props.setTimerValue(this.state.timerValue);
  }

  componentWillReceiveProps(props) {

    console.log('check2')
    if (props.isTimerSet) {
        AsyncStorage.getItem('timer').then((response) => {
            let res= JSON.parse(response);
            console.log('response from componentWillReceiveProps ==>', res);
          });
    }
}

  start = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
      laps: [0],
    })
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }

  stop = () => {
    clearInterval(this.timer)
    const { laps, now, start } = this.state
    const timer = now - start
    const pad = (n) => n < 10 ? '0' + n : n
    const interval = laps.reduce((total, curr) => total + curr, 0) + timer;
    const duration = moment.duration(interval);
    const seconds = pad(duration.seconds());
    const minutes = pad(duration.minutes());
    console.log('seconds =>' , seconds)
    console.log('minutes =>' , minutes)

    this.setState({timerValue: minutes + ':'+ seconds},
    ()=>console.log('minute seconds =>>', this.state.timerValue))
    
    const [firstLap, ...other] = laps
    this.setState({
      laps: [firstLap + now - start, ...other],
      start: 0,
      now: 0,
    })
    this.setTimer();
  }

  reset = () => {
    this.setState({
      laps: [],
      start: 0,
      now: 0,
    })
  }
  resume = () => {
    const now = new Date().getTime()
    this.setState({
      start: now,
      now,
    })
    this.timer = setInterval(() => {
      this.setState({ now: new Date().getTime()})
    }, 100)
  }

  setTimer() {
    console.log(this.props);
    console.log('JSON.stringify(this.state.timerValue)', JSON.stringify(this.state.timerValue))
    AsyncStorage.setItem('timer',JSON.stringify(this.state.timerValue));

    this.props.setTimerValue(this.state.timerValue);

    AsyncStorage.getItem('timer').then((response) => {
      let res= JSON.parse(response);
      console.log('es from settimer => ', response);
    });
    
  }
  
  render() {
    const { now, start, laps } = this.state
    const timer = now - start
    return (
      <View style={styles.container}>
        <View style = { styles.header }>
          <Text style = { styles.headerFirstText }>FINISHER TIME TRACKING</Text>
          <Text style = { styles.headerSecondText }>Painter Hourly Job</Text>
        </View>
        <View style = { styles.timerContainer }>
          <Text style = { styles.currentSessionText }>
            Current Session
          </Text>
          <Timer
            interval={laps.reduce((total, curr) => total + curr, 0) + timer}
            style={styles.timer}
          />
        </View>
        <View style = { styles.timerDetails }>
          <View style={styles.todayView}>
            <Text style = { styles.todayTimerText }>Today (Mon GMT)</Text>
            <TodayGMT
            interval={laps.reduce((total, curr) => total + curr, 0) + timer}
            style = { styles.todayTimerView }
            mins={this.state.timerMinutes}
            />
          </View>
          <View style={styles.todayView}>
            <Text style = { styles.weekTimerText }>This week (GMT)</Text>
            <WeekGMT
            interval={laps.reduce((total, curr) => total + curr, 0) + timer}
            style = { styles.weekTimerView }
            mins={this.state.timerMinutes}
            />
          </View>
        </View>
        {laps.length === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Pause'
              color='#FFFFFF'
              background='#3D3D3D'
              disabled
            />
            <RoundButton
              title='Start'
              color='#FFFFFF'
              background='#64BB59'
              onPress={this.start}
            />
          </ButtonsRow>
        )}
        {start > 0 && (
          <ButtonsRow>
            <RoundButton
              title='Pause'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.stop}
            />
            <RoundButton
              title='Stop'
              color='#FFFFFF'
              background='#EB4933'
              onPress={this.stop}
            />
          </ButtonsRow>
        )}
        {laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Reset'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.reset}
            />
            <RoundButton
              title='Start'
              color='#FFFFFF'
              background='#53E142'
              onPress={this.resume}
            />
          </ButtonsRow>
        )}
          <TextInput
          placeholder = 'What are you working on?'
          style = { styles.input }
          />
          <View style = { styles.customerInfo }>
            <Text style = { styles.customerInfoText }>CUSTOMER INFO :</Text>
            <Text style = { styles.customerName }>ADNAN SHUJA</Text>
          </View>
          <View style={{width:wp('100%'), height:hp('0.2%') , backgroundColor:'#02abb0'}}></View>
          <View>
            <View style = { styles.providerDetails }>
              <Image
                source={HomeIcon}
                style = {{ width:wp('7%'), height:hp('4%') }}
              />
              <Text style = {{color:'#02abb0',fontWeight:'500', marginLeft:'3%'}}>Micronox, Blue Area, Islamabad, Pakistan</Text>
            </View>
            <View  style = { styles.providerDetails }>      
              <Image
                source={PhoneIcon}
                style = {{ width:wp('7%'), height:hp('4%') }}
              />
              <Text style = {{color:'#02abb0',fontWeight:'500', marginLeft:'3%'}}>090078601</Text>
              </View>
          </View>
          <View style = { styles.bottomButtonView }>
            <TouchableOpacity style = { styles.bottomButton }>
              <Text style = { styles.bottomButtonText}>View Work Diary</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[ styles.bottomButton , { paddingRight:'10%' }]}>
              <Text style = {[ styles.bottomButtonText , { borderColor:'#02abb0', borderWidth:3, borderRadius:5 }]}>Complete Contract</Text>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius:10
  },
  button: {
    width: wp('35%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight:'800'
  },
  buttonsRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 10,
  },
  timerView: {
    flexDirection: 'row'
  },
  historyContainer:{
    width:wp('50%'),
    height:hp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius : 15,
    marginTop:20
  },
  header:{
    justifyContent:'flex-start',
    width:wp('100%'),
    height:hp('8%'),
    alignItems:'center',
    borderWidth:1,
    borderColor:'#02abb0'
  },
  headerFirstText:{
    fontSize:21,
    fontWeight:'bold',
    color:'#02abb0'
  },
  headerSecondText:{
    fontSize:17,
    fontWeight:'500'
  },
  timerContainer:{
    width:wp('100%'),
    height:hp('15'),
    marginLeft:'15%',
    marginTop:'5%'
  },
  currentSessionText:{
    fontSize:20,
    fontWeight:'500',
    color:'#02abb0'
  },
    timer: {
    fontSize: 30,
    fontWeight: '700',
    width: 70,
    color:'#3FAE5F'
  },
  timerDetails:{
    flexDirection:'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    width:wp('100%')
  },
  todayTimer:{
    flexDirection: 'row'
  },
  weekTimer:{
    flexDirection: 'row'
  },
  todayTimerView:{
    fontSize: 25,
    fontWeight: '500'
  },
  weekTimerView:{
    fontSize: 25,
    fontWeight: '500'
  },
  todayView:{
    width:wp('50%')
  },
  todayTimerText:{
    fontSize: 17,
    fontWeight: '600',
    color:'#A7A0A0'
  },
  weekTimerText:{
    fontSize: 17,
    fontWeight: '600',
    color:'#EB4933'
  },
  input:{
    width:wp('90%'),
    justifyContent:'center',
    height:hp('8%'),
    borderWidth:3,
    borderColor:'#A7A0A0',
    borderRadius:5,
    padding:'2%'
  },
  customerInfo:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:'8%'
  },
  customerInfoText:{
    fontSize:21,
    fontWeight:'bold',
    color:'#02abb0'
  },
  customerName:{
    fontSize:20,
    fontWeight:'600'
  },
  providerDetails:{
    flexDirection:'row',
    marginTop:'3%'
  },
  bottomButtonView:{
    flexDirection:'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    width:wp('100%'),
    marginTop:'5%'
  },
  bottomButton:{
    width: wp('50%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5
  },
  bottomButtonText:{
    fontSize: 15,
    fontWeight:'800',
    padding:'5%',
    color:'#02abb0',
    alignItems:'center',
    justifyContent:'center'
  }
})
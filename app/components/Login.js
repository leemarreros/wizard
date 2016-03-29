'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import FBSDKCore from 'react-native-fbsdkcore';
import FBSDKLogin from 'react-native-fbsdklogin';

import House from  './House';
import NavigationBarCom from  './NavigationBarCom';

import {restUrl, brandFont, brandColor, backgroundClr, navigationBar, buttonNavBar} from '../utils/globalVariables';
import {requestHelper, } from '../utils/dbHelper';

var EventEmitter = require('EventEmitter');
var window = Dimensions.get('window');

var {
  FBSDKLoginManager,
} = FBSDKLogin;

var {
  FBSDKAccessToken,
  FBSDKGraphRequest
} = FBSDKCore;

let {
  AppRegistry,
  StyleSheet,
  PixelRatio,
  NavigatorIOS,
  Text,
  AlertIOS,
  StatusBar,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Textinput
} = React;

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSideMenu: false,
      houseData: null,
    };
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content');
    this.eventEmitter = new EventEmitter();
    this.opened = false;
  }
  
  alertIOS(title, message) {
    AlertIOS.alert(title, message,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  onBurguerMenuPress(bool) {
    if (!this.opened) {
      this.eventEmitter.emit('burguerBtnEvent', true);
      this.opened = true;
    } else {
      this.eventEmitter.emit('burguerBtnEvent', false);
    }
    if (!bool) {
      this.opened = false;
      this.eventEmitter.emit('burguerBtnEvent', false);
    }
  }

  switchToHouse() {
    this.props.navigator.push({
      component: House,
      events: this.eventEmitter,
      houseData: this.state.houseData,
      onBurguerMenuPress: this.onBurguerMenuPress.bind(this),
      onLogOutPress: this.onLogOutPress.bind(this),
      navigationBar: (
        <NavigationBarCom 
            title={'HOUSE'}
            onBurguerMenuPress={this.onBurguerMenuPress.bind(this)}/>
      )
    });
  }

  async getAccesToken() {
    var responseToken = await (FBSDKAccessToken.getCurrentAccessToken((token) => {
      
      if(!token) {
        console.log('No token founded');
        return;
      }
      
      let fetchProfileRequest = new FBSDKGraphRequest((error, userInfo) => {
        if (error) {
          console.warn('FBSDKGraphRequest', error);
          this.alertIOS('Error logging in', 'Please try again!');
          return;
        }
        this.props.route.setUserInformation(userInfo);

        var url = `${restUrl}/api/authfb`;
        var body = {
          firstname: userInfo.first_name,
          lastname: userInfo.last_name,
          picture: `https://graph.facebook.com/${userInfo.id}/picture?height=400`,
          fbId: userInfo.id
        };
        fetch(requestHelper(url, body, 'POST'))
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({houseData: responseData.houseData}, function(){
                this.switchToHouse();
            })
        })
        .done();
        
      }, 'me?fields=first_name,last_name');

      fetchProfileRequest.start(0);
    }));
  }

  onFbSignInPress() {
     FBSDKLoginManager.logInWithReadPermissions([], (error, result) => {
      if (error) {
        alert('Error logging in.');
      } else {
        if (result.isCancelled) {
          alert('Login cancelled.');
        } else {
          this.getAccesToken();
        }
      }
    });
  }

  onLogOutPress() {
    FBSDKLoginManager.logOut();
    this.props.navigator.popToTop();
  }

  componentDidMount() {
    // this.getAccesToken();
  }

  render() {

    return (
      <Image
        source={require('../img/bckFront-wizard.png')}   
        style={styles.background}>
        
        <View style={styles.loginScreen}>
        
            <View style={styles.brandWrap}>
                <Text style={styles.titleApp}>WIZARD!</Text>
                <Text style={styles.description}>keep the count of what matters at home</Text>
            </View>

            <TouchableHighlight
                onPress={this.onFbSignInPress.bind(this)}
                style={styles.loginButton}>
                <View style={styles.wrapperInsideBtn}>
                    <Image source={require('../img/fb-icon.png')}/>
                    <Text style={styles.textButton}>LOGIN WITH FACEBOOK</Text>
                </View>
            </TouchableHighlight>
                
            <View style={styles.wrapperTerms}>
                <Text style={styles.terms}>
                    By clicking Sign Up you are agreeing to the <Text style={{color: brandColor}}>Terms of use</Text> and <Text style={{color: brandColor}}>Privacy Policy</Text>.
                </Text>
            </View>
        </View>
        
      </Image>
    );
  }
}

var styles = StyleSheet.create({
  background: {
    flex: 1,  
  },
  loginScreen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    width: window.width * 0.8,
    justifyContent: 'space-around',
    marginTop: 100
  },
  navigator: {
    backgroundColor: 'yellow',
    width: window.width,
    borderColor: 'black',
    borderWidth: 10
  },
  description: {
    fontFamily: 'Avenir-Book',
    fontSize: 21,
    textAlign: 'center',
    paddingTop: 30,
    color: brandColor,
    width: 200,
  },
  titleApp: {
      fontFamily: brandFont,
      fontSize: 80,
      color: brandColor,
  },
  loginButton: {
    width: window.width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    shadowColor: 'black',
    marginTop: 35,
    backgroundColor: brandColor,
    height: 55
  },
  textButton: {
    fontFamily: 'Avenir-Black',
    color: 'white',
    fontSize: 13,
    marginLeft: 20
  },
  wrapperInsideBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  wrapperTerms: {
    width: window.width * 0.75,
  },
  terms: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: 'Avenir-Roman',
    fontSize: 13,
    color: 'white',
    marginBottom: 30
  },
});

module.exports = Login;
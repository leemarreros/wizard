'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import MakerDashboard from '../components/sideMenuButtoms/MakerDashboard';
import NavigationBar from 'react-native-navbar';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  AlertIOS,
  TouchableOpacity,
  Image
} = React;

export default class SideMenuLeft extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onLogOutPress() {
    AlertIOS.alert('Loggin out!', 'Are you sure?',
      [
        {text: 'Yes please!', onPress: () => this.props.onLogOutPress()},
        {text: 'Just kidding!', onPress: () => {}}
      ],
      'secure-text'
    )
  }

  componentWillMount() {
  }

  onBurguerMenuPress() {
    this.props.navigator.pop();
  }

  handleButtonPress(Component, title) {
    this.props.navigator.push({
      component: Component,
      navigationBar: (
        <NavigationBar
          title={<Text style={{color: 'white', fontFamily: 'Avenir', fontWeight: 'bold'}}>{title}</Text>}
          style={styles.navigationBar}
          tintColor={'#285DA1'}
          statusBar={{style: 'light-content', hidden: false}}
          leftButton={
            <TouchableOpacity
              style={styles.buttonNavBar}
              onPress={this.onBurguerMenuPress.bind(this)}>
              <Image
                source={require('../img/back-icon.png')}
                style={[{ width: 15, height: 15}]}/>
            </TouchableOpacity>
          }/>
      )
    });
  }

  render() {
    return (
      <View style={styles.sideMenu}>
        <View style={styles.userInfo}>
          {!!this.props.userInfo ?
            <View style={styles.wrapperTop}>
              <View style={styles.wrapperPic}>
                  <Image style={styles.picProfile} source={{uri: this.props.userInfo.picture}}/>
              </View>
              <View style={styles.wrapperT}>
                <Text style={styles.textTop}>{this.props.userInfo.name}</Text>
                { !!this.props.userInfo.username ?
                  <Text style={styles.textTop}> {this.props.userInfo.username}</Text> :<Text style={styles.textTop}>Create a username</Text>}
              </View>
            </View>
            :
            null
          }
        </View>
        <View style={styles.wrapperButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleButtonPress.bind(this, MakerDashboard, 'I AM A MAKER')}>
            <Text style={styles.buttonText}>I am a Maker</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.logOutWrap}
          onPress={this.onLogOutPress.bind(this)}>
          <Image style={styles.logOutButton} source={require('../img/log-out-icon.png')}/>
          <Text style={styles.logOutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttonNavBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    paddingBottom: 12,
  },
  navigationBar: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    height: 42,
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logOutText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5
  },
  logOutButton: {
    width: 20,
    height: 20,
    marginRight: 5
  },
  logOutWrap: {
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  textTop: {
    fontFamily: 'Avenir',
    fontSize: 11
  },
  wrapperTop: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperPic: {
    flex: 2,
    width: 79.5,
  },
  wrapperT: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picProfile: {
    borderRadius: 79.5/2,
    flex: 1,

  },
  userInfo: {
    flex: 3.3,
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    marginBottom: 15,
  },
  wrapperButtons: {
    flex: 10,
  },
  sideMenu: {
    backgroundColor: 'white',
    width: window.width/2,
    height: window.height-64,
    borderRightWidth: 0.5,
    borderRightColor: 'grey'
  }
});

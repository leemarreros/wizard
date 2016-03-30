'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import {restUrl, brandFont, brandColor, backgroundClr, navigationBar, buttonNavBar} from '../utils/globalVariables';

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

export default class TabManager extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (this.props.onLogout) {
            return (
                <NavigationBar
                    title={{title: this.props.title, tintColor: 'white'}}
                    style={navigationBar}
                    tintColor='#2981E8'
                    statusBar={{style: 'light-content', hidden: false}}
                    leftButton={
                        <TouchableOpacity
                            style={buttonNavBar}
                            onPress={()=> {this.props.onLogOutPress()}}>
                        <Text style={styles.cancel}>Logout</Text>
                        </TouchableOpacity>
                    }/>
            );
        }
        
        if (this.props.onBackBtnPress) {
            return (
                <NavigationBar
                    title={{title: this.props.title, tintColor: 'white'}}
                    style={navigationBar}
                    tintColor='#2981E8'
                    statusBar={{style: 'light-content', hidden: false}}
                    leftButton={
                        <TouchableOpacity
                            style={buttonNavBar}
                            onPress={()=>{this.props.navigator.pop()}}>
                        <Image
                        source={require('../img/back-icon.png')}
                        style={[{ width: 20, height: 15}]}/>
                        </TouchableOpacity>
                    }/>
            );
        }
        return (
            <NavigationBar
                title={{title: this.props.title, tintColor: 'white'}}
                style={navigationBar}
                tintColor='#2981E8'
                statusBar={{style: 'light-content', hidden: false}}
                leftButton={
                    <TouchableOpacity
                        style={buttonNavBar}
                        onPress={()=>{this.props.navigator.pop()}}>
                            <Text style={styles.cancel}>Cancel</Text>
                    </TouchableOpacity>
                }/>
        );
    }
}

var styles = StyleSheet.create({
    cancel: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Avenir-Heavy'
    }
});
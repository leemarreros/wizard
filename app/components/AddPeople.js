'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import SideMenu from 'react-native-side-menu';

import {restUrl, brandFont, brandColor, backgroundClr, titleForm, navigationBar, buttonNavBar} from '../utils/globalVariables';
import {requestHelper, } from '../utils/dbHelper';

let {
  StyleSheet,
  PixelRatio,
  NavigatorIOS,
  Text,
  AlertIOS,
  ActivityIndicatorIOS,
  StatusBar,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Textinput
} = React;

export default class AddPeople extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savingData: false,
            animatingPos: false,
            firstname: '',
            lastname: '',
            email: '',
            age: '',
            male: false,
            female: false
        };
    }
    
    handleGenderSelection(option) {
        if (option === 'male') {
            this.setState({
                male: true,
                female: false
            })
            return;
        }
        if (option === 'female') {
            this.setState({
                female: true,
                male: false
            })
            return;
        }
    }
    
    handleSavePress() {
        this.setState({savingData: true});
        var url = `${restUrl}/api/createperson`;
        var body = {};
        body.fbId = this.props.userInfo.id;
        !!this.state.firstname ? body.firstname = this.state.firstname : null;
        !!this.state.lastname ? body.lastname = this.state.lastname : null;
        !!this.state.email ? body.email = this.state.email : null;
        !!this.state.age ? body.age = this.state.age : null;
        this.state.male ? body.gender = 'male' : null;
        this.state.female ? body.gender = 'female' : null;
        fetch(requestHelper(url, body, 'POST'))
        .then((response) => response.json())
        .then((responseData) => {
            this.props.route.updatePeopleData();
            this.setState({savingData: false});
            this.props.navigator.pop();
        })
        .done();
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor: backgroundClr}}>
                
                <View style={styles.wrapTitleF}>
                    <Text style={[titleForm, {fontSize: 54}]}>Who's this person?</Text>
                </View>
                
                <View style={styles.titleFieldBar}>
                    <View style={{flex: 1}}>
                        <Text style={styles.fieldName}>PERSONAL INFORMATION</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <ActivityIndicatorIOS
                            animating={this.state.animatingPos}
                            style={{height: 20}}
                            size="small"/>
                        <TouchableOpacity
                            onPress={()=>{}}
                            style={{flex: 1}}>
                            <Text
                            style={[styles.fieldName, {textAlign: 'right', marginRight: 15, fontWeight: 'bold'}]}>
                                GET FROM FACEBOOK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                <View style={styles.fieldContainer}>
                    <View style={{flex: 1, borderLeftColor: '#D1D1D1', borderLeftWidth: 0.5}}>
                    <TextInput
                        value={this.state.firstname}
                        style={styles.inputBox}
                        placeholderTextColor={'#DADADA'}
                        placeholder="First Name*"
                        onChangeText={(firstname) => this.setState({firstname})}/>
                    </View>
                    <View style={{flex: 1}}>
                    <TextInput
                        value={this.state.lastname}
                        style={styles.inputBox}
                        placeholderTextColor={'#DADADA'}
                        placeholder="Last Name"
                        onChangeText={(lastname) => this.setState({lastname})}/>
                    </View>
                </View>
                
                <View style={styles.fieldContainer}>
                    <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
                    <TextInput
                        value={this.state.email}
                        style={styles.inputBox}
                        placeholder="E-mail"
                        placeholderTextColor={'#DADADA'}
                        onChangeText={(email) => this.setState({email})}/>
                    </View>
                </View>
                
                <View style={styles.fieldContainer}>
                    <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
                    <TextInput
                        value={this.state.age}
                        style={styles.inputBox}
                        placeholder="Age"
                        keyboardType={'numeric'}
                        placeholderTextColor={'#DADADA'}
                        onChangeText={(age) => this.setState({age})}/>
                    </View>
                </View>
                
                <View style={styles.titleFieldBar}>
                    <View style={{flex: 1}}>
                        <Text style={styles.fieldName}>GENDER</Text>
                    </View>
                </View>
                
                <View style={styles.wrapperGender}>
                    <View style={styles.wrapperContent}>
                        <TouchableOpacity
                            style={[styles.makeOpt, this.state.male ? styles.maleSelected : null]}
                            onPress={this.handleGenderSelection.bind(this, 'male')}>
                        </TouchableOpacity>
                        <Text style={styles.genderTxt}>MALE</Text>
                    </View>
                    <View style={styles.wrapperContent}>
                        <TouchableOpacity
                            style={[styles.makeOpt, this.state.female ? styles.femaleSelected : null]}
                            onPress={this.handleGenderSelection.bind(this, 'female')}>
                        </TouchableOpacity>
                        <Text style={styles.genderTxt}>FEMALE</Text>
                    </View>
                </View>
                
                <TouchableOpacity
                    onPress={this.handleSavePress.bind(this)} 
                    style={styles.buttonSave}>
                    <View style={styles.btnContent}>
                        <Text style={styles.btnSaveText}>SAVE</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        );
    }
}

var styles = StyleSheet.create({
  wrapTitleF: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 15
  },
  titleFieldBar: {
    alignItems: 'center',
    width: window.width,
    height: 43,
    backgroundColor: brandColor,
    flexDirection: 'row'
  },
  fieldName: {
    fontFamily: 'Avenir-Heavy',
    fontSize: 11,
    marginLeft: 13,
    textAlign: 'left',
    color: 'white'
  },
  fieldContainer: {
    alignItems: 'center',
    width: window.width,
    height: 43,
    flexDirection: 'row'
  },
  inputBox: {
    height: 43,
    fontFamily: 'Avenir-Medium',
    fontWeight: "100",
    fontStyle: 'italic',
    fontSize: 13,
    paddingLeft: 13,
    textAlign: 'left',
    color: 'white'
  },
  wrapperGender: {
      marginTop: 15,
      flexDirection: 'row',
  },
  wrapperContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  makeOpt: {
      width: 27,
      height: 27,
      borderRadius: 27/2,
      borderColor: 'white',
      borderWidth: 1,
      marginRight: 5.
  },
  genderTxt: {
      marginLeft: 5,
      color: 'white',
      fontFamily: 'Avenir-Medium'
  },
  maleSelected: {
      backgroundColor: '#2D2BE6'
  },
  femaleSelected: {
      backgroundColor: '#FF4BF4'
  },
  buttonSave: {
    alignItems: 'center',
    width: window.width,
    height: 43,
    backgroundColor: '#2981E8',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 167,
    borderTopWidth: 2,
    borderTopColor: 'white'
  },
  btnContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  btnSaveText: {
      fontFamily: 'Avenir',
      color: 'white',
      textAlign: 'center',
      fontSize: 17,
  },
});
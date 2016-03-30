'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';

import {restUrl, brandFont, brandColor, backgroundClr, titleForm, navigationBar, buttonNavBar} from '../utils/globalVariables';
import {requestHelper, } from '../utils/dbHelper';

var window = Dimensions.get('window');

let {
  StyleSheet,
  PixelRatio,
  NavigatorIOS,
  Text,
  AlertIOS,
  ActivityIndicatorIOS,
  StatusBar,
  View,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Textinput
} = React;

export default class AddCars extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        savingData: false,
        make: '',
        model: '',
        year: '',
        licenseplate: '',
        owner: '',
        people: this.props.route.people,
        personId: null
    };
  }
  
  resetActiveButtons() {
      this.activeButtons = this.state.people.map(()=>false);
  }
  
  componentWillMount() {
      this.resetActiveButtons();
  }
  
  handleActiveButtons(i) {
      return this.activeButtons[i];
  }

  onOwnerPressed(person, i) {
      this.resetActiveButtons();
      this.activeButtons[i] = true;
      var owner = `${person.firstname} ${person.lastname}`;
      this.setState({owner, personId: person._id});
  }
  
  handleSavePress() {
        this.setState({savingData: true});
        var url = `${restUrl}/api/createcar`;
        var body = {};
        body.fbId = this.props.userInfo.id;
        !!this.state.make ? body.make = this.state.make : null;
        !!this.state.model ? body.model = this.state.model : null;
        !!this.state.year ? body.year = this.state.year : null;
        !!this.state.licenseplate ? body.licenseplate = this.state.licenseplate : null;
        !!this.state.owner ? body.owner = this.state.owner : null;
        !!this.state.personId ? body.personId = this.state.personId : null;

        fetch(requestHelper(url, body, 'POST'))
        .then((response) => response.json())
        .then((responseData) => {
            this.props.route.updateCarsData();
            this.setState({savingData: false});
            this.props.navigator.pop();
        })
        .done();
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: backgroundClr}}>
        
            <View style={styles.wrapTitleF}>
                <Text style={[titleForm, {fontSize: 52}]}>What type of car?</Text>
            </View>
            
            <View style={styles.titleFieldBar}>
                <View style={{flex: 1}}>
                    <Text style={styles.fieldName}>CAR DETAILS</Text>
                </View>
            </View>
            
            <View style={styles.fieldContainer}>
                <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
                <TextInput
                    value={this.state.make}
                    style={styles.inputBox}
                    placeholder="Make"
                    placeholderTextColor={'#DADADA'}
                    onChangeText={(make) => this.setState({make})}/>
                </View>
            </View>
            
            <View style={styles.fieldContainer}>
                <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
                <TextInput
                    value={this.state.model}
                    style={styles.inputBox}
                    placeholder="Model"
                    placeholderTextColor={'#DADADA'}
                    onChangeText={(model) => this.setState({model})}/>
                </View>
            </View>
            
            <View style={styles.fieldContainer}>
                <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
                <TextInput
                    value={this.state.year}
                    style={styles.inputBox}
                    placeholder="Year"
                    placeholderTextColor={'#DADADA'}
                    onChangeText={(year) => this.setState({year})}/>
                </View>
            </View>
            
            <View style={styles.fieldContainer}>
                <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
                <TextInput
                    value={this.state.licenseplate}
                    style={styles.inputBox}
                    placeholder="License Plate"
                    placeholderTextColor={'#DADADA'}
                    onChangeText={(licenseplate) => this.setState({licenseplate})}/>
                </View>
            </View>
            
            <View style={styles.titleFieldBar}>
                <View style={{flex: 1}}>
                    <Text style={styles.fieldName}>OWNER</Text>
                </View>
            </View>
            
            <ScrollView
                scrollEventThrottle={200}
                style={styles.scrollView}>
                
                <View style={styles.wrapperOwners}>
                    {this.state.people.map((person, i) => {
                        return (
                            <View key={i} style={styles.container}>
                                <TouchableOpacity 
                                    onPress={this.onOwnerPressed.bind(this, person, i)}
                                    style={[styles.btnSelectOwner, this.handleActiveButtons(i) ? styles.active : null]}>
                                </TouchableOpacity>
                                <Text style={styles.ownerName}>{person.firstname} {person.lastname}</Text>
                            </View>
                        );
                    })}
                </View>
                
            </ScrollView>
            
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
  scrollView: {
      width: window.width,
  },
  wrapperOwners: {
      flexDirection: 'row',
      flexWrap: 'wrap',
  },
  container: {
      width: window.width/2,
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 18
  },
  btnSelectOwner: {
      width: 39,
      height: 39,
      borderRadius: 39/2,
      borderWidth: 1,
      borderColor: 'white',
      marginLeft: 15
  },
  active: {
      backgroundColor: brandColor
  },
  ownerName: {
      fontFamily: 'Avenir-Medium',
      color: 'white',
      paddingLeft: 5
  },
  buttonSave: {
    position: 'absolute',
    alignItems: 'center',
    width: window.width,
    height: 43,
    backgroundColor: '#2981E8',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
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

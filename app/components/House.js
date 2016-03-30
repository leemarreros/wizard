'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import Geocoder from 'react-native-geocoder';

import People from  './People';
import NavigationBarCom from  './NavigationBarCom';
import {restUrl, brandFont, brandColor, backgroundClr, titleForm, navigationBar, buttonNavBar} from '../utils/globalVariables';
import {requestHelper, } from '../utils/dbHelper';

var window = Dimensions.get('window');

let {
  TabBarIOS,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  SliderIOS,
  AlertIOS,
  TouchableOpacity,
  ActivityIndicatorIOS
} = React;

export default class House extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSideMenu: false,
      animatingPos: false,
      savingData: false,
      address: this.props.route.houseData.address || '',
      zipcode: this.props.route.houseData.zipcode || '',
      city: this.props.route.houseData.city || '',
      state: this.props.route.houseData.state || '',
      bedrooms: this.props.route.houseData.bedrooms || 1,
    };
  }
  
  componentWillMount() {
    this.addressIn = this.props.route.houseData.address || '';
    this.zipcodeIn = this.props.route.houseData.zipcode || '';
    this.cityIn = this.props.route.houseData.city || '';
    this.stateIn = this.props.route.houseData.state || '';
    this.bedroomsIn = this.props.route.houseData.bedrooms || 1;
  }


  onPressCurrentPosition(count) {
    this.setState({animatingPos: true});
    navigator.geolocation.getCurrentPosition((userPosition) => {
        var coords = {
          latitude: userPosition.coords.latitude,
          longitude: userPosition.coords.longitude,
        }
        Geocoder.reverseGeocodeLocation(coords, (err, data) => {
          if (err) { console.log(err); return;}
          this.setState({
            address: data[0].name,
            city: data[0].locality,
            state: data[0].administrativeArea,
            zipcode: data[0].postalCode,
          });
          this.setState({animatingPos: false});
        })
      },
      (error) => {
        count = !count ? 1 : (count + 1);
        var txt = count <= 3 ? 'We are having trouble finding your location.' : 'We can\'t locate you.\nEnsure your location service is enabled.';
        AlertIOS.alert(
          'Yikes',
          txt,
          [
            {text: 'Try Again', onPress: this.onPressCurrentPosition.bind(this, count)}
          ]
        )
        console.warn(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  
  newHouseData() {
      if (this.addressIn == this.state.address &&
          this.zipcodeIn == this.state.zipcode &&
          this.cityIn == this.state.city &&
          this.stateIn == this.state.state &&
          this.bedroomsIn == this.state.bedrooms) return false;
      return true;
  }
  
  switchToPeople() {
    this.props.navigator.push({
      component: People,
      houseData: this.props.route.houseData,
      navigationBar: (
        <NavigationBarCom
          navigator={this.props.navigator}
          onBackBtnPress={true}
          title={'PEOPLE'}/>
      )
    });
  }
  
  handleSavePress() {
    this.setState({savingData: true});
    var url = `${restUrl}/api/housedataupdate`;
    var body = {};
    body.fbId = this.props.userInfo.id;
    !!this.state.address ? body.address = this.state.address : null;
    !!this.state.city ? body.city = this.state.city : null;
    !!this.state.state ? body.state = this.state.state : null;
    !!this.state.zipcode ? body.zipcode = this.state.zipcode : null;
    body.bedrooms = this.state.bedrooms;
    
    if (this.newHouseData()) {
        fetch(requestHelper(url, body, 'POST'))
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({savingData: false});
            this.props.route.houseData = responseData.houseData;
            this.switchToPeople();
        })
        .done();
    } else {
        this.switchToPeople();
        this.setState({savingData: false});
    }
  }
  
  render() {
    return (
        <View style={{flex: 1, backgroundColor: backgroundClr}}>
            <View style={styles.wrapTitleF}>
                <Text style={titleForm}>My Household</Text>
            </View>
            
            
            <View style={styles.titleFieldBar}>
                <View style={{flex: 1}}>
                <Text style={styles.fieldName}>ADDRESS</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                <ActivityIndicatorIOS
                    animating={this.state.animatingPos}
                    style={{height: 20}}
                    size="small"/>
                <TouchableOpacity
                    onPress={this.onPressCurrentPosition.bind(this)}
                    style={{flex: 1}}>
                    <Text
                    style={[styles.fieldName, {textAlign: 'right', marginRight: 15, fontWeight: 'bold'}]}>
                    GET CURRENT POSITION
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.fieldContainer}>
                <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
                <TextInput
                    value={this.state.address}
                    style={styles.inputBox}
                    placeholder="Address"
                    placeholderTextColor={'#DADADA'}
                    onChangeText={(address) => this.setState({address})}/>
                </View>
            </View>
            
            <View style={styles.fieldContainer}>
                <View style={{flex: 1, borderBottomColor: '#D1D1D1', borderBottomWidth: 0.5}}>
                <TextInput
                    value={this.state.zipcode}
                    style={styles.inputBox}
                    placeholderTextColor={'#DADADA'}
                    keyboardType={'numeric'}
                    placeholder="Zipcode"
                    onChangeText={(zipcode) => this.setState({zipcode})}/>
                </View>
            </View>
            
            
            <View style={styles.fieldContainer}>
                <View style={{flex: 1, borderLeftColor: '#D1D1D1', borderLeftWidth: 0.5}}>
                <TextInput
                    value={this.state.city}
                    style={styles.inputBox}
                    placeholderTextColor={'#DADADA'}
                    placeholder="City"
                    onChangeText={(city) => this.setState({city})}/>
                </View>
                <View style={{flex: 1}}>
                <TextInput
                    value={this.state.state}
                    style={styles.inputBox}
                    placeholderTextColor={'#DADADA'}
                    placeholder="State"
                    onChangeText={(state) => this.setState({state})}/>
                </View>
            </View>
            
            <View style={styles.titleFieldBar}>
                <View style={{flex: 1}}>
                    <Text style={styles.fieldName}>BEDROOMS</Text>
                </View>
            </View>
            
            <View style={styles.wrapperSlider}>
                <SliderIOS
                    style={styles.slider}
                    step={1}
                    minimumValue={1}
                    maximumValue={10}
                    minimumTrackTintColor={'white'}
                    maximumTrackTintColor={'#D3D3D3'}
                    value={this.state.bedrooms} 
                    onValueChange={(bedrooms) => this.setState({bedrooms})}/>
                    <View style={styles.sliderInfo}>
                    <View style={{flex: 1}}><Text style={[styles.sliderInfoDet, {textAlign: 'left'}]}>1</Text></View>
                    <View style={{flex: 1}}><Text style={[styles.sliderInfoDet, {textAlign: 'right'}]}>10</Text></View>
                    </View>
                    <View style={styles.bedInfo}>
                    <Text style={styles.sliderInfoDet}>
                        Total bedrooms: {this.state.bedrooms}
                    </Text>
                    </View>
            </View>
            
            <TouchableOpacity
                onPress={this.handleSavePress.bind(this)} 
                style={styles.buttonNext}>
                <View style={styles.btnContent}>
                    <Text style={styles.btnNextText}>Add people</Text>
                    <Image source={require('../img/next-icon.png')}/>
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
      marginVertical: 10
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
  wrapperSlider: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
  },
  slider: {
      width: window.width * 0.9,
      marginTop: 15,
      flex: 1
  },
  sliderInfo: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flex: 1,
      width: window.width * 0.9,      
  },
  sliderInfoDet: {
      color: 'white',
      fontFamily: 'Avenir',
      marginHorizontal: 10,
  },
  buttonNext: {
    position: 'absolute',
    alignItems: 'center',
    width: window.width,
    height: 43,
    backgroundColor: '#FFEC00',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0
  },
  btnContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  btnNextText: {
      fontFamily: 'Avenir',
      color: '#4A90E2',
      textAlign: 'center',
      fontSize: 17,
      marginRight: 20
  },
});

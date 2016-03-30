'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';

import {
    restUrl, 
    brandFont, 
    brandColor, 
    backgroundClr, 
    titleForm,
    buttonNext,
    btnContent,
    btnNextText,
    navigationBar, 
    buttonNavBar} from '../utils/globalVariables';
    
var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  AlertIOS,
  TouchableOpacity,
  Image,
  ScrollView
} = React;

export default class Summary extends React.Component {

  constructor(props) {
    super(props);
    var route = this.props.route;
    this.state = {
        address: route.houseData.address,
        city: route.houseData.city,
        state: route.houseData.state,
        zipcode: route.houseData.zipcode,
        bedrooms: route.houseData.bedrooms,
        people: route.people,
        cars: route.cars,
    };
  }
  
  componentWillMount() {
      this.maleQ = 0;
      this.femaleQ = 0;
      this.state.people.forEach((person)=>{
          if (person.gender == 'male') this.maleQ++;
          if (person.gender == 'female') this.femaleQ++;
      })
  }
  
  housePage() {
    var stack = this.props.navigator.getCurrentRoutes();
    this.props.navigator.jumpTo(stack[1]);   
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#4A90E2'}}>
        <ScrollView
            scrollEventThrottle={200}
            style={styles.scrollView}>
                    
            <View style={styles.wrapperContent}>

                <View style={styles.houseData}>
                    <View style={styles.leftSide}>
                        <Image source={require('../img/house-icon.png')}/>
                    </View>
                    <View style={styles.rightSide}>
                        <Text style={[styles.textHouse, {fontSize: 22}]}>{this.state.address}</Text>
                        <Text style={styles.textHouse}>{this.state.city}, {this.state.state} - {this.state.zipcode}</Text>
                        <Text style={styles.textHouse}>{this.state.bedrooms} bedrooms</Text>
                    </View>
                </View>
                
                <View style={styles.peopleData}>
                
                    <View style={styles.rowPeople}>
                        <View style={styles.leftSide}>
                            <Image source={require('../img/people-icon.png')}/>
                        </View>
                        <View style={styles.rightSide}>
                            <Text style={[styles.textHouse, {fontSize: 22}]}>{this.state.people.length} PEOPLE</Text>
                        </View>
                    </View>
                    
                    <View style={styles.rowGender}>
                        <View style={styles.rowGenderSides}>
                            <View style={[styles.circle, {backgroundColor: '#FF4BF4'}]}></View>
                            <Text style={styles.genderText}>{this.femaleQ} female</Text>
                        </View>
                        
                        <View style={styles.rowGenderSides}>
                            <View style={[styles.circle, {backgroundColor: '#2D2BE6'}]}></View>
                            <Text style={styles.genderText}>{this.maleQ} male</Text>
                        </View>
                    </View>
                    
                    <View style={styles.rowsPeopleDetail}>
                        {this.state.people.map((person, i)=>{
                            var nameAge = `${person.firstname} ${person.lastname}, ${person.age}`;
                            var female = person.gender == 'female' ? (true) : (false);
                            return (
                                <View key={i} style={styles.wrapDetail}>
                                    <View style={styles.leftDetail}>
                                        <View style={[styles.bulletGender, female ? styles.bulletF : null]}></View>
                                    </View>
                                    <View style={styles.rightDetail}>
                                        <Text style={styles.nameage}>{nameAge}</Text>
                                        <Text style={styles.email}>{person.email}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    
                </View> 
                
                <View style={styles.carsData}>
                
                    <View style={styles.rowPeople}>
                        <View style={styles.leftSide}>
                            <Image 
                                style={styles.carIcon} 
                                source={require('../img/vehicle-icon.png')}/>
                        </View>
                        <View style={styles.rightSide}>
                            <Text style={[styles.textHouse, {fontSize: 22}]}>{this.state.cars.length} CARS</Text>
                        </View>
                    </View>             
                    
                    <View style={styles.rowsPeopleDetail}>
                        {this.state.cars.map((car, i)=>{
                            var firstline = `${car.make}, ${car.model}`;
                            var secondline = `${car.owner}, ${car.year}`
                            return (
                                <View key={i} style={styles.wrapDetail}>
                                    <View style={styles.leftDetail}>
                                        <View style={styles.bulletGender}></View>
                                    </View>
                                    <View style={styles.rightDetail}>
                                        <Text style={styles.nameage}>{firstline}</Text>
                                        <Text style={styles.email}>{secondline}</Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    
                </View>
                
            </View>
        </ScrollView>
        
        <TouchableOpacity
            onPress={this.housePage.bind(this)} 
            style={buttonNext}>
            <View style={btnContent}>
                <Text style={btnNextText}>House</Text>
                <Image source={require('../img/next-icon.png')}/>
            </View>
        </TouchableOpacity>
            
    </View>
    );
  }
}

var styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        marginBottom: 55
    },
    wrapperContent: {
      flex: 1, 
      backgroundColor: backgroundClr,
      alignItems: 'center',
      justifyContent: 'center',
    },
    houseData: {
      flexDirection: 'row',
      marginTop: 35,
      width: window.width * 0.90
    },
    leftSide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightSide: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    textHouse: {
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Avenir-Medium',
    },
    peopleData: {
        flexDirection: 'column',
        marginTop: 15,
        width: window.width * 0.90
    },
    rowPeople: {
        flexDirection: 'row',
        width: window.width * 0.90,
        marginTop: 15,
    },
    rowGender: {
        flexDirection: 'row',
        width: window.width * 0.90,
        marginTop: 20,
    },
    rowGenderSides: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    circle: {
        width: 25,
        height: 25,
        borderColor: 'white',
        borderRadius: 25/2,
        borderWidth: 1
    },
    genderText: {
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Avenir-Medium',
        fontSize: 22,
        paddingLeft: 20
    },
    rowsPeopleDetail: {
        width: window.width * 0.90,
        flexDirection: 'column',
        marginTop: 15,
    },
    wrapDetail: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 15,
        alignItems: 'center'
    },
    leftDetail: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    bulletGender: {
        width: 12,
        height: 12,
        borderRadius: 12/2,
        backgroundColor: '#2D2BE6'
    },
    bulletF: {
        backgroundColor: '#FF4BF4'
    },
    rightDetail: {
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    nameage: {
        fontSize: 22,
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Avenir-Medium',
        fontStyle: 'italic',
        paddingLeft: 17,
    },
    email: {
        fontSize: 12,
        color: 'white',
        textAlign: 'left',
        fontFamily: 'Avenir-Medium',
        paddingLeft: 17,
    },
    carsData: {
        flexDirection: 'column',
        marginTop: 15,
        width: window.width * 0.90
    },
});

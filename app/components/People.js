'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

import AddPeople from  './AddPeople';
import Cars from  './Cars';
import NavigationBarCom from  './NavigationBarCom';

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
    
import {requestHelper, } from '../utils/dbHelper';

var window = Dimensions.get('window');

let {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  AlertIOS,
  ProgressViewIOS,
  TouchableOpacity
} = React;

export default class People extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        people: this.newPeopleData,
        updatePeopleData: false,
    };
  }
 
  onChangeSideMenu(isOpen) {
    if (isOpen === false) {
      this.props.route.onBurguerMenuPress(false);
    }
  } 
  
  retrievePeopleData() {
    var people;
    this.setState({updatePeopleData: true})
    if (!this.firstTimeRetrieve) {
        var url = `${restUrl}/api/peopledata/${this.props.userInfo.id}`;
        fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            people = responseData.peopleData.people;
            this.newPeopleData = people;
            this.setState({people, updatePeopleData: false});
        })
        .done();
    } else {
        if (!this.state.people) {
            people = this.props.route.houseData.people;
            this.setState({people, updatePeopleData: false});
        }
    }
    
  }
  
  updatePeopleData() {
    this.firstTimeRetrieve = false;
    this.retrievePeopleData();
  }
  
  componentWillMount() {
    this.firstTimeRetrieve = true;
    this.retrievePeopleData();
  }
  
  onAddPeoplePress() {
      var route = this.props.route;
      this.props.navigator.push({
            component: AddPeople,
            updatePeopleData: this.updatePeopleData.bind(this),
            navigationBar: (
                <NavigationBarCom
                    navigator={this.props.navigator} 
                    title={'PEOPLE'}/>
            )
        });
  }
  
  onHandleDeletePerson(personId) {
      var people;
      this.setState({updatePeopleData: true})      
      function deletePerson() {
          var url = `${restUrl}/api/deleteperson`;
          var body = {
                _id: personId,
                fbId: this.props.userInfo.id
            };

            fetch(requestHelper(url, body, 'POST'))
            .then((response) => response.json())
            .then((responseData) => {
                people = responseData.peopleData.people;
                this.setState({people, updatePeopleData: false});
            })
            .done();
      }
      AlertIOS.alert('Remove Person', 'Are you sure?',
      [
        {text: 'CANCEL', onPress: () => console.log('Cancel Pressed')},
        {text: 'OK', onPress: deletePerson.bind(this)},
      ]
    )
  }
  
  vehiclesPage() {
      var route = this.props.route;
      this.props.navigator.push({
            component: Cars,
            houseData: this.props.route.houseData,
            people: this.state.people,
            navigationBar: (
                <NavigationBarCom 
                    title={'VEHICLES'}
                    navigator={this.props.navigator}
                    onBackBtnPress={true}/>
            )
        });
  }

  render() {
    return (
        <View style={{flex: 1, backgroundColor: backgroundClr}}>
            <ScrollView
                scrollEventThrottle={200}
                style={styles.scrollView}>
                
                    <TouchableOpacity 
                        style={styles.btnAddPeople}
                        onPress={this.onAddPeoplePress.bind(this)}>
                        <View style={styles.btnAddPContent}>
                            <Image source={require('../img/add-people-btn.png')}/>
                            <Text style={styles.txtBtn}>+ Add People</Text>
                        </View>
                    </TouchableOpacity>
                    
                    {this.state.people.map((person, i)=> {
                        var male = person.gender === 'male' ? (true) : (false);
                        return (
                            <View key={i} style={styles.rowPersonData}>
                                <View style={styles.wrapperCircle}>
                                    <View style={[styles.circle, male ? styles.male : styles.female]}>
                                        <Text style={styles.oneLetter}>{person.firstname[0]}</Text>
                                        <TouchableOpacity 
                                            style={styles.deleteIconBtn} 
                                            onPress={this.onHandleDeletePerson.bind(this, person._id)}>
                                                <Image 
                                                    style={styles.imgDeleteIcon} 
                                                    source={require('../img/delete-person-icon.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.wrapperText}>
                                    <Text style={styles.firstline}>{person.firstname} {person.lastname}, {person.age}</Text>
                                    <Text style={styles.secondline}>{person.email}</Text>
                                </View>
                            </View>
                        );
                    })}
                    
                </ScrollView>
                
                <TouchableOpacity
                    onPress={this.vehiclesPage.bind(this)} 
                    style={buttonNext}>
                    <View style={btnContent}>
                        <Text style={btnNextText}>Add vehicles</Text>
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
    btnAddPeople: {
        marginTop: 15,
        marginBottom: 35,
        paddingLeft: 15
    },
    btnAddPContent: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row'
    },
    txtBtn: {
        fontFamily: 'Avenir-Medium',
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        marginLeft: 20
    },
    rowPersonData: {
        height: 82,
        width: window.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    wrapperCircle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 82,
        height: 82,
        borderRadius: 82/2,
        borderColor: 'white',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    oneLetter: {
        fontFamily: brandFont,
        color: 'white',
        opacity: 0.75,
        fontSize: 40,
        backgroundColor: 'transparent'
    },
    deleteIconBtn: {
        position: 'absolute',
        top: 50
    },
    male: {
        backgroundColor: '#2D2BE6'
    },
    female: {
        backgroundColor: '#FF4BF4'
    },
    wrapperText: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column' 
    },
    firstline: {
        fontFamily: 'Avenir',
        fontStyle: 'italic',
        fontSize: 21,
        color: 'white',
        fontWeight: '600'
    },
    secondline: {
        fontFamily: 'Avenir',
        fontSize: 13,
        color: 'white'
    },
});

'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import SideMenu from 'react-native-side-menu';

import AddPeople from  './AddPeople';
import NavigationBarCom from  './NavigationBarCom';

import {restUrl, brandFont, brandColor, backgroundClr, titleForm, navigationBar, buttonNavBar} from '../utils/globalVariables';
import {requestHelper, } from '../utils/dbHelper';

var window = Dimensions.get('window');

let {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ProgressViewIOS,
  TouchableOpacity
} = React;

export default class People extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        openSideMenu: false,
        firstTimeRetrieve: true,
        people: null,
    };
  }
 
  onChangeSideMenu(isOpen) {
    if (isOpen === false) {
      this.props.route.onBurguerMenuPress(false);
    }
  } 
  
  retrievePeople() {
    var people;
    if (!this.state.firstTimeRetrieve) {
        
    } else {
        this.setState({firstTimeRetrieve: false});
        people = this.props.route.houseData.people;
        this.setState({people});
    }
    
  }
  
  componentWillMount() {
    this.retrievePeople();
    this.props.route.events.addListener('burguerBtnEvent',
      (args) => {
        this.setState({openSideMenu: args});
      });
  }
  
  onAddPeoplePress() {
      var route = this.props.route;
      this.props.navigator.push({
            component: AddPeople,
            events: route.events,
            onBurguerMenuPress: route.onBurguerMenuPress.bind(this),
            navigationBar: (
                <NavigationBarCom 
                    title={'PEOPLE'}
                    navigator={this.props.navigator}
                    onBackBtnPress={true}/>
            )
        });
  }

  render() {
    return (
        <SideMenu
            openMenuOffset={window.width/2}
            disableGestures={true}
            onChange={this.onChangeSideMenu.bind(this)}
            isOpen={this.state.openSideMenu}>
                <View style={{flex: 1, backgroundColor: backgroundClr}}>
                    <ScrollView
                        scrollEventThrottle={200}
                        style={styles.scrollView}>
                        
                            <TouchableOpacity 
                                style={styles.btnAddPeople}
                                onPress={this.onAddPeoplePress.bind(this)}>
                                <View style={styles.btnContent}>
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
                                                <TouchableOpacity style={styles.deleteIconBtn}><Image style={styles.imgDeleteIcon} source={require('../img/delete-person-icon.png')}/></TouchableOpacity>
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
                    
                    <View>
                        
                    </View>
                </View>
        </SideMenu>
    );
  }
}

var styles = StyleSheet.create({
    scrollView: {
      flex: 1  
    },
    btnAddPeople: {
        marginTop: 15,
        marginBottom: 35,
        paddingLeft: 15
    },
    btnContent: {
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

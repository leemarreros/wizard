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
    };
  }
 
  onChangeSideMenu(isOpen) {
    if (isOpen === false) {
      this.props.route.onBurguerMenuPress(false);
    }
  } 
  
  retrievePeople() {
    var people = this.props.route.houseData.people;
    
  }
  
  componentWillMount() {
    //   this.retrievePeople();
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
        marginBottom: 50,
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
    }
});

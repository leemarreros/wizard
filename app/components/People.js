'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

import AddPeople from  './AddPeople';
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
    };
  }
  
  
  retrievePeople() {
    var people = this.props.route.houseData.people;
    
  }
  
  componentWillMount() {
    //   this.retrievePeople();
  }
  
  onAddPeoplePress() {
      this.props.navigator.push({
        component: AddPeople,
        navigationBar: (
            <NavigationBar
            title={{title: 'PEOPLE', tintColor: 'white'}}
            style={navigationBar}
            tintColor='#2981E8'
            statusBar={{style: 'light-content', hidden: false}}
            leftButton={
                <TouchableOpacity
                style={buttonNavBar}
                onPress={this.props.route.onBurguerMenuPress.bind(this)}>
                <Image
                    source={require('../img/burguer-icon.png')}
                    style={[{ width: 20, height: 15}]}/>
                </TouchableOpacity>
            }/>
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
                        <View style={styles.btnContent}>
                            <Image source={require('../img/add-people-btn.png')}/>
                            <Text style={styles.txtBtn}>+ Add People</Text>
                        </View>
                    </TouchableOpacity>
                    
                    
                    
                </ScrollView>
            
            <View>
                
            </View>
        </View>
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

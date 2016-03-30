'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';
import NavigationBarCom from  './NavigationBarCom';

import AddCars from  './AddCars';
import Summary from  './Summary';
import Spinner from  './Spinner';

var window = Dimensions.get('window');
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

let {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Component,
  AlertIOS,
  ProgressViewIOS,
  TouchableOpacity
} = React;

class ImageSwitcher extends Component{

  render() {
    var image;
     
    switch(this.props.i % 5) {
        case 0:
            image = <Image style={this.props.style} source={require('../img/car-model-1.png')}/>;
            break;
        case 1:
            image = <Image style={this.props.style} source={require('../img/car-model-2.png')}/>;
            break;
        case 2:
            image = <Image style={this.props.style} source={require('../img/car-model-3.png')}/>;
            break;
        case 3:
            image = <Image style={this.props.style} source={require('../img/car-model-4.png')}/>;
            break;
        case 4:
            image = <Image style={this.props.style} source={require('../img/car-model-5.png')}/>;
            break;
        default:
    }
    return(
        <View style={{width: 50, height: 50, backgroundColor: 'black'}}>
            {image}
        </View>
    );
  }

}

export default class Cars extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        cars: this.newCarsData,
        updateCarsData: false,
    };
  }
  
  componentWillMount() {
    this.firstTimeRetrieve = true;
    this.retrieveCarsData();
  }
  
  updateCarsData() {
    this.firstTimeRetrieve = false;
    this.retrieveCarsData();
  }
  
  retrieveCarsData() {
    var cars;
    this.setState({updateCarsData: true})
    if (!this.firstTimeRetrieve) {
        var url = `${restUrl}/api/carsdata/${this.props.userInfo.id}`;
        fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            cars = responseData.carsData.cars;
            this.props.route.updateCarsDatainPeople(cars);
            this.newCarsData = cars;
            this.setState({cars, updateCarsData: false});
        })
        .done();
    } else {
        if (!this.state.cars) {
            cars = this.props.route.houseData.cars;
            this.setState({cars, updateCarsData: false});
        }
    }
    
  }
  
  onHandleDeleteCar(carId, ownerId) {
      var cars;
      this.setState({updateCarsData: true})      
      function deleteCar() {
          var url = `${restUrl}/api/deletecar`;
          var body = {
                personId: ownerId,
                _id: carId,
                fbId: this.props.userInfo.id
            };

            fetch(requestHelper(url, body, 'POST'))
            .then((response) => response.json())
            .then((responseData) => {
                cars = responseData.carsData.cars;
                this.props.route.updateCarsDatainPeople(cars);                
                this.setState({cars, updateCarsData: false});
            })
            .done();
      }
      AlertIOS.alert('Remove Car', 'Are you sure?',
      [
        {text: 'CANCEL', onPress: () => console.log('Cancel Pressed')},
        {text: 'OK', onPress: deleteCar.bind(this)},
      ]
    )
  }
    
  onAddCarsPress() {
      var route = this.props.route;
      this.props.navigator.push({
            component: AddCars,
            people: route.people,
            updateCarsData: this.updateCarsData.bind(this),
            navigationBar: (
                <NavigationBarCom 
                    title={'VEHICLES'}
                    navigator={this.props.navigator}/>
            )
        });
  }
  
  summaryPage() {
      var route = this.props.route;
      this.props.navigator.push({
            component: Summary,
            people: route.people,
            houseData: route.houseData,
            cars: this.state.cars,
            navigationBar: (
                <NavigationBarCom 
                    title={'SUMMARY'}
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
                        onPress={this.onAddCarsPress.bind(this)}>
                        <View style={styles.btnAddPContent}>
                            <Image source={require('../img/add-car-btn.png')}/>
                            <Text style={styles.txtBtn}>+ Add Cars</Text>
                        </View>
                    </TouchableOpacity>
                    
                    {this.state.cars.map((car, i)=> {
                        return (
                            <View key={i} style={styles.rowPersonData}>
                                <View style={styles.wrapperCircle}>
                                    <View style={styles.circle}>
                                        <ImageSwitcher i={i} style={styles.imageCar}/>
                                        <TouchableOpacity 
                                            style={styles.deleteIconBtn} 
                                            onPress={this.onHandleDeleteCar.bind(this, car._id, car.ownerId)}>
                                                <Image 
                                                    style={styles.imgDeleteIcon} 
                                                    source={require('../img/delete-person-icon.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.wrapperText}>
                                    <Text style={styles.firstline}>{car.make} {car.model}</Text>
                                    <Text style={styles.secondline}>{car.owner}, {car.year}</Text>
                                </View>
                            </View>
                        );
                    })}
            </ScrollView>
            
            <TouchableOpacity
                onPress={this.summaryPage.bind(this)} 
                style={buttonNext}>
                <View style={btnContent}>
                    <Text style={btnNextText}>Summary</Text>
                    <Image source={require('../img/next-icon.png')}/>
                </View>
            </TouchableOpacity>
            
             {this.state.updateCarsData ? (Spinner) : null}
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
        backgroundColor: '#2981E8',
    },
    imageCar: {
        flex: 1,
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

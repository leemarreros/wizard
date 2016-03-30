'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';
import NavigationBar from 'react-native-navbar';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet,
  AlertIOS,
  TouchableOpacity,
  ActivityIndicatorIOS,
  Image
} = React;

var styles = {
  wrapSppiner: {
      position: 'absolute',
      width: window.width,
      height: window.height,
      top: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
  },
  spinnerBckgrnd: {
      position: 'absolute',
      width: window.width,
      height: window.height,
      backgroundColor: 'white',
      top: 0,
      left: 0,
      opacity: 0.37
  },
};

var Spinner = (<View style={styles.wrapSppiner}>
                <View style={styles.spinnerBckgrnd}></View>
                <ActivityIndicatorIOS
                    animating={true}
                    color='#FFEC00'
                    style={{height: 20}}
                    size="large"/>
              </View>);
              
module.exports = Spinner;

'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
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

  render() {
    return (
        <Text>
            PEOPLE
        </Text>
    );
  }
}

var styles = StyleSheet.create({
});

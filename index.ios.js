'use strict';

import Login from './app/components/Login';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class wizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideNavBar: true,
      userInfo: null,
      openSideMenu: false,
    };
  }
  
  renderScene (route, navigator) {
    let Component = route.component;
    let navBar = route.navigationBar;

    if (navBar) {
      navBar = React.cloneElement(navBar, { navigator, route, });
    }

    return (
      <View style={styles.app}>
        {route.navigationBar}
        <Component
          route={route}
          navigator={navigator}/>
      </View>
    );
  }
  
  render() {
   return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          component: Login,
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#285DA1',
  },
});

AppRegistry.registerComponent('wizard', () => wizard);

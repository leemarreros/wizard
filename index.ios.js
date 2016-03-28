'use strict';

import Login from './app/components/Login';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Navigator,
  NavigatorIOS,
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
          userInfo={this.state.userInfo}
          route={route}
          navigator={navigator}/>
      </View>
    );
  }
  
   setUserInformation(userInfo) {
    this.setState({userInfo});
  }
  
  render() {
   return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        initialRoute={{
          component: Login,
          setUserInformation: this.setUserInformation.bind(this)
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    position: 'relative',
  },
});

AppRegistry.registerComponent('wizard', () => wizard);

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage
} from 'react-native';

class Header extends React.Component {
  constructor (props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut () {
    AsyncStorage.removeItem('token');
    this.props.replaceNavigation('Login');
  }

  render () {
    return (
      <View style={styles.header}>
        <Text style={styles.actions} onPress={this.logOut}>Log out</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 15,
    height: 54,
    marginTop: 0,
    backgroundColor: 'rgba(0, 0, 0, 1)'
  },

  actions: {
    textAlign: 'right',
    color: '#eee',
    fontSize: 17
  }
})

export default Header;

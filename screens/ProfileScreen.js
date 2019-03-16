import React from 'react';
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  Button
} from 'react-native';
import * as Api from '../connections/api';
import Profile from '../components/Profile';

class ProfileScreen extends React.Component {
  constructor (props) {
    super(props);
    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount () {
    this.getProfile();
  }

  state = {
    user: {}
  }

  getProfile () {
    AsyncStorage.getItem('token').then((token) => {
      const id = this.props.navigation.state.params.user_id;

      Api.makeGetTokenRequest({ url: `/profiles/${id}`, token: token })
         .then((response) => {
           if (response.status >= 200 && response.status < 400) {
             response.data.then((json) => {
               this.setState({ user: json });
             })
           } else if (response.status < 500) {
             response.data.then((json) => {
               this.setState({ error: json })
             });
           } else {
             this.setState({ error: `Server error code: ${response.code}` });
           }
         })
    })
  }

  render () {
    const { user } = this.state;

    return (
      <View>
        { user.data ?
          <Profile user={user.data} />
        : <Text>Loading...</Text> }
      </View>
    )
  }
}

export default ProfileScreen;

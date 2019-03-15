import React from 'react';
import {
  ScrollView,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import * as Api from '../connections/api';
import Post from '../components/Post';
export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props);

    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount () {
    this.getPosts();
  }

  state = {
    posts: [],
    error: null,
    refreshing: false
  }

  getPosts () {
    AsyncStorage.getItem('token').then((token) => {
      Api.makeGetTokenRequest({ url: '/posts', token: token })
         .then((response) => {
           if (response.status >= 200 && response.status < 400) {
             response.data.then((json) => (
               this.setState({ posts: json.data, refreshing: false })
             ))
           } else if (response.status < 500) {
             response.data.then((json) => (
               this.setState({ error: json.error })
             ))
           } else {
             this.setState({ error: `server error code: ${response.status}` })
           }
         }).catch((e, Unauthorized) => {
           this.setState({ error: 'Unauthorized' })
         })
    });
  }

  render () {
    const { error, posts, refreshing } = this.state;

    return (
      <View>
        <ScrollView>
          { error ? <Text>{error}</Text> : null }
          { posts.map((post) => (
            <Post key={post.id}
                  viewNavigation={this.props.navigation.navigate}
                  data={post} />
          )) }
        </ScrollView>
      </View>
    );
  }
}

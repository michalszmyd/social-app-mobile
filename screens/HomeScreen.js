import React from 'react';
import {
  ScrollView,
  Text,
  View,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import * as Api from '../connections/api';
import Post from '../components/Post';
export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props);

    this._onRefresh = this._onRefresh.bind(this);
    this.getPosts = this.getPosts.bind(this);
  }

  componentDidMount () {
    this.getPosts();
  }

  state = {
    posts: [],
    error: null,
    refreshing: false,
    limit: 15,
    offset: 0
  }

  getPosts () {
    AsyncStorage.getItem('token').then((token) => {
      const { limit, offset } = this.state;
      const url = `/posts?limit=${limit}&offset=${offset}`;

      Api.makeGetTokenRequest({ url: url, token: token })
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

  _onRefresh () {
    this.getPosts();
  }

  render () {
    const { error, posts, refreshing } = this.state;

    return (
      <View>
        <ScrollView
            refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this._onRefresh}
            />
          }>
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

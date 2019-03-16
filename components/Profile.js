import React from 'react';
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet,
  RefreshControl
} from 'react-native';
import PostPreview from './posts/PostPreview';
import UserHeader from './profiles/UserHeader';
import * as Api from '../connections/api';

class Profile extends React.Component {
  constructor (props) {
    super(props);

    this.getPosts = this.getPosts.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.getPosts();
  }

  state = {
    posts: [],
    limit: 12,
    offset: 0,
    refreshing: false
  }

  getPosts () {
    const { limit, offset } = this.state;
    const userId = this.props.user.id;
    const url = `/posts?limit=${limit}&offset=${offset}&user_id=${userId}`;

    AsyncStorage.getItem('token').then((token) => {
      Api.makeGetTokenRequest({ url: url, token: token })
         .then((response) => {
           if (response.status >= 200 && response.status < 400) {
             response.data.then((json) => {
               this.setState({ posts: json.data, refreshing: false });
             })
           }
         })
    }).catch((e) => {
      this.setState({
        refreshing: false
      })
    })
  }

  _onRefresh () {
    this.getPosts();
  }

  render () {
    const { user } = this.props;
    const { posts, refreshing } = this.state;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.mainContainer}>

        <UserHeader user={user.attributes} />
        <View>
          <View style={styles.postsFlex}>
            { posts.length > 0 ? posts.map((post) => (
              <PostPreview key={post.id} post={post} />
            )) : <Text>No posts yet</Text> }
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10
  },

  postsFlex: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
})

export default Profile;

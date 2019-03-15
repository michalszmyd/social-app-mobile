import React from 'react';
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import PostPreview from './posts/PostPreview';
import UserHeader from './profiles/UserHeader';
import * as Api from '../connections/api';

class Profile extends React.Component {
  constructor (props) {
    super(props);

    this.getPosts = this.getPosts.bind(this);
    this.getPosts();
  }

  state = {
    posts: [],
    limit: 9,
    offset: 0
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
               this.setState({ posts: json.data });
             })
           }
         })
    })
  }

  render () {
    const { user } = this.props;
    const { posts } = this.state;

    return (
      <ScrollView style={styles.mainContainer}>
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

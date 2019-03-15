import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  AsyncStorage
} from 'react-native';
import Comment from './posts/Comment';
import Icon from 'react-native-vector-icons/Feather';
import * as Api from '../connections/api';

class Post extends React.Component {
  constructor (props) {
    super(props);

    this.showProfile = this.showProfile.bind(this);
    this.addPostComment = this.addPostComment.bind(this);
    this.onChangeCommentBody = this.onChangeCommentBody.bind(this);
  }

  state = {
    commentBody: '',
    comments: this.props.data.attributes.comments.data
  }

  onChangeCommentBody (string) {
    this.setState({
      commentBody: string
    })
  }

  addPostComment () {
    AsyncStorage.getItem('token').then((token) => {
      const commentParams = {
        url: `/posts/${this.props.data.id}/comments`,
        token: token,
        body: {
          comment: {
            body: this.state.commentBody
          }
        }
      }

      Api.makePostTokenRequest(commentParams)
         .then((response) => {
           if (response.status >= 200 && response.status < 400) {
             response.data.then((json) => {
               this.setState({
                 commentBody: '',
                 comments: [json.data].concat(this.state.comments)
               });
             })
           }
         })
    })
  }

  showProfile () {
    const userId = this.props.data.relationships.user.data.id;

    this.props.viewNavigation('Profile', { user_id: userId });
  }

  render () {
    const { title, description, image_url } = this.props.data.attributes;
    const user = this.props.data.attributes.user.data.attributes;
    const { commentBody, comments } = this.state;

    return (
      <View>
        <View style={styles.userInfo}>
          <Image style={styles.userInfoImage} source={{ uri: user.profile_image_url }} />
          <Text onPress={this.showProfile} style={styles.userInfoContext}>
            {user.first_name} {user.last_name}
          </Text>
        </View>
        <Image source={{ uri: image_url }} style={styles.image} />
        <View style={styles.actionContainer} >
          <Icon size={26} style={styles.action} name='heart' />
          <Icon size={26} style={styles.action} name='message-square' />
        </View>
        <View style={styles.comments}>
          <Text style={styles.commentTitle}>{user.first_name} {user.last_name}: {title}</Text>
          <View style={styles.comments}>
            { comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            )) }
          </View>
          <View style={styles.commentInput}>
            <TextInput onSubmitEditing={this.addPostComment}
                       onChangeText={this.onChangeCommentBody}
                       placeholderTextColor='#555'
                       style={styles.writeComment}
                       placeholder="Write comment..."
                       value={commentBody} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  userInfo: {
    padding: 10,
    borderTopColor: '#aaa',
    borderTopWidth: 1,
    flexDirection: 'row'
  },

  userInfoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    borderColor: '#FFAC68',
    borderWidth: 2
  },

  userInfoContext: {
    fontSize: 16,
    lineHeight: 38
  },

  image: {
    width: '100%',
    height: 400
  },

  actionContainer: {
    flexDirection: 'row',
    padding: 7
  },

  action: {
    margin: 8
  },

  comments: {
    padding: 10
  },

  commentTitle: {
    fontSize: 16
  },

  commentInput: {
    padding: 4
  }
})

export default Post;

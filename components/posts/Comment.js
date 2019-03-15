import React from 'react';
import { View, Text } from 'react-native';

class Comment extends React.Component {
  render () {
    const { body } = this.props.comment.attributes;
    const { email } = this.props.comment.attributes.user.data.attributes;

    return (
      <View>
        <Text>{email}: {body}</Text>
      </View>
    )
  }
}

export default Comment;

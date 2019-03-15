import React from 'react';
import {
  View, Text, Image
} from 'react-native';

class PostPreview extends React.Component {
  render () {
    const { post } = this.props;

    if (post.attributes.image_url) {
      return (
        <Image
          source={{ uri: post.attributes.image_url }}
          style={{ width: '33.3%', height: 120 }}
        />
      )
    } else {
      return (
        <Text>{post.attributes.title}</Text>
      )
    }
  }
}

export default PostPreview;

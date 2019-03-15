import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

class UserHeader extends React.Component {
  render () {
    const { user } = this.props;

    return (
      <View style={styles.main}>
        <View style={styles.row}>
          <Image style={styles.heroImage}
                 source={{ uri: user.profile_image_url }}
          />
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.stats}>
              <View style={styles.info}>
                <Text>{user.posts_count}</Text>
                <Text style={styles.label}>posts</Text>
              </View>
              <View style={styles.info}>
                <Text>{0}</Text>
                <Text style={styles.label}>followers</Text>
              </View>
              <View style={styles.info}>
                <Text>{0}</Text>
                <Text style={styles.label}>following</Text>
              </View>
            </View>
            <View>
              <Text style={styles.followButton}>Follow</Text>
            </View>
          </View>
        </View>
        <View style={styles.userDescription}>
          <Text style={styles.userText}>{user.first_name} {user.last_name}</Text>
        </View>
      </View>
    )
  }
}

styles = StyleSheet.create({
  main: {
    padding: 10,
    width: '100%'
  },

  row: {
    flexDirection: 'row'
  },

  info: {
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    alignItems: 'center',
    padding: 8
  },

  stats: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  label: {
    color: '#aaa'
  },

  followButton: {
    margin: 15,
    textAlign: 'center',
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#aaa'
  },

  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#FFAC68',
    borderWidth: 4
  },

  userDescription: {
    padding: 15,
    flexDirection: 'column'
  },

  userText: {
    fontSize: 17
  }
});

export default UserHeader;

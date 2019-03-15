import React from 'react';
import {
  Button,
  Text,
  View
} from 'react-native';

class NewPostScreen extends React.Component {
  constructor (props) {
    super(props);

    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
  }

  state = {
    photo: null
  }

  handleChoosePhoto () {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // console.log(ImagePicker.launchImageLibrary);

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  render() {
    const { photo } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    )
  }
}

export default NewPostScreen;

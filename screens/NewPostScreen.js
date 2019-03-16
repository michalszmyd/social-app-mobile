import React from 'react';
import {
  Button,
  Text,
  View,
  Image,
  AsyncStorage,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import * as Api from '../connections/api';

class NewPostScreen extends React.Component {
  constructor (props) {
    super(props);

    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  state = {
    photo: null,
    title: '',
    description: ''
  }

  onDescriptionChange (string) {
    this.setState({
      description: string
    })
  }

  onTitleChange (string) {
    this.setState({
      title: string
    })
  }

  handleChoosePhoto () {
    const options = {
       noData: true,
     }

     ImagePicker.launchImageLibrary(options, (response) => {
       if (response.uri) {
         this.setState({ photo: response })
       }
     })
  }

  handleCamera () {
    const options = {
       noData: true,
     }

    ImagePicker.launchCamera(options, (response) => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    });
  }

  handleUpload () {
    const { title, description, photo } = this.state;

    var form = new FormData();
    form.append('post[title]', title);
    form.append('post[description]', description);
    form.append('post[image]', {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri.replace('file://', '')
    });

    AsyncStorage.getItem('token').then((token) => {
      Api.makePostTokenRequest({
        url: '/posts',
        body: form,
        stringify: false,
        token: token
      }).then((response) => {
        if (response.status >= 200 && response.status < 400) {
          response.data.then((json) => {
            this.setState({
              notice: 'Image uploaded!',
              photo: null,
              title: '',
              description: '',
              id: json.id
            })
          })
        } else {
          response.data.then((json) => {
            this.setState({ error: json.error })
          })
        }
      }).catch((e, Unauthorized) => {
        this.setState({ error: 'Unathorized' });
      })
    })
  }

  render() {
    const { photo, title, description, error, notice } = this.state;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
          <Text>{notice}</Text>
          { photo && (
            <React.Fragment>
              <Image source={{ uri: photo.uri }}
                     style={{ width: '100%', height: 400 }}
              />
              <Text>{error}</Text>
              <TextInput onChangeText={this.onTitleChange}
                         style={styles.input}
                         value={title}
                         placeholder='Add title' />
              <TextInput onChangeText={this.onDescriptionChange}
                         style={styles.input}
                         value={description}
                         placeholder='Add description'
              />
              <View style={styles.uploadButton}>
                <Button color='white' title='Upload' onPress={this.handleUpload} />
              </View>
            </React.Fragment>
          ) }
          <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
          <Text>Or</Text>
          <Button title="Take a picture" onPress={this.handleCamera} />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    flexDirection: 'column'
  },
  input: {
    padding: 12,
    width: '100%',
    backgroundColor: 'rgba(220, 220, 220, 0.5)',
    marginTop: 12,
  },
  uploadButton: {
    padding: 5,
    width: '100%',
    marginTop: 12,
    backgroundColor: '#FFB6A8',
    color: '#eee'
  }
})

export default NewPostScreen;

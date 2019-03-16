import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  StackAction,
  KeyboardAvoidingView
} from 'react-native';
import * as Api from '../connections/api';

class LoginScreen extends React.Component {
  constructor (props) {
    super(props);

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        Api.makeGetTokenRequest({ url: '/profiles/my_profile', token: token }).then((response) => {
          if (response.status >= 200 && response.status < 400) {
            this.props.navigation.navigate('Home');
          } else {
            AsyncStorage.removeItem('token');
          }
        })
      }
    })
  }

  state = {
    email: '',
    password: ''
  }

  onEmailChange (email) {
    this.setState({
      email: email
    })
  }

  onPasswordChange (password) {
    this.setState({
      password: password
    })
  }

  onSubmit () {
    this.setState({
      error: null
    });

    Api.makePostRequest({
      body: {
        email: this.state.email,
        password: this.state.password
      },
      url: '/users/sign_in'
    }).then((response) => {
      response.data.then((json) => {
        if (response.status >= 200 && response.status < 400) {
          response.data.then((json) => {
            AsyncStorage.setItem('token', json.data.attributes.token);
            this.props.navigation.navigate('Home');
          })
        } else if (response.status < 500) {
          response.data.then((json) => {
            this.setState({ error: json.error });
          })
        }
      })
    })
  }

  render () {
    const { email, password, error, token } = this.state;

    return (
      <KeyboardAvoidingView style={styles.main}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>SocialApp</Text>
          <Text style={styles.paragraph}>Log in to service</Text>
          { error ?
            <Text style={styles.error}>{error}</Text>
          : null }
          { token ?
            <Text style={styles.paragraph}>{token}</Text>
          : null }
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={this.onEmailChange}
              value={email}
              autoComplete='Email'
              placeholder='Your email'
              autoCapitalize='none'
            />

            <TextInput
              style={styles.input}
              onChangeText={this.onPasswordChange}
              value={password}
              secureTextEntry={true}
              placeholder='Your password'
            />
            <View style={styles.submitButton}>
              <Button
                color='#fff'
                onPress={this.onSubmit}
                title='Log in'
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    flex: 1
  },

  form: {
    marginTop: 10
  },

  input: {
    padding: 18,
    marginTop: 12,
    height: 60,
    fontSize: 18,
    color: '#0c0c0c',
    backgroundColor: '#eaeaea'
  },

  submitButton: {
    backgroundColor: '#89023E',
    marginTop: 17,
    padding: 5,
    textAlign: 'center',
    width: '100%'
  },

  error: {
    color: '#ee0000'
  },

  header: {
    textAlign: 'center',
    fontSize: 32,
    marginTop: 10,
    marginBottom: 10
  },

  paragraph: {
    fontSize: 19,
    textAlign: 'center'
  },

  container: {
    padding: 25,
    textAlign: 'center',
    marginTop: 20
  }
})

export default LoginScreen;

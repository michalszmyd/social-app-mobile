import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import NewPostScreen from '../screens/NewPostScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Profile: ProfileScreen,
  Login: LoginScreen
});

const MyProfileStack = createStackNavigator({
  MyProfile: MyProfileScreen
});

const NavigationStack = createBottomTabNavigator({
  Home: { screen: HomeStack, navigationOptions: {
    tabBarLabel: 'Home',
    titleDisplayMode: 'alwaysHide',
    tabBarIcon: ({ tintColor }) => (
      <Icon name='home' color={'gray'} size={26} />
    )
  } },
  NewPostScreen: { screen: NewPostScreen, navigationOptions: {
    tabBarLabel: 'Add',
    tabBarIcon: ({ tintColor }) => (
      <Icon name='plus' color={'gray'} size={26} />
    )
  } },
  MyProfile: { screen: MyProfileStack, navigationOptions: {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Icon name='user' color={'gray'} size={26} />
    )
  } }
});

const LoginStack = createSwitchNavigator({
  Login: { screen: LoginScreen },
  Home: { screen: NavigationStack }
});

const ScreenNavigator = createSwitchNavigator({
  Login: { screen: LoginStack }
});

export default createAppContainer(ScreenNavigator);

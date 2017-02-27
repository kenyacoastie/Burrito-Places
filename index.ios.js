import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TabBarIOS,
  View
} from 'react-native';
import PlaceMap from './place_map';
import AddPlace from './add_place';
import FavoriteList from './favorites_list';
import axios from 'axios';

//trying to add firebase to get places to persist
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCuS8AQHBBkbJROdnw0-DYhVbqIuZFfDAs",
    authDomain: "burrito-place.firebaseapp.com",
    databaseURL: "https://burrito-place.firebaseio.com",
    storageBucket: "burrito-place.appspot.com",
    messagingSenderId: "154523955633"
  };
  firebase.initializeApp(config);

export default class BurritoPlaces extends Component {

  constructor() {
    super();
    this.state = {
      selectedTab: 0,
      //initial data to load pins
      annotations: [
        {
          title: 'Home',
          latitude: 40.7788104,
          longitude: -73.94732549999999
        },
        {
          title: 'General Assembly',
          latitude: 40.7398848,
          longitude: -73.9900818
        },
        {
          title: 'Shake Shack',
          latitude: 40.7420371,
          longitude: -73.9875635
        }
      ]
    }
  }

  handleTabPress(tab) {
    this.setState({ selectedTab: tab })
  }

  handleAddPlace(annotation) {
    //add new places to state annotations to display pin on map
    const annotations = this.state.annotations.slice();
    annotations.push(annotation);
    this.setState({ annotations });
  }

  postData() {
    //trying to get firebase to work, unsuccessful thus far
    axios({
      method: 'POST',
      url: `https://burrito-place.firebaseio.com/`,
      data: {
        address: 'test'
      }
    }).then((response) => {
      console.log(response);
    })
  }
  //tabBarIOS component is the bottom menu, define each view within
  //that navigation
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="places"
          systemIcon="favorites"
          selected={this.state.selectedTab === 0}
          onPress={this.handleTabPress.bind(this, 0)}
        >
        <PlaceMap
          annotations={this.state.annotations}
          onAddPlace={this.handleAddPlace.bind(this)} />
      </TabBarIOS.Item>
      <TabBarIOS.Item
        title="Place"
        icon={require('./assets/pin.png')}
        selected={this.state.selectedTab === 1}
        onPress={this.handleTabPress.bind(this, 1)}
      >
      <AddPlace onAddPlace={this.handleAddPlace.bind(this)}  />
      </TabBarIOS.Item>
    </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
  view: {
    backgroundColor: '#fed',
    flex: 1
  }
});

AppRegistry.registerComponent('BurritoPlaces', () => BurritoPlaces);

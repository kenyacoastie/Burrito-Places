![Map Image](http://i.imgur.com/teDgsqol.jpg)
![Burrito Map](http://i.imgur.com/n5sALLJl.png)

# Burrito Places
Ever wonder where to get a great burrito fast? Burrito Places is your answer. Using geolocation coordinates and the Google Places API, when the app loads
the user is focused in on their current location and all the burrito spots within a 5000 meter radius are indicated with a burrito emoji. Click on the burrito
and you are shown that restaurant's burrito rating. You can also drop custom pins with the add place functionality. Just click on the places tab on the bottom
and you are brought to a form where you can enter in a name and address. After that location is added, it will show up on the map as a red pin. All locations
on the map also include a navigation button, which links to Apple Maps and will provide step-by-step navigation for you to get to that destination, whether by car, 
subway, or on foot. 

##Technologies Used
- React Native
- Xcode
- Axios
- Google Geocoding API
- Google Places API

##Functionality Pictures
![Home Screen](http://i.imgur.com/fsOT8D0l.jpg)
![Add Form](http://i.imgur.com/Q32vpK2l.png)
![Add Place](http://i.imgur.com/R0YphNBl.png)
![Place Added](http://i.imgur.com/cREiCy9l.jpg)
![Navigation](http://i.imgur.com/VaCLx11l.png)
![Navigation in Action](http://i.imgur.com/GO78uDpl.png)

###Info on Installing React Native and Getting Up and Running
[Getting Started with React Native](https://facebook.github.io/react-native/docs/getting-started.html)

##Add_Place Component
````
export default class AddPlace extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      latitude: '',
      longitude: '',
      titleError: '',
      addressError: '',
    };
    this.handleAddPlace = this.handleAddPlace.bind(this);
  }

  handleAddPlace() {
    const { title, address } = this.state;
    let titleError = '';
    let addressError = '';
    if (!title) {
      titleError = 'Name is required.';
    }
    if (!address) {
      addressError = 'Address is required.';
    }
    this.setState({
      titleError,
      addressError
    });

    const isError = titleError || addressError;
    if (!isError) {
      //axios call to use address as opposed to lat and lng
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=AIzaSyBCPfaR4w1Bgm5B4CrrYISWqx0BqsmKEsw`)
      .then((response) => {
        this.props.onAddPlace({
          title,
          latitude: parseFloat(response.data.results[0].geometry.location.lat),
          longitude: parseFloat(response.data.results[0].geometry.location.lng)
        });
      })
      AlertIOS.alert(
        'Place added',
        'Your place is added to the map. Click on the Favorites tab to view.'
      );
    dismissKeyboard();
    }
  }

  render() {
    //form for adding a new location to favorites
    return (
      <View style={styles.view}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.textInput}
          value={this.state.title}
          onChangeText={(title) => this.setState({ title })}>
        </TextInput>
        <Error message={this.state.titleError} />
        <Text style={styles.text}>Address</Text>
        <TextInput
          keyboardType="numbers-and-punctuation"
          style={styles.textInput}
          onChangeText={(address) => this.setState({ address })}></TextInput>
        <Error message={this.state.addressError} />
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.handleAddPlace()}>
          <Text style={styles.buttonText}>Add Place</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

//define the error messages when no data is entered into the input fields
const Error = (props) => {
  return (
    <Text style={styles.error}>{props.message}</Text>
  );
}

```

###Build Strategy
Based on my love for React, I decided early that I wanted to try my hand at React Native and build a mobile app. I went through several tutorials
to find my bearings and then began to code. First I built the index.ios.js component and hardcoded in some geolocation data to get myseful up and running.
Once that was complete, I then added the add_place component and the ability to drop pins on the map. Afterwards, I added the navigation capabilities through 
Apple Maps and the React Native Linking interface. After that was working, I was then able to build all the features I wanted, namely using the Google 
geocoding API to grab a user's location and the Google places API to find all the nearby burrito spots and give a rating.

###Complications/Future Improvements
I would like to add a backend, particularly Firebase since it works so well with React and React Native, so that I can render a list of all the favorite places
that a user has added to the map. Also, the app is currently only available on IOS, would like to eventually add Android functionality. 

####Authors
Matt Kersner

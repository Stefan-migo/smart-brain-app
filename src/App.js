import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import 'tachyons';
import Particle from './components/Particle/Particles';
import { Component } from 'react';

import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


const initialState = { //state object
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name:'',
      email: '',
      entries: 0,
      joined: ''
    }
  }


// creating a smart component 'The App' 
class App extends Component {
  //setting a state in the app
  constructor() {
    super();
    this.state = initialState;
  }


// loadUser ()
// this function set the state of a user profile (object)
loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

// function to calculate the face's location points, 
  calculateFaceLocation = (data) => {
    const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image= document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifiFace.left_col * width,
      topRow: clarifiFace.top_row * height,
      rightCol: width - (clarifiFace.right_col * width),
      bottomRow: height - (clarifiFace.bottom_row * height),
    };

  }
  
  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  } 
  
  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://smart-brain-server.onrender.com/imageurl', {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('https://smart-brain-server.onrender.com/image', {
          method: 'put',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState({user: Object.assign(this.state.user, { entries: count })})
      })
      this.displayFaceBox(this.calculateFaceLocation(response))
    }
  })
      .catch(err => console.log (err));
  }

  onRouteChange = (route) => {   
    if (route === 'signin') {
      this.setState(initialState)
    } else if (route ==='home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

render() {
  const { isSignedIn, imageUrl, route, box, user } = this.state;
  return (
    <div className="App">
      <Particle />
      <Navigation 
        isSignedIn={isSignedIn} 
        onRouteChange={this.onRouteChange}
      />
      { route === 'home' //it makes isSignedIn true and it will return:
      ? <div>
          <Logo />
          <Rank 
          entries={user.entries}
          name={user.name}/>
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onPictureSubmit={this.onPictureSubmit}/>
          <FaceRecognition 
            imageUrl={imageUrl}
            box={box}
            />
        </div>
      : (
        route === 'signin'
      ? <SignIn 
        loadUser={this.loadUser}
        onRouteChange={this.onRouteChange}/>
      : <Register 
        loadUser={this.loadUser}
        onRouteChange={this.onRouteChange}
        />  
      )
      }
    </div>
  );
}
}
  

export default App;

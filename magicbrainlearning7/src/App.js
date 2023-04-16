import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import BrainImage from './Components/BrainImage/BrainImage';
import UserRank from './Components/UserRank/UserRank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignInForm from './Components/SignInForm/SignInForm';
import RegisterForm from './Components/RegisterForm/RegisterForm';
import ParticlesBg from 'particles-bg';
import Clarifai from 'clarifai';

window.process = {};

const app = new Clarifai.App({
  apiKey: '82819b6c8d2d4417abbdebb80e6a3cdc'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * imageWidth,
      topRow: clarifaiFace.top_row * imageHeight,
      rightCol: imageWidth - (clarifaiFace.right_col * imageWidth),
      bottomRow: imageHeight - (clarifaiFace.bottom_row * imageHeight)
    }
  };

  setFaceLocation = (box) => {
    this.setState({box: box});
  };

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL, this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3001/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count }))
        })
        this.setFaceLocation(this.calculateFaceLocation(response))
      }
    })
    .catch(error => console.log(error))
  };

  onChangeRouteClick = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    } else {
      this.setState({isSignedIn: false})
    }
    this.setState({route: route})
  }

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      entries: user.entries,
      joined: user.joined
    }})
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg type="circle" bg={true} />
        <Navigation onChangeRouteClick={this.onChangeRouteClick} isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home'
        ? <div>
            <BrainImage />
            <UserRank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
          </div>
        : ( this.state.route === 'signin'
          ? <SignInForm onChangeRouteClick={this.onChangeRouteClick} />
          : <RegisterForm onChangeRouteClick={this.onChangeRouteClick} loadUser={this.loadUser}/>
        )
        }
      </div>
    )
  }
}

export default App;

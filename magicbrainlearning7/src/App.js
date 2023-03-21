import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import BrainImage from './Components/BrainImage/BrainImage';
import UserRank from './Components/UserRank/UserRank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
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
      imageURL: ''
    };
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.CELEBRITY_MODEL, this.state.input)
    .then(response => console.log(response.outputs[0].data.regions[0].region_info.bounding_box))
    .catch(error => console.log(error))
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg type="circle" bg={true} />
        <Navigation />
        <BrainImage />
        <UserRank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageURL={this.state.imageURL} />
      </div>
    )
  }
}

export default App;

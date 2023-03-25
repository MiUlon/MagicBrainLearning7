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
      imageURL: '',
      box: {}
    };
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log('1. First coordinations: ', clarifaiFace);
    const image = document.getElementById('inputImage');
    console.log('2. Image: ', image)
    const imageWidth = Number(image.width);
    console.log('3. Width: ', imageWidth)
    const imageHeight = Number(image.height);
    console.log('4. Height: ', imageHeight)
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
    .then(response => this.setFaceLocation(this.calculateFaceLocation(response)))
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
        <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
      </div>
    )
  }
}

export default App;

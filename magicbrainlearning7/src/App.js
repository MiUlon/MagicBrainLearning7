import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import BrainImage from './Components/BrainImage/BrainImage';
import UserRank from './Components/UserRank/UserRank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: ''
    };
  };

  onInputChange = (event) => {
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    console.log('click');
  };

  render() {
    return (
      <div className='App'>
        <ParticlesBg type="circle" bg={true} />
        <Navigation />
        <BrainImage />
        <UserRank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      </div>
    )
  }
}

export default App;

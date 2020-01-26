import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
 apiKey: '082b225776e84380b4895aebaf7ec422'
});

const particlesOption = {
  particles: {
    number: {
      value: 250,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {}, //start of with an empty object
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width); //ensures that it's a number; note:we focused the width to always be 500px
    const height = Number(image.height);
    console.log(width,height,clarifaiFace);
//  we want to return an object that will fill up the 'box' state. The object will need to figure out the
//  first,second,third and forth dot and wrap it around the border.
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height, //height of it is the percentage
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  } 

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmitClick = () => {
    this.setState({imageURL: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => this.calculateFaceLocation(response))
      .catch(err => console.log(err)); //catch works like an else statement 
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' 
          params={particlesOption}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onSubmit={this.onSubmitClick}
        />
        <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;

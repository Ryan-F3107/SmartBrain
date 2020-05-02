import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register'
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

const initialState = {
  input: '',
  imageURL: '',
  box: {}, //start of with an empty object
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  } //end of user
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  } //end of constructor

  loadUser = (data) => {
    this.setState({user: {
       id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.entries
    }})
  } 

  //CHECK
  // //point to instantiate the network request, a livecycle hook that comes with react.
  // componentDidMount() {
  //   fetch('http://localhost:3000/')//backend is running on localHost 3000, reading the base with '/'
  //     .then(response => response.json())//we use .json so  that we can read it
  //     .then(console.log)//the data will automatically get added in; instead of data => console.log(data);
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width); //ensures that it's a number; note:we focused the width to always be 500px
    const height = Number(image.height);
    console.log(" Width and Height of image is : ",width,height);
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
    this.setState({imageURL: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })  //end of fetch block
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log) //improves error handling
        } //end of if statement 
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      .catch(err => console.log(err)); //catch works like an else statement 
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState) //reset the state.
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
//FaceRecognition will take in the state of the box to draw the box on the image of the face being detected
  render() {
    const { isSignedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' 
          params={particlesOption}
        />
        <Navigation isSignedIn = {isSignedIn }onRouteChange={this.onRouteChange}/>
        { route === 'home' ?
          <div>
            <Logo /> 
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onSubmit={this.onSubmitClick}
            />
            <FaceRecognition box ={box} imageURL={imageURL} />
          </div>
          : (
              this.state.route === 'signin' ?
                <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>  
            )
        }  
      </div>
    );
  }
}

export default App;

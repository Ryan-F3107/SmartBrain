import React from 'react';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value})
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {
		fetch('https://quiet-waters-20582.herokuapp.com//signin', { //the second parameter is needed to send the information in the form of a POST request
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ //sent in the form of JSON
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})//fetch by default does a get request but we want to do a POST request
			.then(response => response.json())
	    	.then(user => {
		        if(user.id){ //if user has an id
		          this.props.loadUser(user);
		          this.props.onRouteChange('home');
		        }
	    })
	}

	render() {
		const { onRouteChange } = this.props;
		return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input 
			        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" name="email-address"  
			        	id="email-address"
			        	onChange={this.onEmailChange}	//after the sign in buton is clicked
			        	 />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" name="password" 
			        	id="password" 
			        	onChange={this.onPasswordChange} //after the sign in button is clicked
			        	/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input
			      	onClick = {this.onSubmitSignIn} // When the sign in button is clicked
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
			    </div>
			    <div className="lh-copy mt3">
			      <p onClick = {() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
			    </div>
			  </div>
			</main>
		</article>	
		);
	}
}

export default Signin;
//<form>...</form> always try and submit something if it contains <input>, so we changed it to <div>
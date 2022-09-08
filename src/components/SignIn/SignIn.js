import React from 'react';
import { Component } from 'react';
import Dialog from './Dialog';

// turn the function into a smart component(class) 
// with a smart component you can acces to state
class SignIn extends Component {
    //create the state of this smart component
    constructor(props) { // in order to create that state you need a constructor
        super(props); // also a super, both with props. I'm not sure why though
        this.state = { //state is an object, to call it you need to acces by 'this'
            signInEmail: '',
            signInPassword: '',
            showDialog: false
        };
    }

    //function that listens to the email input (check render function) and set te state with that information
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }
    //function that listens to the password input (check render function) and set te state with that information
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }
    
    //function that sends the information of email and password inputs to the server.
    onSubmitSignIn = (event) => {
        //this will prevent the browser from sending data via the default get method (<form> tag). 
        event.preventDefault()
        //fetch is a sort of request function to call APIs or servers.
        //it is a async function and also a promise. 
        //first parameter takes the address of the called information.
        //fetch does by default a get request. we need to do a post request
        //so in the second parameter we add an object specifying the post request
        fetch('https://smart-brain-server.onrender.com/signin', {
            method: 'post', //post request
            headers: {'Content-Type': 'application/json'}, //leting the server know we post the data with json code
            body: JSON.stringify({  //turning the body object into json code
                email: this.state.signInEmail, // body is the place where the request information goes.
                password: this.state.signInPassword //body is an object with information we send(post) in the request.
            })
        })
        //'.then' takes as a parameter the last function's data returned
        //'.then' is a function that happens after the fetch call. it takes the response which the server sends back after a request.
        .then(response => response.json()) //turning the response into json code
        .then(user => { // user === response.json
            if (user.id) { //does the user exist? did we receive a user with a property of id?
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                this.setState({showDialog: true});
            }
        })
    }
    taskShowDialog = () => {
        this.setState({showDialog: false});
    }
        
    // a smart component has a render method (it's a function called method).
    // its the place where you can write in htmlish (json?).
    render() {
        const { onRouteChange } = this.props;
        const { showDialog } = this.state;
        return (
            <div>
            { showDialog === false 
            ?<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                        <main className="pa4 black-80">
                            <form className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="center f2 fw6 ph0 mh0">Sign In</legend>
            {/*email input*/ }
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                    required/>
                                </div>
            {/*paswword input*/}
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                    required/>
                                </div>
                                    <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                            </fieldset>
                            <div className="">
            {/*sign in submit button*/}
                                <input 
                                onClick= {this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                                />
                            </div>
            {/*register form link*/}
                            <div className="lh-copy mt3">
                                <p onClick= {() => onRouteChange('register')} 
                                href="#0" 
                                className="f6 link dim black db pointer"
                                >Register</p>
                            </div>
                            </form>
                        </main>
                </article> 
            :<div>
                <Dialog show={this.taskShowDialog}/>
            </div>
            }
            </div> 
        )    
    }
    
}

// exporting the smart component for other files to use it.
export default SignIn;
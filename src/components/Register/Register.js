import React from 'react';
import { Component } from 'react';
import Dialog from './Dialog';

// turn into a smart component (it has a this.state)
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { //with this.props you can call a funtion from the root(app component)
            name: '',
            password: '',
            email: '',
            showDialog: false
        };
    }

    //function that listens to the name input (check render function) and set te state with that information
    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    //function that listens to the email input (check render function) and set te state with that information
    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    //function that listens to the password input (check render function) and set te state with that information
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    //function that sends the information of the register form inputs to the server.
    onSubmitRegister = (event) => {
        //this will prevent the browser from sending data via the default get method (<form> tag). 
        event.preventDefault()
        //fetch is a sort of request function to call APIs or servers.
        //it is a async function and also a promise. 
        //first parameter takes the address of the data we want to call.
        //fetch does by default a get request. we need to do a post request
        //so in the second parameter we add an object specifying the post request
        fetch('https://smart-brain-server.onrender.com/register', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'}, //leting the server know we post the data with json code
            body: JSON.stringify({  //turning the body object into json code
                name: this.state.name, // body is the place where the request information goes.
                email: this.state.email, //body is an object with information we send(post) in the request.
                password: this.state.password
            })
        })
        //'then' takes as a parameter the last function's data returned
        //'.then' is a function that happens after the fetch call. it takes the response sent back by the server after a request.
        .then(response => response.json()) //turning the server's response into json code
        .then(user => { //user === response.json (last user registered)
            if (user.id) {
                this.props.loadUser(user) //function that the entire app needs. it is imported from the app component
                this.props.onRouteChange('home') //function called from the app(root) component
            } else {
                this.setState({showDialog: true});
            }   
        })
    }

    taskShowDialog = () => {
        this.setState({showDialog: false});
    }

    render() {
        const { showDialog } = this.state;
        return (
            <div>
                { showDialog === false
                ?<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                                    <main className="pa4 black-80">
                                        <form className="measure">
                                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                            <legend className="center f2 fw6 ph0 mh0">Register</legend>
                        {/*name input*/}                     
                                            <div className="mv3">
                                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                                <input 
                                                onChange={this.onNameChange}
                                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                                type="text" 
                                                name="text"  
                                                id="text"
                                                required/>
                                            </div>
                        {/*email input*/}                         
                                            <div className="mt3">
                                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                                <input 
                                                onChange={this.onEmailChange}
                                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                                type="email" 
                                                name="email-address"  
                                                id="email-address"
                                                required/>
                                            </div>
                        {/*password input*/}                     
                                            <div className="mv3">
                                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                                <input 
                                                onChange={this.onPasswordChange}
                                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                                type="password" 
                                                name="password"  
                                                id="password"
                                                required/>
                                            </div>
                                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                                        </fieldset>
                                        <div className="">
                        {/*submit buttton*/}                    
                                            <input 
                                            onClick= {this.onSubmitRegister}
                                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                            type="submit" 
                                            value="Sign Up"/>
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
export default Register;
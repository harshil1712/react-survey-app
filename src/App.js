import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid');
var firebase = require('firebase');
var config = {
  apiKey: /* your apiKey */,
  authDomain: /* your authDomain */,
  databaseURL: /* your databaseURL */,
  projectId: /* your projectId */,
  storageBucket: /* your storageBucket */,
  messagingSenderId: /* your messagingSenderId */
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      id:uuid.v1(),
      name:'',
      answers:{
        q1:'',
        q2:'',
        q3:'',
        q4:''
      },
      submitted: false
    }
    this.handleQuesChange = this.handleQuesChange.bind(this);
  }

  handleNameSubmit(event){
    var name=this.refs.name.value;
    this.setState({name:name}, function(){
      // console.log(this.state);
    });    
    event.preventDefault();
  }

  handleQueSubmit(event){
    firebase.database().ref('surveys/'+this.state.id).set({
      name:this.state.name,
      answers:this.state.answers
    });
    this.setState({submitted:true}, function(){
      console.log('submited');
    })
    event.preventDefault();
  }

  handleQuesChange(event){
    var answers = this.state.answers;
    if(event.target.name === 'q1'){
      answers.q1 = event.target.value;
    }
    else if(event.target.name === 'q2'){
      answers.q2 = event.target.value;
    }
    else if(event.target.name === 'q3'){
      answers.q3 = event.target.value;
    }
    else if(event.target.name === 'q4'){
      answers.q4 = event.target.value;
    }
    this.setState({answers:answers}, function(){
      console.log(this.state);
    });
  }

  render() {
    var user, questions;
    if(this.state.name && this.state.submitted===false){
      user = <h2> Welcome {this.state.name}</h2>;
      questions = 
      <span>
        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQueSubmit.bind(this)}>
          <div>
            <label>Which is your favourite operating system?</label><br/>
            <input type='radio' name='q1' value='Windows' onChange={this.handleQuesChange} />Windows<br/>
            <input type='radio' name='q1' value='OSX' onChange={this.handleQuesChange} />OSX<br/>
            <input type='radio' name='q1' value='Linux' onChange={this.handleQuesChange} />Linux<br/>
            <input type='radio' name='q1' value='Other' onChange={this.handleQuesChange} />Other<br/>
          </div>
          <div>
            <label>Which is your favourite brand of TV?</label><br/>
            <input type='radio' name='q2' value='Sony' onChange={this.handleQuesChange} />Sony<br/>
            <input type='radio' name='q2' value='Samsung' onChange={this.handleQuesChange} />Samsung<br/>
            <input type='radio' name='q2' value='LG' onChange={this.handleQuesChange} />LG<br/>
            <input type='radio' name='q2' value='Other' onChange={this.handleQuesChange} />Other<br/>
          </div>
          <div>
            <label>Which is your favourite smartphone brand?</label><br/>
            <input type='radio' name='q3' value='Apple' onChange={this.handleQuesChange} />Apple<br/>
            <input type='radio' name='q3' value='Samsung' onChange={this.handleQuesChange} />Samsung<br/>
            <input type='radio' name='q3' value='Google' onChange={this.handleQuesChange} />Google<br/>
            <input type='radio' name='q3' value='Other' onChange={this.handleQuesChange} />Other<br/>
          </div>
          <div>
            <label>Which is your favourite CPU brand?</label><br/>
            <input type='radio' name='q4' value='Intel' onChange={this.handleQuesChange} />Intel<br/>
            <input type='radio' name='q4' value='AMD' onChange={this.handleQuesChange} />AMD<br/>
            <input type='radio' name='q4' value='Nvidia' onChange={this.handleQuesChange} />Nvidia<br/>
            <input type='radio' name='q4' value='Other' onChange={this.handleQuesChange} />Other<br/>
          </div>
          <input type='submit' value='Submit' />
        </form>
      </span>;
    }
    else if(!this.state.name && this.state.submitted===false){
      user = <span>
              <h2> Please enter your name to begin the survey</h2>
              <form onSubmit={this.handleNameSubmit.bind(this)}>
                <input type='text' placeholder='Enter Name ...' ref='name' />
              </form>
            </span>;
      questions = '';
    }
    else if(this.state.submitted===true){
        user= <h2> Thank You {this.state.name}</h2>
    }
    return (
      <div className="App">
        <header className="App-header text-center">
          <h1 className="App-title">React Survey App</h1>
        </header>
        <div className='text-center'>
          {user}
        </div>
        <div className='container'>
        {questions}
        </div>
      </div>
    );
  }
}

export default App;

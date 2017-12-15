import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      id:'',
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
      console.log(this.state);
    });    
    event.preventDefault();
  }

  handleQueSubmit(){

  }

  handleQuesChange(event){
    console.log(event.target.value);
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

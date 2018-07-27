import React, { Component } from 'react';
import './Form.css';

class Form extends Component{
  constructor(props){
    super(props);
    this.state = {
      newopportunityTitle: '',
      newopportunityCompany: '',
      newopportunityLocation: '',
      newopportunityDescription: '',
      newopportunityLink: '',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeOpportunity = this.writeOpportunity.bind(this);
  }

//Sets the newopportunityTitle to the e.target.value
  handleUserInput(e){
      this.setState({
        newopportunityTitle: e.target.value.newopportunityTitle, //the value of the text input
        newopportunityCompany: e.target.value.newopportunityCompany,
        newopportunityLocation: e.target.value.newopportunityLocation,
        newopportunityDescription: e.target.value.newopportunityDescription,
        newopportunityLink: e.target.value.newopportunityLink,
      })
    }

  writeOpportunity(){
    //call a method that sets the content to the handleUserInput
    this.props.addOpportunity(this.state.newopportunityTitle,
                              this.state.newopportunityCompany,
                              this.state.newopportunityLocation,
                              this.state.newopportunityDescription,
                              this.state.newopportunityLink);

    //set newopportunityTitle to empty string
    this.setState({
      newopportunityTitle: '',
      newopportunityCompany: '',
      newopportunityLocation: '',
      newopportunityDescription: '',
      newopportunityLink: '',
    })
  }
  render(){
    return(
      <div className="inputWrapper">
        <input className="titleInput"
          placeholder="Title..."
          value={this.state.newopportunityTitle}
          onChange={this.handleUserInput}/>
        <input className="companyInput"
            placeholder="Company..."
            value={this.state.newopportunityCompany}
            onChange={this.handleUserInput}/>
        <input className="locationInput"
            placeholder="Location..."
            value={this.state.newopportunityLocation}
            onChange={this.handleUserInput}/>
        <input className="descriptionInput"
            placeholder="Description..."
            value={this.state.newopportunityDescription}
            onChange={this.handleUserInput}/>
        <input className="linkInput"
            placeholder="Link..."
            value={this.state.newopportunityLink}
            onChange={this.handleUserInput}/>
        <button className="noteButton"
        onClick={this.writeOpportunity}> Add Opportunity</button>
      </div>
    )
  }
}

export default Form

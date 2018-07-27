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
    /* Her kan du bare bruke e.target.value for å hente verdi */
    /* Du kan også bruke e.target.name for å identifisere hvilken input det er.
      Da må hver input lenger nede ha input-feltet definert */
    const name = e.target.name; 
    const value = e.target.value;
    
    /* ...this.state er en måte å kopiere alt på. Det betyr bare "hent alt i objektet"
      F.eks. kan du si 
      const newState = {
        ...this.state,
        newopportunityTitle: 'Denne vil overskrive opprinnelig title som finnes i this.state'
      }
      */
    const newState = {
      ...this.state
    }
    newState[name] = value

    this.setState(newState)
  }

  writeOpportunity(){
    //call a method that sets the content to the handleUserInput

    /* Dette er en annen måte å hente ut verdier fra objekter på 
      Her hentes de 5 feltene altså fra objektet this.state 
      Veldig vanlig om du ønsker å trekke ut verdier i starten for å bruke dem 
      senere */
    const {newopportunityTitle, newopportunityCompany, 
    newopportunityLocation, newopportunityDescription, newopportunityLink} = this.state;
    
    // console.log('Title', newopportunityTitle);
    // console.log('Company', newopportunityCompany);
    // console.log('Location', newopportunityLocation);
    // console.log('Description', newopportunityDescription);
    // console.log('Link', newopportunityLink);
    
    /* Siden state bare er et objekt, trenger vi ikke å lage nytt objekt som under,
      vi kan bare bruke state-objektet som sendes til App.addOpportunity */
    this.props.addOpportunity(this.state);

    //set newopportunityTitle to empty string
    // this.setState({
    //   newopportunityTitle: '',
    //   newopportunityCompany: '',
    //   newopportunityLocation: '',
    //   newopportunityDescription: '',
    //   newopportunityLink: '',
    // })
  }
  render(){
    console.log(this.state)
    return(
      <div className="inputWrapper">
        <input className="titleInput"
          placeholder="Title..."
          name="newopportunityTitle"         /* Lagt til */
          onChange={this.handleUserInput}/>
        <input className="companyInput"
            placeholder="Company..."
            name="newopportunityCompany"      /* Lagt til */
            onChange={this.handleUserInput}/>
        <input className="locationInput"
            placeholder="Location..."
            name="newopportunityLocation"    /* Lagt til */
            onChange={this.handleUserInput}/>
        <input className="descriptionInput"
            placeholder="Description..."
            name="newopportunityDescription"   /* Lagt til */
            onChange={this.handleUserInput}/>
        <input className="linkInput"
            placeholder="Link..."
            name="newopportunityLink"          /* Lagt til */
            onChange={this.handleUserInput}/>
        <button className="noteButton"
        onClick={this.writeOpportunity}> Add Opportunity</button>
      </div>
    )
  }
}

export default Form

import React, { Component } from 'react';
import './Form.css';

class Form extends Component{
  constructor(props){
    super(props);
    this.state = {
      type: '',
      Title: '',
      Company: '',
      Location: '',
      Description: '',
      Link: '',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeOpportunity = this.writeOpportunity.bind(this);
    this.momdad = this.momdad.bind(this);

    // this.handleUserType = this.handleUserType.bind(this);
  }

//Sets the newopportunityTitle to the e.target.value
momdad() {
  alert("ok");
}

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

    console.log(newState, 'this is newstate')

    this.setState(newState)
  }

  // handleUserType(e){
  //   this.setState({
  //     type: e.target.value
  //   });
  // }



  writeOpportunity(){

    /* Dette er en annen måte å hente ut verdier fra objekter på
      Her hentes de 5 feltene altså fra objektet this.state
      Veldig vanlig om du ønsker å trekke ut verdier i starten for å bruke dem
      senere */
    console.log('dette er this state')
    const {Type, Title, Company,
    Location, Description, Link} = this.state;

    this.props.addOpportunity(this.state);




  }



  render(){
    console.log(this.state)
    return(
      <div>
        {/* <label>
          Pick your opportunity type:
          <select value={this.state.type} onChange={this.handleUserInput}>
            <option name="job">Job</option>
            <option name="event">Event</option>
            <option name="program">Program</option>
          </select>
        </label> */}
        <input className="titleInput"
          placeholder="Type..."
          name="Type"         /* Lagt til */
          onChange={this.handleUserInput}/>
        <input className="titleInput"
          placeholder="Title..."
          name="Title"         /* Lagt til */
          onChange={this.handleUserInput}/>
        <input className="companyInput"
            placeholder="Company..."
            name="Company"      /* Lagt til */
            onChange={this.handleUserInput}/>
        <input className="locationInput"
            placeholder="Location..."
            name="Location"    /* Lagt til */
            onChange={this.handleUserInput}/>
        <input className="descriptionInput"
            placeholder="Description..."
            name="Description"   /* Lagt til */
            onChange={this.handleUserInput}/>
        <input className="linkInput"
            placeholder="Link..."
            name="Link"          /* Lagt til */
            onChange={this.handleUserInput}/>
        <button className="noteButton"
        onClick={this.writeOpportunity}> Add Opportunity</button>
      </div>
    )
  }
}

export default Form

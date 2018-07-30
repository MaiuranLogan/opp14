import React, { Component } from 'react';
import Opportunity from "./components/Opportunity/Opportunity.jsx";
import Form from "./components/Form/Form";
import { DB_CONFIG } from './Config/Config';
import firebase from 'firebase';
import 'firebase/database';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);

    this.addOpportunity = this.addOpportunity.bind(this);
    this.removeOpportunity = this.removeOpportunity.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('opportunities');

    //We are going to setup the React state of our component
    this.state = {
      opportunities: [],
      type: '',
    }

  }


  componentWillMount(){
    const previousOpportunities = this.state.opportunities;

    // Data Snapshot
    this.database.on('child_added', snap => {
      const opportunity = snap.val()

      /*Bug: det som var problemet var at snap.val() returnerer hele
      objektet som ble lagret, så opportunityTitle ble hele objektet,
      og deretter lagret du resten dobbelt :) */
      // previousOpportunities.push({
      //   id: snap.key,
      //   opportunityTitle: snap.val(),
      //   opportunityCompany: snap.val().opportunityCompany,
      //   opportunityLocation: snap.val().opportunityLocation,
      //   opportunityDescription: snap.val().opportunityDescription,
      //   opportunityLink: snap.val().opportunityLink,
      // })

      /* Du kan derfor gjøre slik */
      previousOpportunities.push({
        ...snap.val(),
        id: snap.key
      })

      this.setState({
        opportunities: previousOpportunities
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousOpportunities.length; i++){
        if(previousOpportunities[i].id === snap.key){
          previousOpportunities.splice(i, 1);
      }
    }

    this.setState({
      opportunities: previousOpportunities
    })
  })
}


  removeOpportunity(opportunityId){
    console.log('removing opportunity', opportunityId)
    this.database.child(opportunityId).remove();
  }

  addOpportunity(opportunity){
      // console.table(opportunity)
      /* Husk at vi bare sendte state-objektet fra Form, så det er jo bare å pushe den
         rett til databasen! :) */
      this.database.push(opportunity);
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

  render() {
    // console.log('opportunities', this.state.opportunities)
    return (
    <div className="opportunityWrapper">
      <div className="OpportunityBody">
        <div className="OpportunityHeader"> Input Opportunity </div>
        <input className="titleInput"
          placeholder="Type..."
          name="type"
          onChange={this.handleUserInput}         /* Lagt til */
        />
        <button className="noteButton"
          onClick={this.handleUserInput}> Select Type </button>

        {this.state.type === 'job' && <Form type={this.state.type} addOpportunity={this.addOpportunity} />}
        {this.state.type === 'event' && <Form type={this.state.type} />}
        {this.state.type === 'program' && <Form type={this.state.type} />}

      </div>
      <div className="OpportunityBody">
        <div className="OpportunityHeader"> All Opportunities </div>
                {
                  this.state.opportunities.map((opportunity, i) => {

                    /* Her er det noe i databasen som gjør at vi får dobbelt.
                      For nå, så henter vi bare det innerste objektet (opportunityTitle), siden det er
                      den som blir registrert riktig
                      EDIT: Se kommentar i componentWillMount() */

                    return (
                        <Opportunity
                        key={i} /* Når man bruker map og genererer elementer må man ha en key for hvert element */
                        opportunityTitle={opportunity.opportunityTitle}
                        opportunityCompany={opportunity.opportunityCompany}
                        opportunityLocation={opportunity.opportunityLocation}
                        opportunityDescription={opportunity.opportunityDescription}
                        opportunityLink={opportunity.opportunityLink}
                        opportunityId={opportunity.id}
                        key={opportunity.id}
                        removeOpportunity={this.removeOpportunity}
                      />
                    )
          })
        }
          </div>
      </div>

    )
  }
}

export default App;

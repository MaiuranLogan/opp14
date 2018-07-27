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

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('opportunities');

    //We are going to setup the React state of our component
    this.state = {
      opportunities: [],
    }
  }

  componentWillMount(){
    const previousOpportunities = this.state.opportunities;

    // Data Snapshot
    this.database.on('child_added', snap => {
      previousOpportunities.push({
        id: snap.key,
        opportunityTitle: snap.val(),
        opportunityCompany: snap.val().opportunityCompany,
        opportunityLocation: snap.val().opportunityLocation,
        opportunityDescription: snap.val().opportunityDescription,
        opportunityLink: snap.val().opportunityLink,
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

  addOpportunity(opportunity){
    // console.table(opportunity)
    /* Husk at vi bare sendte state-objektet fra Form, så det er jo bare å pushe den 
       rett til databasen! :) */
    this.database.push(opportunity);
  }

  removeOpportunity(opportunityId){
    this.database.child(opportunityId).remove();
  }

  render() {
    // console.log('opportunities', this.state.opportunities)

    return (
    <div className="opportunityWrapper">
      <div className="OpportunityBody">
        <div className="OpportunityHeader"> Input Opportunity </div>
        <Form addOpportunity={this.addOpportunity}/>
      </div>
      <div className="OpportunityBody">
        <div className="OpportunityHeader"> All Opportunities </div>
        {
          this.state.opportunities.map((FIX_BUG, i) => {
            
            /* Her er det noe i databasen som gjør at vi får dobbelt.
              For nå, så henter vi bare det innerste objektet (opportunityTitle), siden det er 
              den som blir registrert riktig */
            const opportunity = FIX_BUG.opportunityTitle;

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

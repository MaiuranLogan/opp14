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
    console.log('componentWillMount opportunities', previousOpportunities);

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

      console.log('after', previousOpportunities);

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

  addOpportunity(newOpportunityTitle, newopportunityCompany, newopportunityLocation, newopportunityDescription, newopportunityLink){
    this.database.push({opportunityTitle: newOpportunityTitle,
                              opportunityCompany: newopportunityCompany,
                              opportunityLocation: newopportunityLocation,
                              opportunityDescription: newopportunityDescription,
                              opportunityLink: newopportunityLink});
  }

  removeOpportunity(opportunityId){
    this.database.child(opportunityId).remove();
  }

  render() {
    console.log('opportunities', this.state.opportunities)
    return (
    <div className="opportunityWrapper">
      <div className="OpportunityBody">
        <div className="OpportunityHeader"> Input Opportunity </div>
        <Form addOpportunity={this.addOpportunity}/>
      </div>
      <div className="OpportunityBody">
        <div className="OpportunityHeader"> All Opportunities </div>
        console.log(this.opportunityTitle)
        {
          this.state.opportunities.map((opportunity) => {
            console.log(opportunity)
            return (
              <Opportunity
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

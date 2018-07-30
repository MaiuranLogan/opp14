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
  //
  // toggleCheckbox = label => {
  //   if(this.selectedCheckbox.has(label)){
  //     this.selectedCheckbox.delete(label)
  //   } else {
  //     this.selectedCheckbox.add(label)
  //   }
  // }
  //
  // handleTypeSubmit = typeSubmitEvent => {
  //   typeSubmitEvent.preventDefault();
  //
  //   for(const checkbox of this.selectedCheckbox){
  //     this.setState({
  //       selectedType: checkbox
  //     })
  //   }
  // }
  //
  // createCheckbox = label => (
  //   <Checkbox
  //           label={label}
  //           handleCheckboxChange={this.toggleCheckbox}
  //           key={label}
  //       />
  // )
  //
  // createCheckboxes = () => (
  //   items.map(this.createCheckbox)
  // )


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
          this.state.opportunities.map((opportunity, i) => {

            /* Her er det noe i databasen som gjør at vi får dobbelt.
              For nå, så henter vi bare det innerste objektet (opportunityTitle), siden det er
              den som blir registrert riktig
              EDIT: Se kommentar i componentWillMount() */

              // if (this.state.selectedType == "Job") {
              //   return(
              //     console.log("this is job"),
              //     <Form className="formInput"
              //       addOpportunity={this.addOpportunity} />
              //   )
              // } else if (this.state.selectedType == "Event") {
              //   return(
              //     <Form addOpportunity={this.addOpportunity} />
              //   )
              // } else if (this.state.selectedType == "Offer") {
              //   return(
              //     <Form addOpportunity={this.addOpportunity} />
              //   )
              // } else {
              //   return(
              //     <div> None selected </div>
              //   )
              // }

            return (
                <Opportunity
                key={i} /* Når man bruker map og genererer elementer må man ha en key for hvert element */
                Type={opportunity.Type}
                Title={opportunity.Title}
                Company={opportunity.Company}
                Location={opportunity.Location}
                Description={opportunity.Description}
                Link={opportunity.Link}
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

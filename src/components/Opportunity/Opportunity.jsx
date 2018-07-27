import React, { Component } from 'react';
import './Opportunity.css';
import PropTypes from 'prop-types';

class Opportunity extends Component{

  constructor(props){
    super(props);
    this.opportunityTitle = props.opportunityTitle;
    this.opportunityId = props.opportunityId;
    this.opportunityCompany = props.opportunityCompany;
    this.opportunityLocation = props.opportunityLocation;
    this.opportunityDescription = props.opportunityDescription;
    this.opportunityLink = props.opportunityLink;
    this.handleRemoveOpportunity = this.handleRemoveOpportunity.bind(this);
  }

  handleRemoveOpportunity(id){
    this.props.removeOpportunity(id);
  }

  render(props){
    return(
      <div className="opportunityMain">
        <span className="closebtn"
          onClick={() => this.handleRemoveOpportunity(this.opportunityId)}>
          &times;
        </span>
        <p className="opportunityContent"> { this.opportunityTitle } </p>
        <p className="opportunityContent"> { this.opportunityCompany } </p>
        <p className="opportunityContent"> { this.opportunityLocation } </p>
        <p className="opportunityContent"> { this.opportunityDescription } </p>
        <p className="opportunityContent"> { this.opportunityLink } </p>
      </div>
    )
  }
}

Opportunity.propTypes = {
  opportunityTitle: PropTypes.string,
  opportunityCompany: PropTypes.string,
  opportunityLocation: PropTypes.string,
  opportunityDescription: PropTypes.string,
  newopportunityLink: PropTypes.string
}

export default Opportunity;

import React, { Component } from 'react';
import './Opportunity.css';
import PropTypes from 'prop-types';

class Opportunity extends Component{

  constructor(props){
    super(props);
    this.Type = props.Type;
    this.Title = props.Title;
    this.opportunityId = props.opportunityId;
    this.Company = props.Company;
    this.Location = props.Location;
    this.Description = props.Description;
    this.Link = props.Link;
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
        <p className="opportunityContent"> { this.Type } </p>
        <p className="opportunityContent"> { this.Title } </p>
        <p className="opportunityContent"> { this.Company } </p>
        <p className="opportunityContent"> { this.Location } </p>
        <p className="opportunityContent"> { this.Description } </p>
        <p className="opportunityContent"> { this.Link } </p>
      </div>
    )
  }
}

Opportunity.propTypes = {
  opportunityType: PropTypes.string,
  opportunityTitle: PropTypes.string,
  opportunityCompany: PropTypes.string,
  opportunityLocation: PropTypes.string,
  opportunityDescription: PropTypes.string,
  newopportunityLink: PropTypes.string
}

export default Opportunity;

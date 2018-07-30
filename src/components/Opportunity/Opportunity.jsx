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

        {this.props.Type === 'job' && <div>
        <p className="jobContent"> { this.props.Title } </p>
        <p className="jobContent"> { this.props.Company } </p>
        <p className="jobContent"> { this.props.Location } </p>
        <p className="jobContent"> { this.props.Description } </p>
        <p className="jobContent"> { this.props.Link } </p>
        <p className="jobContent"> { this.props.Type } </p>
        </div>
        }

        {this.props.Type === 'event' && <div>
        <p className="eventContent"> { this.props.Title } </p>
        <p className="eventContent"> { this.props.Company } </p>
        <p className="eventContent"> { this.props.Location } </p>
        <p className="eventContent"> { this.props.Description } </p>
        <p className="eventContent"> { this.props.Link } </p>
        <p className="eventContent"> { this.props.Type } </p>
        </div>
        }

        {this.props.Type === 'program' && <div>
        <p className="programContent"> { this.props.Title } </p>
        <p className="programContent">  { this.props.Company } </p>
        <p className="programContent">  { this.props.Location } </p>
        <p className="programContent">  { this.props.Description } </p>
        <p className="programContent">  { this.props.Link } </p>
        <p className="programContent">  { this.props.Type } </p>
        </div>
        }

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

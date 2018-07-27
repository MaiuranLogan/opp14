import React from "react";
import firebase from 'firebase';
import {DB_CONFIG} from './Config';
import 'firebase/database';

import Titles from "./components/Titles";
import Titles2 from "./components/Titles2";
import Titles3 from "./components/Titles3";
import Form from "./components/Form";
import allOpportunities from "./components/allOpportunities";
//import Output from "./components/output";
//import createOpportunity from "./components/createOpportunity";

firebase.initializeApp(DB_CONFIG);

// Get a reference to the database service
var database = firebase.database()

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      oppId: '',
      title: '',
      company: '',
      location: '',
      description: '',
      link: ''
    };
  }

  componentDidMount(){
    const rootRef = firebase.database().ref().child('opportunities');
    const oppIdRef = rootRef.child('oppId');
    oppIdRef.on('value', snap => {
      this.setState({
        oppId: snap.val()
      })
    });
    const titleRef = rootRef.child('title');
    titleRef.on('value', snap => {
      this.setState({
        titleRef: snap.val()
      })
    });
  }


  render(){
    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Titles2 />
                  <Form />
                  <Titles3 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default App;

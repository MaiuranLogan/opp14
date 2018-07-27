import React from "react";
import firebase from 'firebase';

function opportunityRef (oppId){
  firebase.database().ref('opportunities/' + oppId);
  opportunityRef.on('value', function(snapshot) {
    <p> {} </p>
  });
}

export default opportunityRef;

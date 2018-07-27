import React from "react";
import firebase from 'firebase';



function createOpportunity (oppId, title, company, location, description, link){
  firebase.database().ref('opportunities/' + oppId).set({
    oppId: oppId,
    title: title,
    company: company,
    location: location,
    description: description,
    link: link
  });
}

export default createOpportunity;

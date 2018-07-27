// import React from "react";
//
// const Output = props => (
//     
// )
//
// export default Output;
//
//    this.createOpportunity = this.createOpportunity.bind(this);
//    this.db = this.app.database().ref().child('opportunity');

//     // We're going to setup the React state of our component
//     this.state = {
//       opportunity: [this.state.title], [this.state.company]
//     }
//   }
//
//
//   componentWillMount(){
//     const allOpportunities = this.state.opportunity;
//
//     //Data Snapshot
//     this.db.on('child_added', snap => {
//       allOpportunities.push({
//          id: snap.key,
//          title: snap.val().title,
//          company: snap.val().company,
//          location: snap.val().location,
//          description: snap.val().description,
//          link: snap.val().link
//       })
//
//       this.setState({
//         title: allOpportunities
//       })
//     })
//   }
//
//   createOpportunity = async (e) => {
//     e.preventDefault();
//     const title = e.target.elements.title.value;
//     const company = e.target.elements.company.value;
//     const location = e.target.elements.location.value;
//     const description = e.target.elements.description.value;
//     const link = e.target.elements.link.value;
//
//     if(title && company && description && link){
//       this.db.push().set({ title: title, company: company, location: location, description: description, link: link})
//     }
//   }

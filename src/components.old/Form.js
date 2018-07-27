import React from "react";
import firebase from "firebase";

const Form = props => (
<div>
  <form>
      <input type="text" name="oppId" placeholder="OppId..." />
      <input type="text" name="title" placeholder="Title..." />
      <input type="text" name="company" placeholder="Company..." />
      <input type="text" name="location" placeholder="Location..." />
      <input type="text" name="description" placeholder="Description..." />
      <input type="text" name="link" placeholder="Link..." />
      <button onClick={this.createOpportunity}>Submit Opportunity!</button>''
  </form>
</div>
)

//
// addMessage(e){
//             e.preventDefault(); // <- prevent form submit from reloading the page
//             /* Send the message to Firebase */
//             var userInfo = {
//                 billing_name : this.pnm.value,
//                 billing_flat : this.fno.value,
//               }; //user info
//             DbConfig.database().ref('billing').push(userInfo);
//
//             this.pnm.value = ''; // <- clear the input
//             this.fno.value = '';
//           }
//      render() {
//         return (
//                 <div className="content">
//                 <NavBar></NavBar>
//           <div className="row">
//             <div className="col-md-12">
//                 <form onSubmit={this.addMessage.bind(this)}>
//               <input type="text" ref={ el => this.inputEl = el }/>
//               <input type="text" ref={ em => this.inputEm = em }/>
//               <input type="submit"/>
//
//             </form>

export default Form;

// import React, { Component } from 'react';
// // import Drinformation from './Drinformation';
// // import CommentBox from './CommentBox';
// // import Comments from './Comments'; 
// // import Info from './Info';
// //import Map from './Map';
// //import {GoogleApiWrapper} from 'google-maps-react';
// //import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// // import PatientProfile from './PatientProfile';
// //import { CurrentLocation } from './components/CurrentLocation';
// //let map;

// class Home extends Component {
//   constructor(props){
//     super(props);
//     this.handleAddComment = this.handleAddComment.bind(this);
//     this.state={
//       comments:[],
//       isLoaded:false,
    
//     }
//   }
//   componentDidMount() {
//     /*global Ably*/
//     const channel = Ably.channels.get('comments');
   
//     channel.attach();
//       channel.once('attached', () => {
//         channel.history((err, page) => {
//           // create a new array with comments only in an reversed order (i.e old to new)
//           const comments = Array.from(page.items.reverse(), item => item.data)
   
//           this.setState({ comments });
//         });
//       });
//   }
//   handleAddComment(comment) {
//     this.setState(prevState => {
//       return {
//         comments: prevState.comments.concat(comment)
//       };
//     });
//   }
//   render() {

//       return (
//         <div>
//           <h1> Home </h1>
//           {/* <h1> Home </h1>
//         <Drinformation setActivePage={this.props.setActivePage.bind(this)}/>  
//           <Info setActivePage={this.props.setActivePage.bind(this)}/>
//           <PatientProfile setActivePage={this.props.setActivePage.bind(this)}/>
//          {/* <CurrentLocation/> 

//           <div className="map">
//           {/* <MapContainer/> */}

//           {/* <section className="section">
          
//             <div className="container">
//               <div className="columns">
//                 <div className="column is-half is-offset-one-quarter">
                  
//                   <CommentBox handleAddComment={this.handleAddComment} />
//                   <Comments comments={this.state.comments.reverse()} />
//                 </div>
//               </div>
//             </div>
//           </section> */}
//          </div> 

         
     
   
    
//     );
//   }
// }

// export default Home;

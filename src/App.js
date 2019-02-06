import React, { Component } from 'react';
import CommentBox from './components/CommentBox';
import Comments from './components/Comments';
import Drinformation from './components/Drinformation';
import { getUser,logout } from "./services/authService";
import NavBar from "./components/NavBar";
import AuthForm from "./components/AuthForm";
//import Profile from "./components/Profile";

import './App.css';
class App extends Component {
  constructor(props) {

    super(props);
    this.handleAddComment = this.handleAddComment.bind(this);
    this.state = {
      user: null,
      // activePage:'app',
      doctors: [],
      comments: [],
      isLoaded: false,
      activeNav: "home",
      navs: ["home" , "login" , "signup"]
    }
  }

  
  checkForUser() {
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }
  componentDidMount() {
    this.checkForUser();
  }

  login = () => {
    const user = getUser();
    this.setState({ user });
  };

  logout = () => {
    logout();
    this.setState({ user: null });
  };

  getProducts = () => {};

  handleAddComment(comment) {
    this.setState(prevState => {
      return {
        comments: prevState.comments.concat(comment)
      };
    });
  }


  onNavClick = (activeNav) => {
    console.log(activeNav)
    this.setState({activeNav})

  }
 // componentDidMount() {
 //   /*global Ably*/
 //   const channel = Ably.channels.get('comments');
              
 //   channel.attach();
 //   channel.once('attached', () => {
 //     channel.history((err, page) => {
 //       // create a new array with comments only in an reversed order (i.e old to new)
 //       const comments = Array.from(page.items.reverse(), item => item.data)
              
 //       this.setState({ comments });
 //     });
 //   });
 // }


  // setActivePage(activePage){
  //   this.setState({
  //     activePage: activePage
  //   })
  // }

  // renderPage() {
  //   console.log(this.state.activePage);
  //   if (this.state.activePage === 'app'){
  //     return (
  //       <div>
  //         <Home setActivePage={this.setActivePage.bind(this)}/>
  //       </div>
  //     )
  //   } 
  //   else if (this.state.activePage === 'Drinformation') {
  //       return (
  //         <div>
  //           <Drinformation setActivePage={this.setActivePage.bind(this)} />
  //         </div>
  //       )
  //   } else if (this.state.activePage === 'Info') {
  //       return (
  //         <div>
  //           <Info setActivePage={this.setActivePag  e.bind(this)}/>
  //         </div>
  //       )
  //   } else if (this.state.activePage === 'PatientProfile') {
  //       return (
  //         <div>
  //           <PatientProfile setActivePage={this.setActivePage.bind(this)}/>
  //         </div>
  //       )
  //   } 
  //  }
  // componentDidMount(){

  //   fetch('https://api.betterdoctor.com/2016-03-01/doctors?first_name=Terry&user_key=ff5d654bef674612132ad54458bfb6a5')
  //   .then( res => res.json())
  //   .then(json => {
  //     this.setState({
  //       isLoaded:true,
  //       doctors:json,
  //     })
  //   })
  //   .catch(error => console.log(error));

  //    loadMap('https://maps.googleapis.com/maps/api/js?key=AIzaSyBRfODQceddU_9nyDJyCBQ5lSe20loOk2c&v=3&callback=initMap',function () { })
  // }

  
  render() {
    return (
      <div className="App">
        {/* <h1> Home </h1> */}
        <Drinformation /><br/>
  
        <NavBar
          user={this.state.user}
          changeForm={this.changeForm}
          logout={this.logout}
          navs={this.state.navs}
          onNavClick={this.onNavClick}
        />

        {this.state.activeNav === "login" ? <AuthForm form="login" onLogin={this.login} />:""}
        {this.state.activeNav === "signup" ? <AuthForm form="signup" onLogin={this.login} />:""}

        {/* {this.state.user ? this.state.user.name : ""} */}
       



        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column is-half is-offset-one-quarter">
              
                <CommentBox handleAddComment={this.handleAddComment} />
                <Comments comments={this.state.comments.reverse()} />

              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;

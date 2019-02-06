import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
// import CurrentLocation from './CurrentLocation';
// import CurrentLocation from './Map';

const mapStyles = {
  position:"relative",
  width: "600px",
  height: "400px",
};


class MapContainer extends Component {
  // have state that stores your positions
  constructor(props) {
    super(props);
    this.state = {
      position: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      isLoaded: false,
      doctors:[]
    
    }; 
  }
  
  // make fetch call
  componentDidMount() {
    fetch('https://api.betterdoctor.com/2016-03-01/doctors?user_key=ff5d654bef674612132ad54458bfb6a5&location=37.773,-122.413,100')
      .then(res => res.json())
      .then(doctors => {
        const locations = doctors.data.map(doctor => {
          return { lat: doctor.practices[0].lat, lng: doctor.practices[0].lon }
        })
        this.setState({doctors: doctors.data})
        console.log(locations)
      })
      .catch(error => console.log(error))
  }

  onMarkerClick = (doctor) =>{
    this.setState({
      selectedPlace: doctor,
      showingInfoWindow: true
    });
  }

  
  renderMarkers(){
    console.log("in render", this.state.doctors)
    return this.state.doctors.map( doctor => {
      return(
        <Marker onClick={()=>{ this.onMarkerClick(doctor)} } position={{ lat: doctor.practices[0].lat, lng: doctor.practices[0].lon }}></Marker>
      )
    } )
  }
  
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  renderInfoWindow(){
    if(this.state.showingInfoWindow){
      return(
        <InfoWindow onClose={this.onInfoWindowClose} visible 
            position={{ 
              lat: this.state.selectedPlace.practices[0].lat, 
              lng: this.state.selectedPlace.practices[0].lon }}>
            <h1>Bio:{this.state.selectedPlace.profile.bio}</h1>
            {/* <h1>First name:{this.state.selectedPlace.profile.first_name}</h1>
            <h1>Last name:{this.state.selectedPlace.profile.last_name}</h1> */}
            <h1>Gender:{this.state.selectedPlace.profile.gender}</h1>
            {/* <h1>image :{this.state.selectedPlace.profile.image_url}</h1> */}
            {/* <h1>specialties:{this.state.selectedPlace.specialties.description}</h1> */}
        </InfoWindow>
      )
    }
  }
  // map through positions and return markers for each
  render() {
    return (
      <div style={mapStyles}>

        <Map
          google={this.props.google} zoom={14} initialCenter={{ lat: 37.335451, lng: -121.998482 }}>
          { this.renderMarkers() }
          {this.renderInfoWindow()}
        </Map>       
      </div>
      
    );
  }

  //   render() {
  //     return (
  //       <CurrentLocation
  //         centerAroundCurrentLocation
  //         google={this.props.google}
  //       >
  //         <Marker onClick={this.onMarkerClick} name={'current location'} />
  //         <InfoWindow
  //           marker={this.state.activeMarker}
  //           visible={this.state.showingInfoWindow}
  //           onClose={this.onClose}
  //         >
  //           <div>
  //             <h4>{this.state.selectedPlace.name}</h4>
  //           </div>
  //         </InfoWindow>
  //       </CurrentLocation>
  //     );
  //   }
  // }
}

//export default MapContainer;
export default GoogleApiWrapper({
  apiKey: 'AIzaSyACuOUScJZZQ_W7YC6wVtavyU0LzoxvHbE'
})(MapContainer);
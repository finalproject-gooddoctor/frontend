import React, { Component } from 'react';
import MapContainer from './MapContainer';

class Drinformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [],
            doctors: [],
            isLoaded: false,

        };
    }


componentDidMount() {
        fetch('https://api.betterdoctor.com/2016-03-01/doctors?&location=45.5231%2C-122.6765%2C100&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=ff5d654bef674612132ad54458bfb6a5&')
            .then(res => res.json())
            .then(doctors => {
                console.log(doctors)
                this.setState({
                    doctors: doctors.data
                })
            })
            .catch(error => console.log(error))
    }

renderMarkers(){
    console.log("in render", this.state.doctors)
    return this.state.doctors.map( doctor => {
      return(
        console.log(doctor)
            )
    } )
  }

  addDoctor(doctor){
      console.log("this doctor has been added to my favorit" , doctor)
  }
renderDoctors(){
    return this.state.doctors.map( doctor => {
        return  <div class="row" >
        <div class="col s12 m6">
          <div class="card">
            <div class="card-image">
            <img src={doctor.profile.image_url}/>
            <div class="card-content">
        </div>
        <div class="card-content">
            <div onClick={() => this.addDoctor(doctor.profile.first_name)}>
            <p>Dr. {doctor.profile.first_name +" "+ doctor.profile.last_name }</p>
          
            <p>Gender:{doctor.profile.gender}</p>
            {/* <p>image:{doctor.profile.image_url}</p> */}
            <div class="card-action">
          <a href="#">Add to my fav</a>
        </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  </div>

    })
}

render() {
        return (
            <div>
              
             {this.renderMarkers()}
                <MapContainer />
             {this.renderDoctors()}
            </div>
        );
    }
}

export default Drinformation;
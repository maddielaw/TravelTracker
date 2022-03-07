import Traveler from './Traveler';

class TravelDatabase {
  constructor(data){
    this.data = data;
    this.travelers = data.allTravelers;
    this.trips = data.allTrips;
    this.destinations = data.allDestinations;
    this.currentTraveler = {};
  };

  findATraveler(id) {
    const singleTravelerData = this.travelers.find(traveler => traveler.id === id);
    const singleTravelerTrips = this.trips.filter(trip => trip.userID === id);
    this.currentTraveler = new Traveler(singleTravelerData, singleTravelerTrips, this.destinations);
    return this.currentTraveler;
  };
};

export default TravelDatabase;


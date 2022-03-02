
class Traveler {
  constructor(travelerData, travelerTrips) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.travelerTrips = travelerTrips;
    this.pastTrips = [];
    this.upcomingTrips = [];
    // this.pendingTrips = [];
    // this.currentTrip = [];
  }

  sortTrips() {
    const sortedTrips = this.travelerTrips.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
    return sortedTrips
  }

  findPastTrips() {
    this.sortTrips();
    const currentDate = new Date().toLocaleDateString();
    this.pastTrips = this.travelerTrips.filter(trip => {
      let departureDate = new Date(trip.date);
      let returnDate = new Date(departureDate.setDate(departureDate.getDate() + trip.duration));
      return new Date(trip.date) < new Date(currentDate) && returnDate < new Date(currentDate)
    });
  };

  findUpcomingTrips() {
    this.sortTrips();
    const currentDate = new Date().toLocaleDateString();
    this.upcomingTrips = this.travelerTrips.filter(trip => {
      let departureDate = new Date(trip.date);
      let returnDate = new Date(departureDate.setDate(departureDate.getDate() + trip.duration));
      return new Date(trip.date) > new Date(currentDate) && returnDate > new Date(currentDate)
    })
    
  };



}


export default Traveler;
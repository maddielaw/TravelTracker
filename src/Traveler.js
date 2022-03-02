
class Traveler {
  constructor(travelerData, travelerTrips, destinations) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.travelerTrips = travelerTrips;
    this.pastTrips = [];
    this.upcomingTrips = [];
    this.currentTrip = [];
    this.pendingTrips = [];
    this.destinations = destinations;
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

  findCurrentTrip() {
    this.sortTrips();
    const currentDate = new Date().toLocaleDateString();
    this.currentTrip = this.travelerTrips.filter(trip => {
      let departureDate = new Date(trip.date);
      let returnDate = new Date(departureDate.setDate(departureDate.getDate() + trip.duration));
      return new Date(trip.date) <= new Date(currentDate) && returnDate >= new Date(currentDate)
    })
  };

  findPendingTrips() {
    this.sortTrips();
    this.pendingTrips = this.travelerTrips.filter(trip => trip.status === "pending");
  };

  findTravelerDestinations() {
    this.sortTrips()
    this.travelerTrips.map(trip => {
      const matchingDestination = this.destinations.find(destination => destination.id === trip.destinationID);
      return trip.destinationID = matchingDestination
    })
    return this.travelerTrips
  };

  findYearlyTrips() {
    this.findTravelerDestinations();
    const thisYearsTrips = [];
    const currentYear = new Date().getFullYear();
    this.travelerTrips.forEach(trip => {
      if (new Date(trip.date).getFullYear() === currentYear) {
        thisYearsTrips.push(trip)
      }
    })
    return thisYearsTrips
  };

  calculateYearlyTripCost() {
    const thisYearTrips = this.findYearlyTrips();

    const lodgingCost = thisYearTrips.reduce((total, trip) => {
      return total += trip.destinationID.estimatedLodgingCostPerDay * trip.duration;
    }, 0);


    const flightCost = thisYearTrips.reduce((total, trip) => {
      return total += trip.destinationID.estimatedFlightCostPerPerson * trip.travelers;
    }, 0);

    const baseCost = lodgingCost + flightCost;
    const travelAgentFee = baseCost / 10;
    const finalTotal = baseCost + travelAgentFee;

    return finalTotal;
  }





}


export default Traveler;
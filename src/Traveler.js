
class Traveler {
  constructor(travelerData, travelerTrips) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.travelerTrips = travelerTrips;
  }
}


export default Traveler;
import { expect } from 'chai';
import TravelDatabase from '../src/TravelDatabase';
import Traveler from '../src/Traveler';

describe('Travel Database', () => {

  let destinationsSubset, travelDatabase, allTravelData;

  beforeEach(function() {

    destinationsSubset = [
    {id: 28,destination: "San Juan, Puerto Rico",estimatedLodgingCostPerDay: 70,estimatedFlightCostPerPerson: 900,image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",alt: "white and brown concrete buildings near sea under white clouds during daytime"},
    {id: 7,destination: "Paris, France",estimatedLodgingCostPerDay: 100,estimatedFlightCostPerPerson: 395,image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",alt: "city during the day time with eiffel tower"},
    {id: 9,destination: "Amsterdam, Netherlands",estimatedLodgingCostPerDay: 100,estimatedFlightCostPerPerson: 950,image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",alt: "canal with boats and trees and buildings along the side"}
  ];

    allTravelData = {
      allTravelers: [
        {id: 1, name: "Ham Leadbeater", travelerType: "relaxer", travelerTrips: [{id: 117, userID: 1, destinationID: 28, travelers: 3, date: "2021/01/09", duration: 15, status: "approved", suggestedActivities: []}], pastTrips: [], upcomingTrips: [], pendingTrips: [], currentTrip: [], destinations: destinationsSubset},
        {id: 2, name: "Rachael Vaughten", travelerType: "thrill-seeker"},
        {id: 3, name: "Sibby Dawidowitsch", travelerType: "shopper"}],
      allTrips: [
        {id: 117, userID: 1, destinationID: 28, travelers: 3, date: "2021/01/09", duration: 15, status: "approved", suggestedActivities: []},
        {id: 166, userID: 2, destinationID: 7, travelers: 2, date: "2020/03/05", duration: 6, status: "approved", suggestedActivities: []},
        {id: 173, userID: 3, destinationID: 9, travelers: 6, date: "2020/04/21", duration: 18, status: "approved", suggestedActivities: []}],
      allDestinations: [
        {id: 28,destination: "San Juan, Puerto Rico",estimatedLodgingCostPerDay: 70,estimatedFlightCostPerPerson: 900,image: "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",alt: "white and brown concrete buildings near sea under white clouds during daytime"},
        {id: 7,destination: "Paris, France",estimatedLodgingCostPerDay: 100,estimatedFlightCostPerPerson: 395,image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",alt: "city during the day time with eiffel tower"},
        {id: 9,destination: "Amsterdam, Netherlands",estimatedLodgingCostPerDay: 100,estimatedFlightCostPerPerson: 950,image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",alt: "canal with boats and trees and buildings along the side"}]
    };

    travelDatabase = new TravelDatabase(allTravelData);
  });

  it('should be a function', function () {
    expect(TravelDatabase).to.be.a('function');
  });

  it('should instantiate a TravelDatabase', function () {
    expect(travelDatabase).to.be.an.instanceof(TravelDatabase);
  });

  it('should keep track of all travel data', function () {
    expect(travelDatabase.data).to.eql(allTravelData);
  });

  it('should keep track of all travelers', function () {
    console.log(travelDatabase.travelers);
    expect(travelDatabase.travelers).to.eql(allTravelData.allTravelers);
  });

  it('should keep track of all trips', function () {
    expect(travelDatabase.trips).to.eql(allTravelData.allTrips);
  });

  it('should keep track of all destination options', function () {
    expect(travelDatabase.destinations).to.eql(allTravelData.allDestinations);
  });

  it('should be able to find a traveler', function () {
    expect(travelDatabase.findATraveler(1)).to.eql(allTravelData.allTravelers[0]);
  });

  it('should keep track of the current traveler', function () {
    travelDatabase.findATraveler(1);
    expect(travelDatabase.currentTraveler).to.eql(allTravelData.allTravelers[0]);
    expect(travelDatabase.currentTraveler).to.be.an.instanceOf(Traveler);
  });
});
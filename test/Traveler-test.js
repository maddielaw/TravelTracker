import { expect } from 'chai';
import Traveler from '../src/Traveler';


describe('Traveler', () => {

  let travelerData, travelerTrips, traveler;

  beforeEach(function() {

    travelerData = {
        id: 1,
        name: "Ham Leadbeater",
        travelerType: "relaxer",
    };

    travelerTrips = [
        {id: 117, 
        userID: 1, 
        destinationID: 28, 
        travelers: 3, 
        date: "2021/01/09", 
        duration: 15, 
        status: "approved", 
        suggestedActivities: []}
      ];
    
    traveler = new Traveler(travelerData, travelerTrips)

  })

  it('should be a function', function () {
    expect(Traveler).to.be.a('function');
  });

  it('should instantiate a TravelDatabase', function () {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should keep track of a traveler\'s id', function () {
    expect(traveler.id).to.equal(1)
  })




})

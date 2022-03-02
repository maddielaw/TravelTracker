import { expect } from 'chai';
import Traveler from '../src/Traveler';


describe('Traveler', () => {

  let travelerData, travelerTrips, traveler, sortedTravelerTrips;

  beforeEach(function() {

    travelerData = {id: 2, name: "Rachael Vaughten", travelerType: "thrill-seeker"}

    travelerTrips = [
      {id: 89,
      userID: 2,
      destinationID: 10,
      travelers: 5,
      date: "2019/09/27",
      duration: 13,
      status: "approved",
      suggestedActivities: []
      },
      {id: 100,
      userID: 2,
      destinationID: 6,
      travelers: 6,
      date: "2020/3/28",
      duration: 10,
      status: "approved",
      suggestedActivities: []
      },
      {id: 116,
      userID: 2,
      destinationID: 7,
      travelers: 3,
      date: "2020/04/03",
      duration: 8,
      status: "approved",
      suggestedActivities: []
      },
      {id: 166,
      userID: 2,
      destinationID: 7,
      travelers: 2,
      date: "2020/03/05",
      duration: 6,
      status: "approved",
      suggestedActivities: []
      },
      {id: 171,
      userID: 2,
      destinationID: 43,
      travelers: 1,
      date: "2020/12/27",
      duration: 18,
      status: "pending",
      suggestedActivities: []
      },
      {id: 177,
      userID: 2,
      destinationID: 20,
      travelers: 6,
      date: "2020/01/29",
      duration: 8,
      status: "approved",
      suggestedActivities: []}
      ];


      sortedTravelerTrips = [
        {id: 89,
        userID: 2,
        destinationID: 10,
        travelers: 5,
        date: "2019/09/27",
        duration: 13,
        status: "approved",
        suggestedActivities: []
        },
        {id: 177,
        userID: 2,
        destinationID: 20,
        travelers: 6,
        date: "2020/01/29",
        duration: 8,
        status: "approved",
        suggestedActivities: []
        },
        {id: 166,
        userID: 2,
        destinationID: 7,
        travelers: 2,
        date: "2020/03/05",
        duration: 6,
        status: "approved",
        suggestedActivities: []
        },
        {id: 100,
        userID: 2,
        destinationID: 6,
        travelers: 6,
        date: "2020/3/28",
        duration: 10,
        status: "approved",
        suggestedActivities: []
        },
        {id: 116,
        userID: 2,
        destinationID: 7,
        travelers: 3,
        date: "2020/04/03",
        duration: 8,
        status: "approved",
        suggestedActivities: []
        },
        {id: 171,
        userID: 2,
        destinationID: 43,
        travelers: 1,
        date: "2020/12/27",
        duration: 18,
        status: "pending",
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
    expect(traveler.id).to.equal(2)
  });

  it('should keep track of a traveler\'s name', function () {
    expect(traveler.name).to.equal("Rachael Vaughten")
    traveler.name = "";
    expect(traveler.name).to.equal("")
  });

  it('should keep track of a traveler\'s type', function () {
    expect(traveler.travelerType).to.equal("thrill-seeker")
  });

  it('should keep track of a traveler\'s trips', function () {
    expect(traveler.travelerTrips).to.equal(travelerTrips)
    traveler.travelerTrips = [];
    expect(traveler.travelerTrips).to.eql([]);
  });

  it('should be able to sort a traveler\'s trips by date', function () {
    expect(traveler.travelerTrips).to.equal(travelerTrips)
    expect(traveler.sortTrips()).to.eql(sortedTravelerTrips)
  });

  it('should be able to find a traveler\'s past trips', function () {
    traveler.findPastTrips();
    expect(traveler.pastTrips).to.eql(sortedTravelerTrips)
  });

  it('should be able to find a traveler\'s upcoming trips', function () {
    traveler.findUpcomingTrips();
    expect(traveler.upcomingTrips).to.eql([])
  });

  it('should be able to find a traveler\'s current trip(s)', function () {
    traveler.findCurrentTrip();
    expect(traveler.currentTrip).to.eql([])
  });




})

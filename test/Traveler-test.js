import { expect } from 'chai';
import Traveler from '../src/Traveler';

describe('Traveler', () => {

  let travelerData, travelerTrips, traveler, sortedTravelerTrips, destinations;

  beforeEach(function() {

    travelerData = {id: 2, name: "Rachael Vaughten", travelerType: "thrill-seeker"};

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
      date: "2022/04/03",
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
      date: "2022/12/27",
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
        date: "2022/04/03",
        duration: 8,
        status: "approved",
        suggestedActivities: []
        },
        {id: 171,
        userID: 2,
        destinationID: 43,
        travelers: 1,
        date: "2022/12/27",
        duration: 18,
        status: "pending",
        suggestedActivities: []}
      ];

      destinations = [
        {id: 10,
          destination: "Toronto, Canada",
          estimatedLodgingCostPerDay: 90,
          estimatedFlightCostPerPerson: 450,
          image: "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
          },
          {id: 20,
          destination: "Miami, Florida",
          estimatedLodgingCostPerDay: 158,
          estimatedFlightCostPerPerson: 275,
          image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
          alt: "sand with palm trees and tall buildings in the background"
          },
          {id: 7,
          destination: "Paris, France",
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 395,
          image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
          alt: "city during the day time with eiffel tower"
          },
          {id: 6,
          destination: "Jakarta, Indonesia",
          estimatedLodgingCostPerDay: 70,
          estimatedFlightCostPerPerson: 890,
          image: "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          alt: "lit up city at night"
          },
          {id: 7,
          destination: "Paris, France",
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 395,
          image: "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
          alt: "city during the day time with eiffel tower"
          },
          {id: 43,
          destination: "Nassau, The Bahamas",
          estimatedLodgingCostPerDay: 550,
          estimatedFlightCostPerPerson: 90,
          image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80",
          alt: "aerial photography of white and blue cruise ships during daytime"
          }
      ];
    
    traveler = new Traveler(travelerData, travelerTrips, destinations);

  });

  it('should be a function', function () {
    expect(Traveler).to.be.a('function');
  });

  it('should instantiate a TravelDatabase', function () {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it('should keep track of a traveler\'s id', function () {
    expect(traveler.id).to.equal(2);
  });

  it('should keep track of a traveler\'s name', function () {
    expect(traveler.name).to.equal("Rachael Vaughten");
    traveler.name = "";
    expect(traveler.name).to.equal("");
  });

  it('should keep track of a traveler\'s type', function () {
    expect(traveler.travelerType).to.equal("thrill-seeker");
  });

  it('should keep track of a traveler\'s trips', function () {
    expect(traveler.travelerTrips).to.equal(travelerTrips);
    traveler.travelerTrips = [];
    expect(traveler.travelerTrips).to.eql([]);
  });

  it('should be able to sort a traveler\'s trips by date', function () {
    expect(traveler.travelerTrips).to.equal(travelerTrips);
    expect(traveler.sortTrips()).to.eql(sortedTravelerTrips);
  });

  it('should be able to find a traveler\'s past trips', function () {
    traveler.findPastTrips();
    expect(traveler.pastTrips[0]).to.eql(
      {id: 89,
        userID: 2,
        destinationID: 10,
        travelers: 5,
        date: "2019/09/27",
        duration: 13,
        status: "approved",
        suggestedActivities: []
        });
  });

  it('should be able to find a traveler\'s upcoming trips', function () {
    traveler.findUpcomingTrips();
    expect(traveler.upcomingTrips[0]).to.eql(
      {id: 116,
        userID: 2,
        destinationID: 7,
        travelers: 3,
        date: "2022/04/03",
        duration: 8,
        status: "approved",
        suggestedActivities: []
        })
  });

  it('should be able to find a traveler\'s current trip(s)', function () {
    traveler.findCurrentTrip();
    expect(traveler.currentTrip).to.eql([]);
  });

  it('should be able to find a traveler\'s pending trips', function () {
    traveler.findPendingTrips();
    expect(traveler.pendingTrips).to.eql([
      {id: 171,
      userID: 2,
      destinationID: 43,
      travelers: 1,
      date: "2022/12/27",
      duration: 18,
      status: "pending",
      suggestedActivities: []}
    ]);
  });

  it('should be able to find a traveler\'s destinations and add them to the traveler\'s trips', function () {
    traveler.findTravelerDestinations();
    expect(traveler.travelerTrips[0]).to.eql(
      {
        id: 89,
        userID: 2,
        destinationID: {
          id: 10,
          destination: 'Toronto, Canada',
          estimatedLodgingCostPerDay: 90,
          estimatedFlightCostPerPerson: 450,
          image: 'https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80'},
        travelers: 5,
        date: '2019/09/27',
        duration: 13,
        status: 'approved',
        suggestedActivities: []
      });
    });
      
  it('should be able to find a traveler\'s trips for the current year', function () {
    expect(traveler.findYearlyTrips()).to.eql([
      {
        id: 116,
        userID: 2,
        destinationID: {
          id: 7,
          destination: 'Paris, France',
          estimatedLodgingCostPerDay: 100,
          estimatedFlightCostPerPerson: 395,
          image: 'https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
          alt: 'city during the day time with eiffel tower'
        },
        travelers: 3,
        date: '2022/04/03',
        duration: 8,
        status: 'approved',
        suggestedActivities: []
      },
      {
        id: 171,
        userID: 2,
        destinationID: {
          id: 43,
          destination: 'Nassau, The Bahamas',
          estimatedLodgingCostPerDay: 550,
          estimatedFlightCostPerPerson: 90,
          image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80',
          alt: 'aerial photography of white and blue cruise ships during daytime'
        },
        travelers: 1,
        date: '2022/12/27',
        duration: 18,
        status: 'pending',
        suggestedActivities: []
      }]);
  });

  it('should be able to calculate how much a traveler spent on trips for current year', function () {
    expect(traveler.calculateYearlyTripCost()).to.eql(14575);
  });

  it('should be able to calculate how many days a traveler has traveled', function () {
    expect(traveler.findNumDaysTraveled()).to.eql(45);
  });
});

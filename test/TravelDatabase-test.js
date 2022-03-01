import { expect } from 'chai';
import TravelDatabase from '../src/TravelDatabase';


describe('Travel Database', () => {

  let travelDatabase;

  beforeEach(function() {

    travelDatabase = new TravelDatabase()

  })

  it('should be a function', function () {
    expect(TravelDatabase).to.be.a('function');
  });

  it('should instantiate a TravelDatabase', function () {
    expect(travelDatabase).to.be.an.instanceof(TravelDatabase);
  });







})
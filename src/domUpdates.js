

//Selector Variables -------------------------------------------------------------------------------------

const welcomeMessage = document.getElementById('welcome');
const travelerName = document.getElementById('travelerName');
const todayDate = document.getElementById('todayDate');
const totalTripCost = document.getElementById('totalTripCost');
const tripCardsContainer = document.getElementById('tripCardsContainer');









//DOM Updates -------------------------------------------------------------------------------------


let domUpdates = {

  updateWelcomeMessage: function (data) {
    const firstName = data.currentTraveler.name.split(' ')[0];
    welcomeMessage.innerText = `welcome, ${firstName.toLowerCase()}`
  },
  updateTravelerProfile: function (data) {
    travelerName.innerText = data.currentTraveler.name;
    todayDate.innerText = `Today's Date: ${new Date().toLocaleDateString()}`;
  },
  updateTravelerSpending: function (data, cost) {
    totalTripCost.innerText = `You've spent $${cost} on trips this year`
  },
  resetTripCardsInnerHTML: function () {
    tripCardsContainer.innerHTML = "";
  },
  updateAllTravelerTrips: function (trip) {
    tripCardsContainer.innerHTML += `
      <div class="trip-card">
        <h3 class="trip-card-location trip-info" id="tripCardLocation">${trip.destinationID.destination}</h3>
        <div class="trip-card-img-container trip-info">
          <img src=${trip.destinationID.image} alt=${trip.destinationID.alt}></img>
        </div>
        <h4 class="num-travelers trip-info" id="numTravelers">Travelers: ${trip.travelers}</h4>
        <h4 class="departure trip-info" id="departure">Departure Date: ${trip.date}</h4>
        <h4 class="duration trip-info" id="duration">Trip Duration: ${trip.duration} days</h4>
        <h4 class="trip-status trip-info" id="tripStatus">Trip Status: ${trip.status}</h4>
      </div>`
  }


};



{/* <img src="./images/turing-logo.png" alt="turing logo"></img> */}







export default domUpdates;


//Selector Variables -------------------------------------------------------------------------------------

const welcomeMessage = document.getElementById('welcome');
const travelerName = document.getElementById('travelerName');
const todayDate = document.getElementById('todayDate');
const totalTripCost = document.getElementById('totalTripCost');
const allTripsContainer = document.getElementById('allTrips');
const upcomingTripsContainer = document.getElementById('upcomingTrips');
const pendingTripsContainer = document.getElementById('pendingTrips');
const notFoundMessage = document.getElementById('notFound');





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
  resetAllTripsInnerHTML: function () {
    allTripsContainer.innerHTML = "";
  },
  updateAllTravelerTrips: function (trip) {
    allTripsContainer.classList.remove('hidden');
    upcomingTripsContainer.classList.add('hidden');
    pendingTripsContainer.classList.add('hidden');
    allTripsContainer.innerHTML += `
      <div class="all-trips trip-card">
        <h3 class="trip-card-location trip-info" id="tripCardLocation">${trip.destinationID.destination}</h3>
        <div class="trip-card-img-container trip-info">
          <img src=${trip.destinationID.image} alt=${trip.destinationID.alt}></img>
        </div>
        <h4 class="num-travelers trip-info" id="numTravelers">Travelers: ${trip.travelers}</h4>
        <h4 class="departure trip-info" id="departure">Departure Date: ${trip.date}</h4>
        <h4 class="duration trip-info" id="duration">Trip Duration: ${trip.duration} days</h4>
        <h4 class="trip-status trip-info" id="tripStatus">Trip Status: ${trip.status}</h4>
      </div>`
  },
  resetUpcomingTripsInnerHTML: function () {
    upcomingTripsContainer.innerHTML = ""
  },
  updateUpcomingTravelerTrips: function (trip) {
    allTripsContainer.classList.add('hidden');
    upcomingTripsContainer.classList.remove('hidden');
    pendingTripsContainer.classList.add('hidden');
    upcomingTripsContainer.innerHTML += `
      <div class="all-trips trip-card">
        <h3 class="trip-card-location trip-info" id="tripCardLocation">${trip.destinationID.destination}</h3>
        <div class="trip-card-img-container trip-info">
          <img src=${trip.destinationID.image} alt=${trip.destinationID.alt}></img>
        </div>
        <h4 class="num-travelers trip-info" id="numTravelers">Travelers: ${trip.travelers}</h4>
        <h4 class="departure trip-info" id="departure">Departure Date: ${trip.date}</h4>
        <h4 class="duration trip-info" id="duration">Trip Duration: ${trip.duration} days</h4>
        <h4 class="trip-status trip-info" id="tripStatus">Trip Status: ${trip.status}</h4>
      </div>`
  },
  resetPendingTripsInnerHTML: function () {
    pendingTripsContainer.innerHTML = ""
  },
  updatePendingTravelerTrips: function (trip) {
    allTripsContainer.classList.add('hidden');
    upcomingTripsContainer.classList.add('hidden');
    pendingTripsContainer.classList.remove('hidden');
    pendingTripsContainer.innerHTML += `
    <div class="all-trips trip-card">
        <h3 class="trip-card-location trip-info" id="tripCardLocation">${trip.destinationID.destination}</h3>
        <div class="trip-card-img-container trip-info">
          <img src=${trip.destinationID.image} alt=${trip.destinationID.alt}></img>
        </div>
        <h4 class="num-travelers trip-info" id="numTravelers">Travelers: ${trip.travelers}</h4>
        <h4 class="departure trip-info" id="departure">Departure Date: ${trip.date}</h4>
        <h4 class="duration trip-info" id="duration">Trip Duration: ${trip.duration} days</h4>
        <h4 class="trip-status trip-info" id="tripStatus">Trip Status: ${trip.status}</h4>
      </div>`
  },
  displayNotFoundMessage: function () {
    notFoundMessage.classList.remove('hidden')
    allTripsContainer.classList.add('hidden');
  }


};










export default domUpdates;
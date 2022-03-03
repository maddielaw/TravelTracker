

//Selector Variables -------------------------------------------------------------------------------------

const welcomeMessage = document.getElementById('welcome');
const travelerName = document.getElementById('travelerName');
const todayDate = document.getElementById('todayDate')
const totalTripCost = document.getElementById('totalTripCost')









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
  }


};


export default domUpdates;
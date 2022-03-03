

//Selector Variables -------------------------------------------------------------------------------------

const welcomeMessage = document.getElementById('welcome');
const travelerName = document.getElementById('travelerName');
const todayDate = document.getElementById('todayDate')









//DOM Updates -------------------------------------------------------------------------------------


let domUpdates = {

  displayWelcomeMessage: function (data) {
    const firstName = data.currentTraveler.name.split(' ')[0];
    welcomeMessage.innerText = `welcome, ${firstName}`
  },
  displayTravelerProfile: function (data) {
    travelerName.innerText = data.currentTraveler.name;
    todayDate.innerText = `Today's Date: ${new Date().toLocaleDateString()}`;
  }


};


export default domUpdates;
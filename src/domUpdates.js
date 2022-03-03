

//Selector Variables -------------------------------------------------------------------------------------

const welcomeMessage = document.getElementById('welcome');









//DomUpdate object -------------------------------------------------------------------------------------


let domUpdates = {

  displayWelcomeMessage: function (data) {
    const firstName = data.currentTraveler.name.split(' ')[0];
    welcomeMessage.innerText = `welcome, ${firstName}`
  }


};


export default domUpdates;
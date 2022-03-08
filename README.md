 # travelTracker 

<img width="1385" alt="Screen Shot 2022-03-07 at 12 07 50 PM" src="https://user-images.githubusercontent.com/92049763/157101232-62bf0c78-1f8f-448d-8cb3-0dce84281809.png">

## Description
This project is a traveler-portal for a travel agent website. Users can login with their credentials and view their specific travel dashboard showing them past, present, upcoming, and pending trip details. They can filter that dashboard view by all trips, upcoming trips, or pending trips. Users can also see some basic information in their profile sidebar including the total amount they've spent on trips in the past year.

Users can then choose to book a new trip and select date, duration, number of travelers and destination. They can first receive a cost estimate for the trip and then choose to submit. The trip will have a status of pending and the user can navigate back to their dashboard to view that trip!

## Motivation
- Create a data model driven by principles of OOP
- Refine the code review process by working with others to review and recieve feedback on code
- Build and utilize a robust testing suite to ensure the data model is iron-clad
- Work with an API and local server to send and receive data

## Technology Used
- JavaScript
- HTML5
- CSS
- Mocha and Chai
- Lighthouse
- Webpack

## Deployment
travelTracker requires a local server be running in order to work. You will need to access the [backend server repo](https://github.com/turingschool-examples/travel-tracker-api), clone it down to your local machine, and follow the README instructions.

Once you have the server running on your local machine you can access travelTracker at the [deployment link](http://maddielaw.github.io/TravelTracker).


## Features

### Login Page

The user will see the login page on load -- the login credentials are:
- username: `traveler50` (with 50 representing the traveler's ID. Any number between 1 and 50 is supported)
- password: `travel`

![travelTracker login page](https://media3.giphy.com/media/FSlJC1uvXhdhQAnuza/giphy.gif?cid=790b76118e5d5f6f6c2d03cdd703d6dbe5398aa4c70dbd2c&rid=giphy.gif&ct=g)


### Travel Dashboard

After logging in, a user will see their travel dashboard populated with their past, present, upcoming, and pending trips. They can filter their trips by selecting the `upcoming trips` or `pending trips` buttons. They can also see their traveler profile on the right-hand sidebar.

![travelTracker dashboard](https://user-images.githubusercontent.com/92049763/157094034-28128b03-97de-4662-bc01-8b0444e8556d.gif)


### Book a New Trip

A user can select the `book now` button on the right-hand sidebar in order to book a new trip. They are directed to a form page where they can select the departure date, trip duration, number of travelers, and select the location from a dropdown. 

After filling out the form the user can receive a cost estimate for the trip and choose to submit. At any time in the process they can clear the form or return to the main dashboard.

After submitting the trip request the user will see a success message letting them know their trip will be looked over and approved by the travel agent. If they return to the main dashboard they will see their new trip as pending.

![travelTracker - book new trip](https://user-images.githubusercontent.com/92049763/157094501-5a79c4bb-c63f-4348-b57c-9886a2e58cb4.gif)
*Note:* departure dates in the past, trip durations over 365 and a traveler count over 10 are not accepted.


### Accessibility

travelTracker was built with accessibility in mind -- I tested my site's accessibility with Lighthouse and the site is fully functional utilizing `tab`. I'm committed to continuing to improve on this to ensure that my site is accessible for all users and welcome additional feedback!

### Responsive Design 

travelTracker is responsive for desktop, laptop, tablet, and mobile users so travelers can track their trips on the go!

![travelTracker mobile](https://user-images.githubusercontent.com/92049763/157099342-f4069b48-14b0-4198-be1c-ecb0d9c12519.gif)


## Future Additions
- Add a travel agent login and dashboard so the agency can view all travelers and approve pending trips, suggest activities for travelers trips, and add new destinations
- Flesh out the traveler sidebar with additional stats, such as the number of days they've traveled, a countdown to their next trip, etc.
- Allow user ability to star / favorite destinations
- Incorporate local storage so that a traveler's dashboard will persist on refresh


## Credits
Author: [Maddie Law](https://github.com/maddielaw)

Project spec -> [here](https://frontend.turing.edu/projects/travel-tracker.html)

[Turing School of Software and Design's GitHub](https://github.com/turingschool-examples)

[Google Fonts - icons and fonts](https://fonts.google.com/?query=work)

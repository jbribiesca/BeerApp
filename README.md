# BeerApp

- - -
##### To the [Burp! Beer App](https://burp-beer-app.herokuapp.com/)

- - -

### App feature

Burp! helps you keep track of any beer you have ever tasted.

Wether you are enjoying your beer at the bar, at a friends place or in your own living room, this app will help you remember these moments.

Burp! is all about convenience. No more memorizing the beer names for the ones you tasted in the past, all you have to do is log into your app and look it up in your profile. In addition, you can search any beer to find out its name, type, ABV and brewery. And after you tasted it, just rate it and add it to your dashboard. On top of it, we showing you the most trending beers on our homepage. Just come and visit...Burp!


![Results](/public/images/landing-page.png)

- - -

### Technical Overview

#### Beer search, check-in and review

The landing page will display a placeholder list of the top rated beers. This list will be replaced with new list based on the users search input. The user can pick the beer he/she was looking for and check it in. This will bring up a rating modal to ask the user for its review and rating. When submitted it will be posted on the users profile dashboard page under the recent activity section. 

If the user was not signed in at check-in, he/she is prompt to sign in by being redirected to the sign-in page. 

![Results](/public/images/search.gif)


#### Authentication, age verification and form validation

**@Sign-Up**

New users need to be at least 21 years old to create an account. 

![Results](/public/images/age-validation.gif) ![Results](/public/images/eric.png)


New user receives a Passport authentication if the email already exists. Form validation also applies on this form. 

![Results](/public/images/sign-up-1.png)

![Results](/public/images/sign-up-2.png)

**@Sign-In**

User receives a Passport authentication error if the email does not exist or if the password is incorrect. Form validation also applies to this form. 

![Results](/public/images/sign-in-1.png)

![Results](/public/images/sign-in-2.png)

- - -

#### Tools used:
* Bootstrap - CSS Framework
* Node.js - Backend Engine
* Express Handlebars - Template Engine
* Express - Server and routes (API/HTML)
* Sequelized - ORM (MVC Design Pattern)
* Passport - Authentication
* Axios - Promise based HTTP client
* Heroku - Website hosting
* Other NPM Packages used to make things work:
    * bcrypt-nodejs
    * connect-flash
    * cookie-parser
    * dotenv
    * express-session
    * moment
    * mysql2
    * passport-local

- - -
#### Enjoy the app! 


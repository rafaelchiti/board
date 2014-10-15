Board
=====


I'm building a Cards app (like Trello) with the main motivation of trying the following tech. stack:

- NodeJS (for the API and the Web App)
- FLUX for the data flow architecture
- ReactJS (for the view layer)
- Webpack (for enabling common js on the web app)
- Handlebars (using hbs to enable some sugar with partials and other stuff from Handlebars)
- Stylus (my css precompiler)


#### To run the app just:
```
$ git clone git@github.com:rafaelchiti/board.git
$ npm install -g webpack (if you don't have it already)
$ webpack -d -w (to get webpack running and watching for changes)
$ node app.js (to get the server running)
```

#### Try it on heroku
http://board-board.herokuapp.com/

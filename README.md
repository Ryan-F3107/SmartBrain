# SmartBrain
:upside_down_face: Due to Heroku free package being discontinued, the project link is no longer functionable. The project can still be cloned onto your computer to run locally. Will look into making some changes to get the project running again.:rocket:
After clicking the link
-- If your don't already have an account  -- 
1) Please create an account by clicking the register button and filling in the form.
2) Once you have hit register, you will be logged in.
-- Activity --
3) Copy an image url ( right-click image -> copy image address )
4) Paste the link in the input bar and click the button 'Detect'
5) The clarafai api will detect the face in the image and increment your score by one. ( The api can only detect one face in an image )
6) Finally, you can sign out. Your score will be saved in a database and you can log into your account anytime.

## Frontend ##
Used create-react app with reactjs,css and javascript

## Backend ##
Used node.js, postgreSQL for the database.

The application was deployed using Heroku.

To run this program. (If you want to run it locally)
---
1) Clone the repository
2) Run npm install -> [ on command line ]
3) Run npm start
4) This program uses an API from Clarafai. You would need to create an account (for free) on Clarafai to get your own API key for the face detect model.
Link to Clarafai : https://www.clarifai.com/

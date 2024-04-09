# <MongoDB-Social-API>

## Description
An custom built API that utilizes MongoDB and Mongoose to manage basic back-end functionality for a very simple social media application.  I built this as an excercise in familiarizing myself with MongoDb (and Mongoose), as well as building an application with the MVC (model-view-controller) design pattern.  Prior to this excercise, I was building API's by implementing all of the CRUD methods within the API calls themselves, but after working with Mongoose, I have found that putting all of that functionality in the controllers is much more intuitive since it leaves the API route files a lot cleaner, letting them do their thing.  Learning this was initially a bit difficult, but after I understood how to modularize the seperate functionality it basically wrote itself.  The big hang-ups I had were with designing how I should nest and associate the models and documents in the database.  Specifically, I struggled with associating users with their "thoughts" (posts) and whether or not I should have reactions to thoughts also be associated with users.  Once I realized that I could just push data into the various arrays whenever an API call is made, it all made sense.  

## Installation

- Run `npm install` in the root directory of the repo to grab all of the required packages.  
- Run `npm util/seed-data` to seed some data with some very minimal data and users.  



## Usage

I utilized Insomnia to test out the various API routes, but you can also use Postman.  Make sure you seed the data first.  



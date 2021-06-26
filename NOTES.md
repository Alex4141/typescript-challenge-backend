# Notes on the Backend Challenge

# How to run
1. Download this project to your local environment.
2. Run "npm install" in the root directory
3. Run npm start
4. Make sure you have a REST tool like Postman installed.

# Challenge 1 - Build reusable Mongo Connection

Implementation for this is in src/db/index.ts

Wrote a simple function that instantiates a Mongo Client and returns
a Promise with the resolution being the Sample Airbnb database.

I invoke said function and export that particular instance of the database to be used by both reviews and stays.

# Challenge 2 - Add filter functionality to the stays endpoint

HTTP Method: POST
Endpoint Name: /stays
Body Parameters: 
* bedrooms - Number
* beds - Number
* bathrooms - Number
* amenities - An array of strings 

My implementation uses a POST endpoint called /stays
This endpoint accepts the filtering criteria featured above in the POST body

I leveraged the Joi library for input validation, because ensuring that user input contains the correct signatures is pivotal.

I created a small file in src/utils/schema that contains the Joi Schemas.

Most of the schema checks occur in middlewares, so we can return error messages early instead of processing bad input.

I split up the routing logic from the business logic. Routing logic for "stays" can be found in /src/routers/stays.ts and business logic can be found in /src/services/stays.ts

Lastly, after middleware validation, we get the reusable mongo db object and run our query with the filter parameters

# Challenge 3 - Add a pagination strategy to the stays endpoint

Implementation: Query Parameter on the URL
Query Parameter = _id - Number
Example: http://localhost:3000/stays/?_id=1321603

A popular way to do this w/ Mongo DB is to use skip and limit. This is suboptimal at scale because mongo must parse through all the records that you skip. This approach would work for the size of our dataset, but I did not opt for this approach.

Instead I decided to use find and limit, also known as keyset pagination. This technique is significantly more efficient. We take advantage of the fact that mongo's _id has a natural ordering. 

In my implementation, we allow the user to provide an optional parameter called _id. The intention is that the user will input the id of a record from their previous API call. This will return the next 25 records with id's greater than that of the id inserted.

Ultimately, this allows the users to efficiently get the listings in a paginated manner.

# Challenge 4 - Create a reviews endpoint

HTTP Method: GET
Endpoint Name: /reviews/<**url param**>
Example: http://localhost:3000/reviews/10083468

My implementation uses a GET endpoint called /reviews
It takes an additional parameter, which is the id of the record that we're trying to pull reviews from

Once again split up business logic from route logic using the same pattern as stays. 

Also using Joi Schemas in a middleware to validate the id is a numeric input

Grab the reusable Mongo connection again and when querying, I make sure to only return the reviews field.

## Challenge 5 - Please strongly type your project 🙂

I was able to get a reasonable amount of typing coverage in this project.
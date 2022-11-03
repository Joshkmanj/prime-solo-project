# Shiftly

_Two Week Sprint_


Shiftly is a shift trading app whose purpose is to solve the complicated and outdated shift trading practices of a former employer of mine, which utilized paper forms and unintuitive scheduling software that required training to understand and navigate. In a 300 person department, shifts are traded frequently and in large quantities, which creates an incredibly time intensive and cumbersome problem for both management and employees alike. 

### Prerequisites

Software required to install the app.

- [Node.js](https://nodejs.org/en/)
- [Postgres](https://www.postgresql.org/download/)


## Installation

1. Create a database named `prime_app`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries.
3. (OPTIONAL) Create a long string of random characters that can replace `superDuperSecret` in the code block below. Here's a site that can help: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning. If this is for testing purposes, then having a high security encryption key is not as necessary.
4. Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
5. Open up your editor of choice and run an `npm install`
6. Run `npm run server` in your terminal
7. Run `npm run client` in your terminal, this command will open up a new browser tab for you!


## Usage

- Employees: Pick up, give away, and call in sick for shifts.

## Built With

- Javascript
- React 
- Redux 
- Sagas
- Material UI
- Node.js
- PostgresQL
- Axios
- Express


## Acknowledgement
I'm very thankful to the healthcare staff that I interviewed as part of my research for this application. I'm also very thankful to [Prime Digital Academy](www.primeacademy.io) for equipping me with the skills I needed to build this app.


## Support
If you have suggestions or issues, please email me at joshuakralewski@gmail.com
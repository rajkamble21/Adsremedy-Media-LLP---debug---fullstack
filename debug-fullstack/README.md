# README


#### **Objective:** All the code is already written, your goal is to resolve bugs so that the project works end-to-end.

The project is split into two parts: the backend (server-side) in Node.js/Express.js and the frontend (client-side) in React.js.
Tha database to be used is PostgreSQL.

#### Tip: First, set up PostgreSQL. Then, fix backend issues. Finally, address frontend problems.

### Backend:
- Set up a PostgreSQL database and create necessary tables with columns according to the provided `queries.js` file.

- Configure a `.env` file to securely access environment variables for database connection.
Use the provided `.env.example` file as a template to create a new `.env` file.

- Fix the APIs and thoroughly test them. 


### Frontend:
- Ensure that the user list on the table is always visible.

- Manage the application's state (how data is stored and accessed) correctly.

- Display an alert with error messages if something goes wrong on the backend.

#### Bonus:
Implement measures to prevent the application from crashing and enable it to restart automatically if it does.


#### Resources:
- Install PostgreSQL: https://www.youtube.com/watch?v=0n41UTkOBb0

- PostgreSQL Node.js Library: https://node-postgres.com/apis/pool  

- Dotenv Node.js Library: https://www.npmjs.com/package/dotenv
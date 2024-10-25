# Twitter Clone Backend

## Overview

This is the backend for a simple Twitter clone application that supports user authentication and tweet management. The backend is built using Node.js and Express.js and connects to a MongoDB database.

## Features

- **User Authentication:** Secure sign-up and login for users.
- **Tweet Management:** Create, read, update, and delete tweets.
- **Database Integration:** Uses MongoDB for data storage and retrieval.

## Technologies Used

- **Node.js:** JavaScript runtime for building the backend.
- **Express.js:** Web framework for building the API.
- **MongoDB:** NoSQL database for storing user and tweet data.
- **Mongoose:** ODM for MongoDB and Node.js.
- **JWT:** JSON Web Tokens for secure authentication.

## Installation

To set up the backend, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ali-404/TWITTER_CLONE_BACKEND.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd TWITTER_CLONE_BACKEND
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

4. **Set up environment variables:** Create a `.env` file in the root directory and configure your database connection and any other necessary environment variables.

5. **Run the application:**
   ```bash
   npm start
   ```

## API Endpoints

- **POST /api/auth/signup:** Register a new user.
- **POST /api/auth/login:** Log in an existing user.
- **GET /api/tweets:** Retrieve all tweets.
- **POST /api/tweets:** Create a new tweet.
- **PUT /api/tweets/:id:** Update an existing tweet.
- **DELETE /api/tweets/:id:** Delete a tweet.

## Frontend Repository

The frontend for this application can be found at the following repository:
[Twitter Clone Frontend](https://github.com/Ali-404/twitter-clone-test)

## Contributing

If you'd like to contribute to this project, please fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

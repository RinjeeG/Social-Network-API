
# Social Network API

## Description

This project is a Social Network API built with Express.js for routing and MongoDB with Mongoose ODM for the database. The API allows users to share thoughts, react to friends' thoughts, and manage a friend list.

## Goal

The goal of this project is to create a scalable API for a social network application that can handle large amounts of unstructured data using a NoSQL database. This API enables the creation, retrieval, updating, and deletion of users and their thoughts, as well as managing reactions to thoughts and friendships between users.

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd social-network-api
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the server:
   ```sh
   npm start
   ```
2. Use Insomnia or any other API client to test the API routes.

## API Routes

### Users

- `GET /api/users`: Get all users
- `GET /api/users/:userId`: Get a single user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:userId`: Update a user by ID
- `DELETE /api/users/:userId`: Delete a user by ID

### Thoughts

- `GET /api/thoughts`: Get all thoughts
- `GET /api/thoughts/:thoughtId`: Get a single thought by ID
- `POST /api/thoughts`: Create a new thought
- `PUT /api/thoughts/:thoughtId`: Update a thought by ID
- `DELETE /api/thoughts/:thoughtId`: Delete a thought by ID

### Reactions

- `POST /api/thoughts/:thoughtId/reactions`: Create a reaction for a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Delete a reaction by ID

### Friends

- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list

## Walkthrough Video

[Link to Walkthrough Video](<https://www.loom.com/share/93fcd869501a4043844ddf6329f885c4?sid=170471de-c05d-4a74-8e1c-501b661af5c1>)

## License

This project is licensed under the MIT License.

---

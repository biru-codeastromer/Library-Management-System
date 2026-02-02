# Library Management API

A robust REST API for managing library inventory. Built with Node.js, Express, TypeScript, and MongoDB using clean Architecture (Controller-Service-Repository).

## Features
- **CRUD Operations**: Create, Read, Update, Delete books.
- **Advanced Search**: Filter by genre, search by title/author.
- **Pagination & Sorting**: Efficient data retrieval.
- **Authentication**: Secured write operations using API Key.
- **Architecture**: Strict OOP principles and separation of concerns.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install

```

3. Create a `.env` file:
```env
PORT=8080
MONGODB_URI=your_mongodb_connection_string
API_KEY=secret123

```


4. Run the server:
```bash
npm run dev

```



## API Endpoints

### Books

* `GET /books`: Get all books (Supports `?page=1&limit=5&search=harry&genre=fantasy&sortBy=price:desc`)
* `GET /books/:id`: Get single book details.
* `POST /books`: Create a new book (Requires Header `x-api-key: secret123`).
* `PUT /books/:id`: Update book details (Requires Header `x-api-key: secret123`).
* `DELETE /books/:id`: Remove a book (Requires Header `x-api-key: secret123`).

## Project Structure

* `src/controllers`: Handles incoming requests and responses.
* `src/services`: Contains business logic and validations.
* `src/repositories`: Handles direct database interactions.
* `src/models`: Mongoose schemas.

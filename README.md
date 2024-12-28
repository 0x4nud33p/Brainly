# Brainly - Save, Organize, and Share Links with Tags

## Overview
Brainly is a MERN stack application designed to help users save, organize, and share their favorite links. Users can:

- Save important links and assign custom tags for organization.
- Filter saved links based on tags for easy retrieval.
- Share their saved collections with others.
- Enjoy secure access through user authentication.

## Features
- **User Authentication:** Secure signup and login using JWT.
- **Save Links:** Save links along with a title, description, and tags.
- **Tag-Based Filtering:** Quickly filter saved links by tags for efficient navigation.
- **Sharing Collections:** Share your entire saved collection of links with others.
- **Responsive Design:** Fully responsive design for seamless use across devices.

## Tech Stack

### Frontend
- React
- Tailwind CSS (for styling)

### Backend
- Node.js
- Express.js

### Database
- MongoDB (with Mongoose for schema modeling)

### Authentication
- JSON Web Tokens (JWT)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/anudeep009/Brainly
   cd Brainly
   ```

2. **Install dependencies:**
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd client
     npm install
     ```

3. **Set up environment variables:**
   - Create a `.env` file in the `server` directory and include:
     ```env
     PORT=5000
     MONGO_URI=<Your MongoDB URI>
     JWT_SECRET=<Your JWT Secret Key>
     ```

4. **Start the application:**
   - Backend:
     ```bash
     cd server
     npm start
     ```
   - Frontend:
     ```bash
     cd client
     npm start
     ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Sign up or log in:** Create an account or log in to access your dashboard.
2. **Add links:** Save your favorite links with a title, description, and tags.
3. **Filter by tags:** Use the tag-based filter to quickly find specific links.
4. **Share collections:** Share your collection with others via a unique link.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Sign up a new user.
- `POST /api/auth/login` - Log in an existing user.


### Sharing
- `GET /api/links/share/:userId` - Retrieve all shared links for a specific user.

## Contributing
Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes and push to the branch.
4. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For any inquiries or feedback, contact:
- **GitHub:** [anudeep009](https://github.com/anudeep009)

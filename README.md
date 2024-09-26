
 E-Commerce Application

 Installation and Setup Instructions

 Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.
- Make sure you have [MongoDB](https://www.mongodb.com/) installed and running, or use a cloud database service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Clone the Repository
1. Open your terminal and clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

 Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables (create a `.env` file):
   ```plaintext
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm start
   ```
   Navigate to the admin folder:

bash
4.  Start the admin application:
cd ../admin
Install admin panel dependencies:



npm install
Start the admin panel application:


npm start

Accessing the Application
- Open your web browser and navigate to `http://localhost:4000` to access the application.

Additional Notes
- Ensure that the backend server is running before starting the frontend application.
- For any database operations, make sure your MongoDB server is running.

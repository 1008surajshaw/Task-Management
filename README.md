Prerequisites
Make sure you have the following installed on your machine:

Node.js: Download and Install Node.js
npm: npm Installation Guide
MongoDB: Install MongoDB
Setup Instructions
Clone the repository to your local machine:

bash
Copy code
git clone [repository_url]
Navigate to the project directory:

bash
Copy code
cd [project_directory]
Initialize the server:

bash
Copy code
npm init -y
Navigate to the server directory:

bash
Copy code
cd server
Initialize the server npm package:

bash
Copy code
npm init -y
Create a .env file in the server directory and add the following content:

env
Copy code
# Database connection
PORT=4000
MONGODB_URL="mongodb://localhost:27017/Task_management"

# Cloudinary connection
API_SECRET="your_secret_key"
API_KEY="your_api_key"
CLOUD_NAME="your_cloud_name"
FOLDER_NAME="your_folder_name"

JWT_SECRET="suraj"

# For mail
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email_id
MAIL_PASS=your_app_password
Note: Replace placeholders with your actual values.

Navigate back to the root directory:

bash
Copy code
cd ..
Create a .env file in the root directory and add the following content:

env
Copy code
REACT_APP_BASE_URL="http://localhost:4000/api/v1"
Note: Adjust the base URL if needed.

You're all set! Run the following command to start the application:

bash
Copy code
npm run dev
This will start both the server and the React app.

Open your browser and navigate to http://localhost:3000 to view the application.

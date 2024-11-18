# Restro Mnager
Restaurant management system

Backend folder: /server

## Getting Started

First, run the development backend server:
```bash
cd server
npm install
npm run dev
```
then frontend 
```bash
npm install
npm run dev
```

### env
.env in root folder
```
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```
.env in /server
```
NODE_ENV="development"
PORT="8080"
HOST="localhost"

CORS_ORIGIN="http://localhost:3000"

MONGODB_URL=

// cloudinary secret
CLOUD_NAME = 
API_KEY = 
API_SECRET =
```

# User Management System

A multi-service user management application built with below technologies:
├── Angular 20.*.* (Frontend UI)
├── Node.js + Express (Backend REST API)
├── Redis (Caching)
├── MongoDB (Database)
├── JWT Authentication and token based api request
└── Docker, Dockerfile & Docker-Compose (for containerization)
	
# Project Structure
project-root/
├── usersApp (frontend UI developed in Angular20)
├── usersAPI (backend REST API developed in Node.js + Express)
├── .env.deve
├── .env.prod
├── .gitignore
├── Dashboard-Dataload-from-cache.png
├── Dashboard-Dataload-from-database.png
├── docker-compose.yml (composed with shared repository image location
├── Brief overview-User Management System.pdf
├── Login-Screen.png
├── README.md
├── User Management System - Advance.pdf
├── User-add.png
├── User-Dashboard.png
└── User-edit.png
	

# Project Features

Frontend (Angular Tier)
├── Login page with JWT token storage
├── Users dashboard with CRUD operations
├── Add/Edit User component with reactive forms
├── Authentication guard (CanActivate)
├── JWT Interceptor for secure API calls
└── Responsive styling with basic CSS

Backend (Node.js Tier)
├── REST API with Express
├── JWT token validation
├── Routes for login, user dashboard and user CRUD operations
├── Password hashing with bcrypt
└── MongoDB connection with Mongoose

Database (MongoDB Tier)
├── NoSQL database for storing user data
└── Data persists using Docker volumes

Redis (Data Caching)
├── It will case user data  on first calls
├── It will persist data for 60 seconds
├── If any Add/Delete action taken then cache will refresh with new data
└── For testing in api response source will show db/cache 

# Docker public repositories
├── rajeevsharma4nagarro/poc-api-service
└── rajeevsharma4nagarro/poc-app-ui

# GitHub public repositories (branch : advance-POC)
├── https://github.com/rajeevsharma4nagarro/dockerPOC
└── https://github.com/rajeevsharma4nagarro/dockerPOC.git


# Docker & Compose Setup

Prerequisites
├── Angular CLI: 20
├── Node: 22
├── Package Manager: npm 10
├── Docker: 20 
└── Docker Compose: V2

Note: docker-compose.yml file have image referenc from shared docker hub respository, so to run the application in local environment just download repository from git.
Open terminal and nevigate to this path run below command, it will bring up application.

# Screenshots of the application in action
├── Login screen (Login-Screen.png)
├── Dashboard (User-Dashboard.png)
├── Add User (User-add.png)
└── Edit User (User-edit.png)

# Download all images, Build and Start All Services
├── docker compose --env-file .env.deve up --build -d  (when we are using development environment build, It will run Frontend on 4201 port)
├── docker compose --env-file .env.test up --build -d  (when we are using testing environment build, It will run Frontend on 4202 port)
├── docker compose --env-file .env.prod up --build -d  (when we are using production environment build, It will run Frontend on 4203 port)
├── docker-compose up -d (This command was also enough in case we are not using environment variables.)
├── open http://localhost:8080
├── login screen will be prefilled credential Admin/Admin1
└── From dashboard click Add button, fill form and click Save. Next time this user credential can be use for login.



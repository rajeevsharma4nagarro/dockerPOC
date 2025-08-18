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
├── ci-cd.yml.txt
├── CI-CD-Job.png
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

# GitHub CI/CD Pipe line configuration
├── Make changes in any branch	
├── Create PR for source branch (main) which is set as default branch
├── CI/CD Action workflow job (Docker Advance CI-CD Pipe line POC : ci-cd.yml) is configured on push changes in main branch
├── I have configured jobs: build-and-deploy which run ubuntu:latest
├── Steps I covered in ci/cd pipe line:
├── ── Check out git branch
├── ── Login Docker hub
├── ── Build UI Application and push image with tag V{$ github.run_number } and Latest
├── ── Build Api Service and push image with tag V{$ github.run_number } and Latest
├── Now Latest image will published on docker repository

Note: docker-compose.yml file have image referenc from shared docker hub respository, so to run the application in local environment just download repository from git.
Open terminal and nevigate to this path run below command, it will bring up application.

# Screenshots of the application in action
├── Login screen (Login-Screen.png)
├── Dashboard (User-Dashboard.png)
├── Add User (User-add.png)
├── Edit User (User-edit.png)
├── Dashboard-Dataload-from-cache.png
└── Dashboard-Dataload-from-database.png

# Download all images, Build and Start All Services
├── docker compose --env-file .env.deve up --build -d  (when we are using development environment build, It will run Frontend on 4201 port)
├── docker compose --env-file .env.prod up --build -d  (when we are using production environment build, It will run Frontend on 8080 port)
├── open http://localhost:8080
├── login screen will be prefilled credential Admin/Admin1
├── From dashboard click Add button, fill form and click Save. Next time this user credential can be use for login.
├── To check the data caching open developer tool and nevigate to network tab.
├── After login when dashboard page opens check response it  will show source  as  db because 1st hit  fetch data from database.
├── Refresh the same page with in 60 seconds and check api response source will cache
├── Cache will persist  for 60 seconds or till the time any add/delete action not taken 
└── For reference refer scree shots Dashboard-Dataload-from-cache.png, Dashboard-Dataload-from-database.png



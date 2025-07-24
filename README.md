# User Management System

A multi-service user management application built with below technologies:
├── Angular 20.*.* (Frontend UI)
├── Node.js + Express (Backend REST API)
├── MongoDB (Database)
├── JWT Authentication and token based api request
└── Docker, Dockerfile & Docker-Compose (for containerization)
	
# Project Structure
project-root/
├── Brief overview-User Management System.pdf
├── docker-compose.yml (composed with shared repository image location)
├── usersApp (frontend UI developed in Angular20)
├── usersAPI (backend REST API developed in Node.js + Express)
└── README.md	

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


# Docker & Compose Setup

Prerequisites
├── Docker
└── Docker Compose

# Docker public repositories
├── rajeevsharma4nagarro/mongo
├── rajeevsharma4nagarro/usersapi
└── rajeevsharma4nagarro/usersapp

# GitHub public repositories


# Download all images, Build and Start All Services
├── docker-compose up -d //if docker Compose V1
└── docker compose up -d //if docker Compose V2 (without hyphen)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE DATABASE routinetaskmanager;

-- Account Creation
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    is_admin BOOLEAN DEFAULT FALSE,
    otp TEXT,
    otp_time TIMESTAMP,
    google_id VARCHAR(255),
    facebook_id VARCHAR(255),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Profile Creation
CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY REFERENCES users(user_id),
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    avatar_url TEXT
);
--add Task
CREATE TABLE add_task (
    task_id SERIAL PRIMARY KEY,
    task_title VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_time INTERVAL CHECK (estimated_time IN ('5 minutes', '15 minutes', '30 minutes', '45 minutes', '1 hour')),
    category_color VARCHAR(20) CHECK (category_color IN ('Blue', 'Green', 'Orange', 'Purple', 'Red')),
    category_type VARCHAR(20) CHECK (category_type IN ('Health', 'Household', 'Childcare', 'Errands', 'Hobby')),
    new_category VARCHAR(50),
    task_priority VARCHAR(20) CHECK (task_priority IN ('High', 'Medium', 'Low'))
)
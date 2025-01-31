﻿# Educational ChatBot

Educational ChatBot is a responsive chatbot application designed to provide educational information and suggestions to users. The project consists of a **React frontend** and a **backend** (API integration), offering seamless interactions and a visually appealing interface.

---

## Table of Contents

1. [General Info](#general-info)
2. [How to Run the Backend](#how-to-run-the-backend)
3. [How to Run the Frontend](#how-to-run-the-frontend)
4. [Features](#features)
5. [Technologies Used](#technologies-used)

---

## General Info

- **Frontend**: Built using React for creating an interactive and user-friendly interface.
- **Backend**: Communicates with an API for fetching responses based on user queries.
- **Purpose**: To provide users with educational information and dynamic suggestions in an intuitive chat format.
- **Key Features**:
  - Dynamic suggestions for similar questions.
  - Distinct user and bot icons for better clarity.
  - Fully responsive design optimized for all devices.

---

## How to Run the Backend

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Set up a virtual environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate       # macOS/Linux
   venv\Scripts\activate        # Windows
   ```

3. **Install dependencies**:
   Install the required Python libraries:

   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server**:
   Run the FastAPI server using Uvicorn:

   ```bash
   uvicorn app:app --reload
   ```

5. **Access the backend**:
   The backend will be running at:
   [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## How to Run the Frontend

1. **Navigate to the project directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   Use `npm` to install all required packages:

   ```bash
   npm install
   ```

3. **Run the development server**:
   Start the React application:

   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and go to:
   [http://localhost:3000](http://localhost:3000)

---

## Features

### Frontend

- **Dark Mode UI**: A sleek, visually appealing dark mode theme.
- **Interactive Chat**: Users can type queries or select from suggested questions.
- **Distinct Icons**: Separate icons for the user (person) and the bot (robot) for better user experience.
- **Smooth Scrolling**: Automatic scrolling for seamless chat navigation.

### Backend

- **Dynamic Responses**: Fetches relevant responses from the API based on user queries.
- **Expandable Data**: Easily update backend logic to include new FAQs.
- **Error Handling**: Provides fallback messages in case of API errors.

---

## Technologies Used

- **Frontend**: React, Axios, React Icons
- **Backend**: FastAPI, Uvicorn
- **Styling**: CSS for custom themes and layouts
- **Environment Management**: Python Virtual Environment (venv)

---

# Farazi Dokan Automation Project

This project contains end-to-end UI automation tests for **Farazi Dokan** using [Playwright](https://playwright.dev/).

---

## 📌 Project Overview

The test suite covers:

1. **User Signup**  
   - Navigates to the signup page  
   - Fills the registration form with unique email  
   - Submits the form  
   - Validates successful signup  

2. **User Login & Profile Update**  
   - Logs in with valid credentials  
   - Navigates to profile  
   - Updates mobile number, birthday, and gender  
   - Validates update using both **UI assertions** and **API response**  

---

## 📂 Project Structure

.
├── pages/
│ └── SignupPage.ts # Page Object for Signup functionality
├── tests/
│ └── signup-login.spec.ts # Test specs for signup and login/profile update
├── playwright.config.ts # Playwright configuration file
├── package.json
└── README.md

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (>= 16.x)
- npm (comes with Node.js)
- Git

---

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd farazi-dokan-automation


# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# ▶️ Running the Tests
# Run all tests in headless mode:
npx playwright test


# Run tests in headed mode (browser visible):
npx playwright test --headed

# Run a specific test file:
npx playwright test tests/signup-login.spec.ts


# 📄 Example Command for Debugging
# To debug step-by-step:
npx playwright test --debug


👤 Author
Sakifur Rahman Fahim
Automation QA Engineer
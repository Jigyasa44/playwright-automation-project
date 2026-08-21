# Playwright Automation Project

A sample end-to-end test automation framework built using Playwright and TypeScript.

The project automates key user journeys on the SauceDemo application, including login, cart, and checkout scenarios.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Git & GitHub
- GitHub Actions

## Project Structure

```text
playwright-automation-project/
│
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
│
├── tests/
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
│
├── test-data/
│   └── loginData.ts
│
├── playwright.config.ts
├── package.json
└── README.md
Test Coverage
Login
Successful login
Invalid username
Invalid password
Data-driven negative login tests
Cart
Add product to cart
Verify product in cart
Checkout
Complete checkout successfully
Validate required checkout information
Framework Features
Page Object Model (POM)
Data-driven testing
Positive and negative test scenarios
Reusable page objects
Playwright assertions
Chromium, Firefox and WebKit testing
HTML test reports
GitHub Actions CI
Running the Tests

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

Run all tests:

npx playwright test

Run a specific test file:

npx playwright test tests/login.spec.ts

Run tests in headed mode:

npx playwright test --headed

Open the HTML report:

npx playwright show-report
Test Results

Current test suite:

15 tests passed across Chromium, Firefox and WebKit.

CI/CD

The project uses GitHub Actions to automatically execute the Playwright test suite when changes are pushed to the repository.

Application Under Test

SauceDemo:

https://www.saucedemo.com/

Author

Jigyasa Sharma

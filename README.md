
---

# EDOM Puppeteer Automation

This project automates the process of filling out an EDOM questionnaire on the Academia PNJ website using Puppeteer. It logs in, selects the appropriate academic year, fills out the questionnaire, and submits the responses.

## Prerequisites

Before running the project, make sure you have the following installed:
- **Node.js**: [Install Node.js](https://nodejs.org/)
- **NPM**: It comes with Node.js (use `npm -v` to verify installation)

## Setup Instructions

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/DumbiFadhil/edom-puppeteer.git
```

### 2. Install dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd edom-puppeteer
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the root of the project and add your **username** and **password** for login, along with the score you want to give for each scoring field:

```env
USERNAME=your-username
PASSWORD=your-password
RADIO_VALUE=5 (optional, leave blank to randomize each radio value)
```

### 4. Run the script

After setting up the `.env` file, you can run the automation script using the following command:

```bash
node index.js
```

This will start the automation process, logging in to the Academia PNJ website, selecting the academic year, and filling out the EDOM questionnaire.

### 5. (Optional) Customize the script

- You can modify the logic inside `index.js` to fit your specific use case or add more steps.
- Feel free to adjust the selectors and form values according to any changes on the website.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make changes and commit them (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

---
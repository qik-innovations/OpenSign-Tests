const fs = require('fs');
const path = require('path');

const loginCredentials = {
  FreeplanUsername: '',
  FreePlanpassword: '',
  ProplanUsername: 'pravin+proplan@nxglabs.in',
  ProPlanpassword: 'Nxglabs@123',
  email: process.env.LOGIN_EMAIL || 'pravin+testaccount@nxglabs.in',
  password: process.env.LOGIN_PASSWORD || 'Nxglabs@123',
  CustomStorageUser_Username: 'peter.mark1093@gmail.com',
  CustomStorageUser_Password: 'Nxglabs@123',
};

// Playwright calls this hook once before starting the test workers.
async function globalSetup() {
  const globalVarPath = path.join(__dirname, 'GlobalVar');
  fs.mkdirSync(globalVarPath, { recursive: true });

  const globalDataPath = path.join(globalVarPath, 'globalData.json');
  let existingData = {};

  if (fs.existsSync(globalDataPath)) {
    existingData = JSON.parse(fs.readFileSync(globalDataPath, 'utf8'));
  }

  const updatedCredentials = { ...existingData, ...loginCredentials };
  fs.writeFileSync(globalDataPath, JSON.stringify(updatedCredentials, null, 2));
  console.log('Global credentials initialized.');
}

// CommonSteps reads credentials from this module as well.
module.exports = globalSetup;
module.exports.loginCredentials = loginCredentials;

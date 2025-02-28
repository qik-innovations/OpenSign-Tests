const fs = require('fs');
const path = require('path');

// Define login credentials for free plan users
const loginCredentials = {
  FreeplanUsername: '',
  FreePlanpassword: '',
  //global veriables user name and password for Pro-plan user
  ProplanUsername: 'pravin+stevadwart@nxglabs.in',
  ProPlanpassword: 'Nxglabs@123',
    //global veriables user name and password for Teams-plan user
  email: process.env.LOGIN_EMAIL || 'pravin+testaccount@nxglabs.in',
  password: process.env.LOGIN_PASSWORD || 'Nxglabs@123',
};

// Ensure directory exists before writing the file
const globalVarPath = path.join(__dirname, './GlobalVar');
if (!fs.existsSync(globalVarPath)) {
  fs.mkdirSync(globalVarPath, { recursive: true });
}

// Path for global data file
const globalDataPath = path.join(globalVarPath, 'globalData.json');

try {
  // Read existing data if file exists
  let existingData = {};
  if (fs.existsSync(globalDataPath)) {
    existingData = JSON.parse(fs.readFileSync(globalDataPath, 'utf8'));
  }

  // Merge new credentials with existing data
  const updatedCredentials = { ...existingData, ...loginCredentials };

  // Write global credentials to JSON file
  fs.writeFileSync(globalDataPath, JSON.stringify(updatedCredentials, null, 2));

  console.log('✅ Global credentials set:', updatedCredentials);
} catch (error) {
  console.error('❌ Error writing global credentials:', error);
}

// Export module
module.exports = { loginCredentials };
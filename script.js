function loginWithGoogle() {
  // এখানে Google Login এর Firebase কোড বসবে
  document.getElementById('login-panel').style.display = 'none';
  document.getElementById('panel-selection').style.display = 'block';
}

function showStaffPanelCreate() {
  document.getElementById('panel-selection').style.display = 'none';
  document.getElementById('staff-create-panel').style.display = 'block';
}

function showManagerLogin() {
  document.getElementById('panel-selection').style.display = 'none';
  document.getElementById('manager-login-panel').style.display = 'block';
}

function createStaffAccount() {
  // এখানে Firebase এ অ্যাকাউন্ট সেভ করার কোড বসবে
  const name = document.getElementById('staff-name').value;
  const code = document.getElementById('staff-code').value;
  const designation = document.querySelector('input[name=\"designation\"]:checked')?.value;
  if (name && code && designation) {
    document.getElementById('staff-create-panel').style.display = 'none';
    document.getElementById('staff-entry-panel').style.display = 'block';
    document.getElementById('staff-info').innerHTML = `<p>Staff Name: <b>${name}</b><br>Designation: <b>${designation}</b></p>`;
  } else {
    alert(\"Please fill all fields.\");
  }
}

function loginManager() {
  document.getElementById('manager-login-panel').style.display = 'none';
  document.getElementById('manager-panel').style.display = 'block';
}

function loadManagerSummary(designation) {
  document.getElementById('summary-data').innerHTML = `
    <h3>${designation}</h3>
    <p>Number of staff: [loading]</p>
    <p>Old: [loading] | New: [loading]</p>
    <p>Amount of test: [loading]</p>
    <p>OT: [loading] | OT Amount: [loading]</p>
  `;
}

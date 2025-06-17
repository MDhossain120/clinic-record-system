const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('panel-selector').style.display = 'block';
  } else {
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('panel-selector').style.display = 'none';
    document.getElementById('staff-panel').style.display = 'none';
    document.getElementById('manager-panel').style.display = 'none';
  }
});

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function logout() {
  auth.signOut();
}

function showPanel(type) {
  document.getElementById('staff-panel').style.display = type === 'staff' ? 'block' : 'none';
  document.getElementById('manager-panel').style.display = type === 'manager' ? 'block' : 'none';
}

document.getElementById("entryForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const patient = document.getElementById("patient").value;
  const pcName = document.getElementById("pcName").value;
  const pcCode = document.getElementById("pcCode").value;
  const doctor = document.getElementById("doctor").value;
  const newPatients = parseInt(document.getElementById("new").value);
  const oldPatients = parseInt(document.getElementById("old").value);
  const otCases = parseInt(document.getElementById("otCases").value);
  const otBill = parseFloat(document.getElementById("otBill").value);
  const total = newPatients + oldPatients;

  db.collection("patient_records").add({
    patient, pcName, pcCode, doctor,
    newPatients, oldPatients, otCases, otBill, total,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    alert("Submitted!");
    document.getElementById("entryForm").reset();
  });
});

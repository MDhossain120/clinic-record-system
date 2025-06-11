
function login() {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(result => {
      document.getElementById("staff-panel").style.display = "block";
    })
    .catch(error => {
      console.error("Login failed:", error);
    });
}

document.getElementById("staffForm").addEventListener("submit", function(e) {
  e.preventDefault();
  db.collection("staff_records").add({
    name: document.getElementById("staff_name").value,
    code: document.getElementById("staff_code").value,
    designation: document.getElementById("designation").value,
    mobile: document.getElementById("mobile").value
  }).then(() => alert("Staff saved"));
});

document.getElementById("patientForm").addEventListener("submit", function(e) {
  e.preventDefault();
  db.collection("patient_records").add({
    pc_name: document.getElementById("pc_name").value,
    pc_code: document.getElementById("pc_code").value,
    new_patient: Number(document.getElementById("new_patient").value),
    old_patient: Number(document.getElementById("old_patient").value),
    total_tests: Number(document.getElementById("total_tests").value),
    ot_cases: Number(document.getElementById("ot_cases").value),
    ot_charges: Number(document.getElementById("ot_charges").value),
    date: new Date().toLocaleDateString()
  }).then(() => alert("Entry saved"));
});

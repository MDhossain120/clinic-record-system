// script.js

let currentUser = null;

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      currentUser = result.user;
      alert("Login successful: " + currentUser.displayName);
    })
    .catch(error => {
      console.error("Login error:", error);
    });
}

function showPanel(panel) {
  document.getElementById("staff-panel").style.display = panel === "staff" ? "block" : "none";
  document.getElementById("manager-panel").style.display = panel === "manager" ? "block" : "none";
}

// Staff Form Submit
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("entryForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const data = {
        staffName: currentUser.displayName,
        staffEmail: currentUser.email,
        patient: document.getElementById("patient").value,
        pcName: document.getElementById("pcName").value,
        pcCode: document.getElementById("pcCode").value,
        doctor: document.getElementById("doctor").value,
        newPatients: parseInt(document.getElementById("new").value),
        oldPatients: parseInt(document.getElementById("old").value),
        totalPatients: parseInt(document.getElementById("new").value) + parseInt(document.getElementById("old").value),
        otCases: parseInt(document.getElementById("otCases").value),
        otBill: parseFloat(document.getElementById("otBill").value),
        timestamp: new Date()
      };

      db.collection("staff_records").add(data)
        .then(() => {
          alert("Data submitted successfully!");
          form.reset();
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        });
    });
  }
});

// Filter Manager Panel
function filterByStaffCode() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  db.collection("staff_records")
    .where("staffEmail", "==", input)
    .get()
    .then(snapshot => {
      let totalPatients = 0;
      let totalBill = 0;
      let html = "<h3>Results:</h3><ul>";

      snapshot.forEach(doc => {
        const d = doc.data();
        totalPatients += d.totalPatients || 0;
        totalBill += d.otBill || 0;

        html += `<li>${d.patient} | ${d.pcName} | ${d.doctor} | ${d.totalPatients} pts | ৳${d.otBill}</li>`;
      });

      html += `</ul><p><strong>Total Patients:</strong> ${totalPatients}</p>`;
      html += `<p><strong>Total OT Bill:</strong> ৳${totalBill}</p>`;

      resultsDiv.innerHTML = html;
    })
    .catch(err => {
      resultsDiv.innerHTML = "Error loading data";
      console.error(err);
    });
}

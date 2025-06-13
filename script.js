let currentUser = null;

function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(result => {
    currentUser = result.user;
    alert(`Welcome ${currentUser.displayName}`);
  });
}

function showPanel(panel) {
  document.getElementById("staff-panel").style.display = panel === 'staff' ? 'block' : 'none';
  document.getElementById("manager-panel").style.display = panel === 'manager' ? 'block' : 'none';
}

document.addEventListener("DOMContentLoaded", () => {
  const entryForm = document.getElementById("entryForm");
  if (entryForm) {
    entryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        staffName: currentUser.displayName,
        staffEmail: currentUser.email,
        patientName: document.getElementById("patient").value,
        pcName: document.getElementById("pcName").value,
        pcCode: document.getElementById("pcCode").value,
        doctor: document.getElementById("doctor").value,
        newPatients: Number(document.getElementById("new").value),
        oldPatients: Number(document.getElementById("old").value),
        otCases: Number(document.getElementById("otCases").value),
        otBill: Number(document.getElementById("otBill").value),
        totalPatients: Number(document.getElementById("new").value) + Number(document.getElementById("old").value),
        timestamp: new Date()
      };

      db.collection("staff_records").add(data).then(() => {
        alert("Record Saved Successfully!");
        entryForm.reset();
      });
    });
  }
});

function filterByStaffCode() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  db.collection("staff_records").get().then(snapshot => {
    let html = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.staffName.toLowerCase().includes(input) || data.pcCode.toLowerCase().includes(input)) {
        html += formatData(data);
      }
    });
    document.getElementById("results").innerHTML = html || "No records found.";
  });
}

function filterByDesignation() {
  const designation = document.getElementById("designationFilter").value;
  db.collection("staff_records").get().then(snapshot => {
    let html = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.designation === designation || designation === "") {
        html += formatData(data);
      }
    });
    document.getElementById("results").innerHTML = html || "No records found.";
  });
}

function formatData(data) {
  return `
    <div style="margin-bottom:10px;padding:10px;border:1px solid #ccc;border-radius:5px;">
      <strong>${data.staffName}</strong> (${data.pcCode})<br/>
      Patient: ${data.patientName} | Doctor: ${data.doctor}<br/>
      New: ${data.newPatients}, Old: ${data.oldPatients}, Total: ${data.totalPatients}<br/>
      OT Cases: ${data.otCases}, OT Bill: ${data.otBill}৳
    </div>
  `;
}

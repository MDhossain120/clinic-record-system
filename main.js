
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function login() {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => {
    document.getElementById("formArea").style.display = "block";
    loadEntries(res.user.displayName);
  });
}

function submitData() {
  const user = auth.currentUser;
  const data = {
    staff: user.displayName,
    patient: document.getElementById("patient").value,
    pcName: document.getElementById("pcName").value,
    pcCode: document.getElementById("pcCode").value,
    doctor: document.getElementById("doctor").value,
    new: parseInt(document.getElementById("newCount").value) || 0,
    old: parseInt(document.getElementById("oldCount").value) || 0,
    otCases: parseInt(document.getElementById("otCases").value) || 0,
    otBill: parseFloat(document.getElementById("otBill").value) || 0,
    total: 0,
    date: new Date().toLocaleDateString()
  };
  data.total = data.new + data.old;

  db.collection("entries").add(data).then(() => {
    alert("Submitted!");
    loadEntries(user.displayName);
  });
}

function loadEntries(staffName) {
  db.collection("entries").where("staff", "==", staffName)
    .orderBy("date", "desc")
    .get().then(snapshot => {
      const div = document.getElementById("entries");
      div.innerHTML = "<h3>Your Entries</h3>";
      snapshot.forEach(doc => {
        const d = doc.data();
        div.innerHTML += `<p><b>${d.date}</b>: ${d.patient}, Total: ${d.total}, OT Bill: ${d.otBill}</p>`;
      });
    });
}

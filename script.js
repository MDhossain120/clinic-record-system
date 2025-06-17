const auth = firebase.auth();
const loginBtn = document.getElementById("loginBtn");
const panelSelection = document.getElementById("panelSelection");
const staffBtn = document.getElementById("staffBtn");
const managerBtn = document.getElementById("managerBtn");

const staffPanel = document.getElementById("staffPanel");
const managerPanel = document.getElementById("managerPanel");

loginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      loginBtn.style.display = "none";
      panelSelection.classList.remove("hidden");
    })
    .catch(error => {
      alert("Login failed: " + error.message);
    });
});

staffBtn.addEventListener("click", () => {
  panelSelection.classList.add("hidden");
  staffPanel.classList.remove("hidden");
});

managerBtn.addEventListener("click", () => {
  panelSelection.classList.add("hidden");
  managerPanel.classList.remove("hidden");
});

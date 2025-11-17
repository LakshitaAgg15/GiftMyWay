import { auth, db } from "./firebaseConfig.js";

import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const editBtn = document.getElementById("editProfileBtn");
const modal = document.getElementById("editProfileModal");
const cancelEdit = document.getElementById("cancelEdit");
const saveChangesBtn = document.getElementById("saveChangesBtn");

const editName = document.getElementById("editName");
const editEmail = document.getElementById("editEmail");
const editPhone = document.getElementById("editPhone");

const dashName = document.getElementById("dashName");
const dashEmail = document.getElementById("dashEmail");
const dashPhone = document.getElementById("dashPhone");


// 🔥 STEP A — Load User Data and Fill Dashboard
auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  const docRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const data = snapshot.data();

    dashName.textContent = data.name;
    dashEmail.textContent = data.email;
    dashPhone.textContent = data.phone;
  }
});


// 🔥 STEP B — Open Edit Modal With Prefilled Data
editBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  const docRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    const data = snapshot.data();

    editName.value = data.name || "";
    editEmail.value = data.email || "";
    editPhone.value = data.phone || "";
  }

  modal.classList.remove("hidden");
});


// 🔥 Cancel Edit
cancelEdit.addEventListener("click", () => {
  modal.classList.add("hidden");
});


// 🔥 STEP C — Save Changes to Firestore
editProfileForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  saveChangesBtn.textContent = "Saving...";
  saveChangesBtn.disabled = true;

  const user = auth.currentUser;

  const updatedData = {
    name: editName.value,
    email: editEmail.value,
    phone: editPhone.value,
  };

  try {
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef, updatedData);

    // Update dashboard instantly
    dashName.textContent = updatedData.name;
    dashEmail.textContent = updatedData.email;
    dashPhone.textContent = updatedData.phone;

    modal.classList.add("hidden");
  } catch (error) {
    console.error("Error updating profile:", error);
  }

  saveChangesBtn.textContent = "Save Changes";
  saveChangesBtn.disabled = false;
});

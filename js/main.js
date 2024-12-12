"use strict";

// Helper functions for localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9]{5,15}@(gmail|yahoo)\.(com|net|org)$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

// Sign Up functionality
const usernameInput = document.querySelector("#userName");
const emailInput = document.querySelector("#userEmail");
const passwordInput = document.querySelector("#userPass");
const signUpButton = document.querySelector("#signUpButton");
const signUpMessage = document.querySelector("#required");

function addUser() {
  const userName = usernameInput?.value.trim();
  const userEmail = emailInput?.value.trim();
  const userPass = passwordInput?.value.trim();

  if (!userName || !userEmail || !userPass) {
    signUpMessage.innerHTML =
      '<span class="text-danger">All fields are required!</span>';
    return;
  }

  if (!validateEmail(userEmail)) {
    signUpMessage.innerHTML =
      '<span class="text-danger">Invalid email format!</span>';
    return;
  }

  if (!validatePassword(userPass)) {
    signUpMessage.innerHTML =
      '<span class="text-danger">Password must be at least 8 characters long, contain at least one uppercase letter and one number!</span>';
    return;
  }

  const users = getUsers();

  if (users.some((user) => user.email === userEmail)) {
    signUpMessage.innerHTML =
      '<span class="text-danger">Email already exists!</span>';
    return;
  }

  users.push({ name: userName, email: userEmail, password: userPass });
  saveUsers(users);

  signUpMessage.innerHTML =
    '<span class="text-success">Sign-up successful! Redirecting...</span>';
  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}

signUpButton?.addEventListener("click", addUser);

// Login functionality
const loginEmailInput = document.querySelector("#signEmail");
const loginPasswordInput = document.querySelector("#signPass");
const loginButton = document.querySelector("#loginButton");
const loginMessage = document.querySelector("#result-sign");

function searchUser() {
  const signEmail = loginEmailInput?.value.trim();
  const signPass = loginPasswordInput?.value.trim();

  if (!signEmail || !signPass) {
    loginMessage.innerHTML =
      '<span class="text-danger">All fields are required!</span>';
    return;
  }

  const users = getUsers();

  const user = users.find(
    (user) => user.email === signEmail && user.password === signPass
  );

  if (user) {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
    loginMessage.innerHTML =
      '<span class="text-success">Login successful! Redirecting...</span>';
    setTimeout(() => {
      window.location.href = "home.html";
    }, 2000);
  } else {
    loginMessage.innerHTML =
      '<span class="text-danger">Invalid email or password!</span>';
  }
}

loginButton?.addEventListener("click", searchUser);

// Welcome message on Home Page
const welcomeMessage = document.querySelector("#welcome");

function displayWelcomeMessage() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!currentUser) {
    window.location.href = "index.html";
    return;
  }

  welcomeMessage.innerHTML = `Welcome, ${currentUser.name}!`;
}

if (welcomeMessage) {
  displayWelcomeMessage();
}

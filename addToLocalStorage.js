// if (!localStorage.getItem("contactData")) {
//   localStorage.setItem("contactData", JSON.stringify([]));
// }

// const sendMessageBtn = document.getElementById("add-contact-message");

// const addContactMessage = () => {
//   const contactMessages = JSON.parse(localStorage.getItem("contactData")) || [];
//   const form = document.forms["contact-form"];
//   const email = form["email"].value;
//   const message = form["message"].value;

//   const newMessage = {
//     id: contactMessages.length + 1,
//     email: email,
//     message: message,
//   };

//   contactMessages.push(newMessage);
//   localStorage.setItem("contactData", JSON.stringify(contactMessages));
//   window.location.reload();
// };
// sendMessageBtn.addEventListener("click", addContactMessage);
const scriptURL =
  "https://script.google.com/macros/s/AKfycby-hV5G_QfHPIHG8vfzrFrvDKDPVX86o__zWCKIlJuKwh61gXj_KWGAqeRqGPIuMrcEZA/exec";
const form = document.forms["contact-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      form.reset();
      console.log(response);
    })
    .catch((error) => console.error("Error!", error.message));
});

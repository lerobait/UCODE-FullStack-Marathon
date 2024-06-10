document.addEventListener("DOMContentLoaded", function () {
  const saveForm = document.getElementById("save-form");
  const guessForm = document.getElementById("guess-form");
  const saveButton = document.getElementById("save");
  const clearButton = document.getElementById("clear");
  const checkButton = document.getElementById("check-password");
  const hashedPassword = document.getElementById("hashed-password");

  saveButton.addEventListener("click", function () {
    const password = document.getElementById("pass-to-session").value;
    const salt = document.getElementById("salt-to-session").value;

    if (!password || !salt) {
      return;
    }

    fetch("/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: password, salt: salt }),
    })
      .then((response) => {
        saveForm.style.display = "none";
        guessForm.style.display = "block";
        hashedPassword.textContent = hashPassword(password, salt);
        saveButton.textContent = "Clear";
      })
      .catch((error) => console.error("Error:", error));
  });

  checkButton.addEventListener("click", function () {
    const guess = document.getElementById("guess").value;
    fetch("/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: guess }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else if (response.status === 403) {
          document.getElementById("access-denied").style.display = "block";
          throw new Error("Access Denied!");
        } else {
          throw new Error("Failed to fetch");
        }
      })
      .then((data) => {
        document.getElementById("hacked-message").style.display = "block";

        saveForm.style.display = "block";
        guessForm.style.display = "none";
        saveButton.textContent = "Save";
        document.getElementById("access-denied").style.display = "none";
      });
  });

  clearButton.addEventListener("click", function () {
    fetch("/clear", {
      method: "POST",
    })
      .then(() => {
        document.getElementById("pass-to-session").value = "";
        document.getElementById("salt-to-session").value = "";
        document.getElementById("guess").value = "";

        document.getElementById("hacked-message").style.display = "none";
        document.getElementById("access-denied").style.display = "none";

        saveForm.style.display = "block";
        guessForm.style.display = "none";
        saveButton.textContent = "Save";
      })
      .catch((error) => console.error("Error:", error));
  });

  const hashPassword = (password, salt) => {
    return CryptoJS.SHA256(password + salt).toString(CryptoJS.enc.Hex);
  };
});

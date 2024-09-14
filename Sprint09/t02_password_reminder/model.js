document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const sendPasswordButton = document.getElementById("remind");

  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = new URLSearchParams(formData);

      try {
        const response = await fetch("/login", {
          method: "POST",
          body: data,
        });
        const result = await response.json();

        const messageDiv = document.getElementById("message");
        if (result.success) {
          window.location.href = "/profile";
        } else {
          messageDiv.innerText = result.message;
          messageDiv.style.color = "red";
        }
      } catch (error) {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Something went wrong!";
        document.getElementById("message").style.color = "red";
      }
    });
  }

  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener("click", async (event) => {
      event.preventDefault();
      const username = document.querySelector('input[name="username"]').value;
      const messageDiv = document.getElementById("message");

      if (username) {
        try {
          const response = await fetch(
            `/get-email?username=${encodeURIComponent(username)}`
          );
          const result = await response.json();
          if (result.success) {
            window.location.href = `/reminder?email=${encodeURIComponent(
              result.email
            )}`;
          } else {
            console.error(result.message);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      } else {
        messageDiv.innerText = "Please enter your login.";
        messageDiv.style.color = "red";
      }
    });
  }

  if (document.getElementById("email")) {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    if (email) {
      document.getElementById("email").innerText = `Email: ${email}`;
    }
  }

  if (sendPasswordButton) {
    sendPasswordButton.addEventListener("click", async () => {
      const emailElement = document.getElementById("email");
      if (emailElement) {
        const email = emailElement.innerText.replace("Email: ", "");
        if (!email) {
          alert("No email address found.");
          return;
        }
        try {
          const response = await fetch("/send-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const result = await response.json();
          const messageDiv = document.getElementById("message");
          if (result.success) {
            window.location.href = "/?message=password-sent";
          } else {
            if (messageDiv) {
              messageDiv.innerText = result.message;
              messageDiv.style.color = "red";
            }
          }
        } catch (error) {
          console.error("Error:", error);
          const messageDiv = document.getElementById("message");
          if (messageDiv) {
            messageDiv.innerText = "Something went wrong!";
            messageDiv.style.color = "red";
          }
        }
      }
    });
  }

  const statusDiv = document.getElementById("status");
  if (statusDiv) {
    fetch("/status")
      .then((response) => response.json())
      .then((data) => {
        statusDiv.innerText = `Status: ${data.role}`;
      });

    document.getElementById("logout").addEventListener("click", () => {
      fetch("/logout", { method: "POST" }).then(() => {
        window.location.href = "/";
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const messageDiv = document.getElementById("message");
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get("message");

  if (message === "password-sent" && messageDiv) {
    messageDiv.innerText = "Password has been sent to your email!";
    messageDiv.style.color = "green";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
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

document.querySelector("form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  try {
    const response = await fetch("/register", {
      method: "POST",
      body: new URLSearchParams(formData).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const result = await response.json();

    const messageDiv = document.getElementById("message");
    messageDiv.innerText = result.message;

    if (result.success) {
      messageDiv.style.color = "green";
      event.target.reset();
    } else {
      messageDiv.style.color = "red";
    }
  } catch (error) {
    console.error("Error occurred:", error);
    document.getElementById("message").innerText = "Something went wrong!";
  }
});

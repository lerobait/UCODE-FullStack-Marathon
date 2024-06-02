document.addEventListener("DOMContentLoaded", function () {
  const displayData = (data) => {
    const display = document.getElementById("data");
    const formattedData = `POST\n\n${JSON.stringify(data, null, 2)}`;
    display.innerHTML = `<pre>${formattedData}</pre>`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById("your-name").value;
    const email = document.getElementById("e-mail").value;
    const age = document.getElementById("age").value;
    const description = document.getElementById("about").value;
    const photo = document.getElementById("photo").files[0].name;

    const formData = {
      name,
      email,
      age,
      description,
      photo,
    };

    displayData(formData);
  };

  document.getElementById("send").addEventListener("click", handleSubmit);

  const clearAll = () => {
    document.getElementById("app").reset();
    document.getElementById("data").innerHTML = "";
  };

  document.getElementById("clear").addEventListener("click", clearAll);
});

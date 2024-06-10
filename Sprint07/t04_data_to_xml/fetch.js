fetch("/data")
  .then((response) => response.json())
  .then((data) => {
    const beforeColumn = document.getElementById("before");
    const afterColumn = document.getElementById("after");

    beforeColumn.innerHTML += `<pre>${JSON.stringify(
      data.before,
      null,
      2
    )}</pre>`;
    afterColumn.innerHTML += `<pre>${data.xml
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre>`;
  });

document.addEventListener("DOMContentLoaded", () => {
  fetch("/getData")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("#apiContent").innerHTML = renderData(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.querySelector(
        "#apiContent"
      ).innerHTML = `<div>Error fetching data</div>`;
    });
});

const renderData = (data) => {
  let str = "";
  for (let content in data) {
    if (typeof data[content] !== "object") {
      str += `<div><b>${content}</b>: ${data[content]}</div>`;
    } else {
      str += `<div><b>${content}</b>: ${renderData(data[content])}</div>`;
    }
  }
  return str;
};

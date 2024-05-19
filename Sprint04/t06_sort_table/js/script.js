document.addEventListener("DOMContentLoaded", () => {
  const superheroes = [
    ["Black<br>Panther", 65, 53],
    ["Capitan<br>America", 79, 137],
    ["Capitan<br>Marvel", 97, 26],
    ["Hulk", 80, 49],
    ["Iron<br>Man", 88, 48],
    ["Spider-<br>Man", 78, 16],
    ["Thanos", 99, 1000],
    ["Thor", 95, 1000],
    ["Yon-<br>Rogg", 73, 52],
  ];

  const placeholder = document.getElementById("placeholder");
  const notification = document.getElementById("notification");
  const headers = ["Name", "Strength", "Age"];

  const createTable = (data) => {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.appendChild(thead);
    table.appendChild(tbody);

    const tr = document.createElement("tr");
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      th.addEventListener("click", () =>
        sortTableByColumn(table, headers.indexOf(header))
      );
      tr.appendChild(th);
    });
    thead.appendChild(tr);

    data.forEach((rowData) => {
      const tr = document.createElement("tr");
      rowData.forEach((cellData) => {
        const td = document.createElement("td");
        td.innerHTML = cellData;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    placeholder.innerHTML = "";
    placeholder.appendChild(table);
  };

  const sortTableByColumn = (table, columnIndex) => {
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const isAscending = tbody.getAttribute("data-sort-asc") === "true";
    rows.sort((a, b) => {
      const aText = a.querySelectorAll("td")[columnIndex].textContent;
      const bText = b.querySelectorAll("td")[columnIndex].textContent;
      return isAscending
        ? aText.localeCompare(bText, undefined, { numeric: true })
        : bText.localeCompare(aText, undefined, { numeric: true });
    });

    tbody.setAttribute("data-sort-asc", !isAscending);
    rows.forEach((row) => tbody.appendChild(row));

    const order = isAscending ? "DESC" : "ASC";
    notification.textContent = `Sorting by ${headers[columnIndex]}, order: ${order}`;
  };

  createTable(superheroes);
});

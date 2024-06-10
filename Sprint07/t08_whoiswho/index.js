document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("user-form");
  const tableBox = document.getElementById("table-box");
  const filterBox = document.getElementById("filter-box");
  const filterInput = document.getElementById("filter-input");
  const filterButton = document.getElementById("filter-button");

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData(userForm);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        displayTable(data);
        filterBox.style.display = "block";
      })
      .catch((error) => console.error("Upload error:", error));
  };

  const createTableHeaders = (headers) => {
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    return thead;
  };

  const createTableBody = (data, headers) => {
    const tbody = document.createElement("tbody");

    data.forEach((row) => {
      const tr = document.createElement("tr");
      headers.forEach((header) => {
        const td = document.createElement("td");
        td.textContent = row[header];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    return tbody;
  };

  const displayTable = (data) => {
    if (!data || data.length === 0) {
      tableBox.innerHTML = "<p>No data available to display.</p>";
      return;
    }

    const table = document.createElement("table");
    table.className = "bordered-table";
    const headers = Object.keys(data[0]);
    table.appendChild(createTableHeaders(headers));
    table.appendChild(createTableBody(data, headers));

    tableBox.innerHTML = "";
    tableBox.appendChild(table);
  };

  const filterTable = (event) => {
    event.preventDefault();

    const filterText = filterInput.value.toLowerCase();
    const tableRows = document.querySelectorAll("tbody tr");

    tableRows.forEach((row) => {
      const rowText = Array.from(row.querySelectorAll("td"))
        .map((cell) => cell.textContent.toLowerCase())
        .join(" ");
      row.style.display = rowText.includes(filterText) ? "" : "none";
    });
  };

  userForm.addEventListener("submit", handleUpload);
  filterButton.addEventListener("click", filterTable);
});

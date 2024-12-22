let currentPage = 1;
const rowsPerPage = 50; 
let currentData = [];
let originalData = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/api/datos")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar los datos");
        return response.json();
      })
      .then((data) => {
        originalData = data;
        currentData = data; 
        displayPage(currentPage);
      })
      .catch((error) => {
        console.error(error);
      });
});

function displayPage(page) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = currentData.slice(start, end);

    paginatedData.forEach((client) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.first_name}</td>
            <td>${client.last_name}</td>
            <td>${client.email}</td>
            <td>${client.gender}</td>
            <td>${client.ip_address}</td>
            <td>${client.country}</td>
        `;
        tableBody.appendChild(row);
    });

    updatePaginationControls();
}

document.getElementById("previous-page").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
});

document.getElementById("next-page").addEventListener("click", () => {
    if (currentPage < Math.ceil(currentData.length / rowsPerPage)) {
        currentPage++;
        displayPage(currentPage);
    }
});

function updatePaginationControls() {
    document.getElementById("page-info").textContent = `Página ${currentPage} de ${Math.ceil(currentData.length / rowsPerPage)}`;
    document.getElementById("previous-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = currentPage === Math.ceil(currentData.length / rowsPerPage);
}

document.getElementById("filter-select").addEventListener("change", (event) => {
    filterData();
});

document.getElementById("introducir-nombre").addEventListener("input", (event) => {
    filterData();
});

document.getElementById("introducir-apellido").addEventListener("input", (event) => {
    filterData();
});

document.getElementById("introducir-email").addEventListener("input", (event) => {
    filterData();
});

document.getElementById("introducir-ip").addEventListener("input", (event) => {
    filterData();
});

document.getElementById("introducir-pais").addEventListener("input", (event) => {
    filterData();
});

function filterData() {
    const nameValue = document.getElementById("introducir-nombre").value.toLowerCase();
    const lastNameValue = document.getElementById("introducir-apellido").value.toLowerCase();
    const emailValue = document.getElementById("introducir-email").value.toLowerCase();
    const ipValue = document.getElementById("introducir-ip").value.toLowerCase();
    const countryValue = document.getElementById("introducir-pais").value.toLowerCase();
    const genderValue = document.getElementById("filter-select").value;

    currentData = originalData.filter((client) => {
        return (
            (nameValue === "" || client.first_name.toLowerCase().includes(nameValue)) &&
            (lastNameValue === "" || client.last_name.toLowerCase().includes(lastNameValue)) &&
            (emailValue === "" || client.email.toLowerCase().includes(emailValue)) &&
            (ipValue === "" || client.ip_address.toLowerCase().includes(ipValue)) &&
            (countryValue === "" || client.country.toLowerCase().includes(countryValue)) &&
            (genderValue === "todos" || client.gender === genderValue)
        );
    });

    currentPage = 1;
    displayPage(currentPage);
}

function sortTable(column) {
    const tableBody = document.getElementById("table-body");
    const rows = Array.from(tableBody.rows);
    rows.sort((a, b) => {
      const aText = a.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
      const bText = b.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
      return aText.localeCompare(bText);
    });
    tableBody.innerHTML = "";
    rows.forEach((row) => tableBody.appendChild(row));
}

function getColumnIndex(column) {
    const columns = ["id", "first_name", "last_name", "email", "gender", "ip_address", "country"];
    return columns.indexOf(column) + 1;
}
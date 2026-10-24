const STORAGE_KEY = "universityTechClubRegistrations";
const form = document.querySelector("#register-form");
const tbody = document.querySelector("#registrations-body");
const message = document.querySelector("#message");
const clearButton = document.querySelector("#clear-registrations");

function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

function addCell(row, text) {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
}

function render() {
  const orders = loadOrders();
  tbody.innerHTML = "";
  if (orders.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.textContent = "No registrations saved yet.";
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }
  orders.forEach(function (order) {
    const row = document.createElement("tr");
    addCell(row, order.name);
    addCell(row, order.email);
    addCell(row, order.event);
    addCell(row, String(order.guests));
    addCell(row, order.source);
    tbody.appendChild(row);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = new FormData(form);
  const order = {
    name: data.get("name").trim(),
    email: data.get("email"),
    phone: data.get("phone"),
    event: data.get("event"),
    guests: Number(data.get("guests")),
    source: data.get("source")
  };
  const orders = loadOrders();
  orders.push(order);
  saveOrders(orders);
  form.reset();
  message.textContent = "Thank you, " + order.name + "! Your registration has been saved.";
  render();
});

clearButton.addEventListener("click", function () {
  localStorage.removeItem(STORAGE_KEY);
  message.textContent = "All saved registrations were cleared.";
  render();
});

render();
// List form
const inputField = document.getElementById("inputField");
const addButton = document.getElementById("addButton");
const list = document.getElementById("list");
// Countdown timer
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
// Fetch and Display
const userList = document.getElementById("userList");
const searchInput = document.getElementById("searchInput");

// List form start
const addListItem = () => {
  const inputValue = inputField.value.trim();
  if (inputValue !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = inputValue;
    list.appendChild(listItem);
    inputField.value = "";
  }
};
// Click functionality
addButton.addEventListener("click", addListItem);

// keypress  functionality
addEventListener("keypress", (enterKey) => {
  if (enterKey.key === "Enter") {
    addListItem();
  }
});

// List form  end

let counter = 0;
let interval;

const startTime = () => {
  interval = setInterval(() => {
    timer.textContent = counter;
    counter++;
    if (counter > 10) {
      counter = 0;
    }
  }, 1000);
};

startBtn.addEventListener("click", startTime);
// Countdown timer end

const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    console.log(users);

    displayUsers(users);

    // search functionality
    searchInput.addEventListener("input", () => filterUsers(users));
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const deleteUser = (userId) => {
  const userItem = [...userList.children].find((item) =>
    item.querySelector("button").onclick.toString().includes(userId)
  );
  if (userItem) {
    userList.removeChild(userItem);
  }
};

// Display Users
const displayUsers = (users) => {
  userList.innerHTML = "";
  users.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.className = "user-item";
    userItem.innerHTML = `
      <div>
        <strong>${user.name}</strong><br>
        <small>Email: ${user.email}</small><br>
        <small>City: ${user.address.city}</small><br>
        <small>Company: ${user.company.name}</small>
      </div>
      <button onclick="deleteUser(${user.id})">delete</button>
    `;
    userList.appendChild(userItem);
  });
};

fetchUsers();
// Fetch and Display end

document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const positionInput = document.getElementById("positionInput");
    const salaryInput = document.getElementById("salaryInput");
    const employeeList = document.getElementById("list");

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    function displayEmployees() {
        employeeList.innerHTML = "";
        employees.forEach((employee) => {
            const li = document.createElement("li");
            li.innerHTML = `
            Employee Name: ${employee.name} <br>
            Position: ${employee.position} <br>
            Salary: ₹${employee.salary}`;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                deleteEmployee(employee.id);
            });

            li.appendChild(deleteBtn);
            employeeList.appendChild(li);
        });
    }

    function addEmployee(name, position, salary) {
        const employee = {
            id: Date.now(),
            name,
            position,
            salary,
        };
        employees.push(employee);
        saveToLocalStorage();
        displayEmployees();
    }

    function deleteEmployee(id) {
        employees = employees.filter((emp) => emp.id !== id);
        saveToLocalStorage();
        displayEmployees();
    }

    document.getElementById("employee-form").addEventListener("submit", (e) => {
        e.preventDefault(); // ✅ prevent page reload

        const name = nameInput.value.trim();
        const position = positionInput.value.trim();
        const salary = salaryInput.value.trim();

        if (name && position && salary) {
            addEmployee(name, position, salary);
            nameInput.value = "";
            positionInput.value = "";
            salaryInput.value = "";
        } else {
            alert("Please fill all fields.");
        }
    });

    // Initialize the list on page load
    displayEmployees();
});

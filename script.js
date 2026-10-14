
const students = [
    { name: "Kwame", present: true },
    { name: "Ama", present: false },
    { name: "Kofi", present: true },
    { name: "Akosua", present: true },
    { name: "Yaw", present: false }
];

const attendanceList = document.getElementById("attendance-list");
const searchInput = document.getElementById("search");

function updateSummary() {
    const presentCount = students.filter(
        student => student.present
    ).length;

    const absentCount = students.length - presentCount;

    document.getElementById("total").textContent =
        students.length;

    document.getElementById("present").textContent =
        presentCount;

    document.getElementById("absent").textContent =
        absentCount;
}

function displayStudents(searchTerm = "") {
    attendanceList.innerHTML = "";

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(
            searchTerm.toLowerCase()
        )
    );

    if (filteredStudents.length === 0) {
        attendanceList.innerHTML = `
            <tr>
                <td colspan="3">No students found.</td>
            </tr>
        `;
        return;
    }

    filteredStudents.forEach(student => {
        const row = document.createElement("tr");

        const studentCell = document.createElement("td");
        studentCell.innerHTML = `
            <div class="student-name"></div>
            <div class="student-id"></div>
        `;

        studentCell.querySelector(".student-name").textContent =
            student.name;

        studentCell.querySelector(".student-id").textContent =
            "Student record";

        const statusCell = document.createElement("td");
        const badge = document.createElement("span");

        badge.className = student.present
            ? "badge present"
            : "badge absent";

        badge.textContent = student.present
            ? "Present"
            : "Absent";

        statusCell.appendChild(badge);

        const actionCell = document.createElement("td");

        const presentButton = document.createElement("button");
        presentButton.className = "action-btn mark-present";
        presentButton.textContent = "Present";

        presentButton.onclick = () => {
            student.present = true;
            displayStudents(searchInput.value);
            updateSummary();
        };

        const absentButton = document.createElement("button");
        absentButton.className = "action-btn mark-absent";
        absentButton.textContent = "Absent";

        absentButton.onclick = () => {
            student.present = false;
            displayStudents(searchInput.value);
            updateSummary();
        };

        actionCell.append(presentButton, absentButton);

        row.append(studentCell, statusCell, actionCell);
        attendanceList.appendChild(row);
    });
}

searchInput.addEventListener("input", () => {
    displayStudents(searchInput.value);
});

displayStudents();
updateSummary();

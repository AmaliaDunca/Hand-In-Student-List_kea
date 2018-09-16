const firstButton = document.querySelector("#o-first");
const lastButton = document.querySelector("#o-last");
const infoContainer = document.querySelector(".info");
const tableBody = document.querySelector(".table-body");

let students = [];

document.addEventListener("DOMContentLoaded", init);

//Fetch studentlist.json
function init() {
  fetch("studentlist.json")
    .then(result => result.json())
    .then(json => createList(json));
}

//Use fetched data to add each student as an object to the array
function createList(data) {
  data.forEach(student => {
    const studentNames = student.split(" "); // [string] - array with names
    // const [firstName, ...lastNames] = studentNames;
    const firstName = studentNames[0];
    const lastNames = studentNames.slice(1);
    const lastNameString = lastNames.join(" ");

    const newStudent = new Student(firstName, lastNameString);

    students.push(newStudent);
  });
  displayStudents(students);
  console.log(students);
}

function Student(first, last) {
  this.firstName = first;
  this.lastName = last;
}

Student.prototype.toString = function() {
  return this.firstName + " " + this.lastName;
};

function displayStudents(toDisplay) {
  tableBody.innerHTML = "";
  toDisplay.forEach((elem, index) => {
    tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${elem.toString()}</td>
                <td>
                    <button class='info-btn' type='button' data-target='${index}'>more info</button>
                </td>
                <td>
                    <button class='delete-btn' type='button' data-target='${index}'>remove</button>
                </td>
            </tr>
        `;
  });

  addDeleteHandlers();
  addInfoHandlers();
}

//Eventlistener First Name/Last Name sorting button

firstButton.addEventListener("click", function() {
  orderByName("firstName");
});

lastButton.addEventListener("click", function() {
  orderByName("lastName");
});

function orderByName(nameChoice) {
  const sortedStudent = students.sort(sortName(nameChoice));
  displayStudents(sortedStudent);
  console.log(students);
}

function sortName(nameChoice) {
  return function(a, b) {
    return a[nameChoice] > b[nameChoice] ? 1 : -1;
  };
}

function addDeleteHandlers() {
  const buttonElements = document.querySelectorAll("button.delete-btn");

  buttonElements.forEach(btnElement => {
    btnElement.addEventListener("click", function() {
      const index = btnElement.getAttribute("data-target");

      // remove the student
      students.splice(index, 1);
      displayStudents(students);
    });
  });
}

function addInfoHandlers() {
  const buttonElements = document.querySelectorAll("button.info-btn");

  buttonElements.forEach(btnElement => {
    btnElement.addEventListener("click", function() {
      const index = btnElement.getAttribute("data-target");
      const studentName = students[index].toString();

      // display student info
      infoContainer.innerHTML = `
                <p>INFO ABOUT STUDENT</p>
                <p>Name: ${studentName}</p>
                <p>Study Programme: Multimedia Design & Communication</p>
            `;
    });
  });
}



const subjectsContainer =
document.getElementById("subjectsContainer");

const addSubjectBtn =
document.getElementById("addSubjectBtn");

const calculateBtn =
document.getElementById("calculateBtn");

const resetBtn =
document.getElementById("resetBtn");

const printBtn =
document.getElementById("printBtn");

const downloadBtn =
document.getElementById("downloadBtn");


let subjectCount = 0;


function createSubjectRow(){

    const row =
    document.createElement("div");

    row.className = "subject-row";

    row.innerHTML = `

        <input
            type="text"
            class="subject-name"
            placeholder="Subject Name">

        <input
            type="number"
            class="credit-hours"
            placeholder="CH"
            min="1"
            max="6">

        <input
            type="number"
            class="marks"
            placeholder="Marks"
            min="0"
            max="100">

        <input
            type="text"
            class="grade-output"
            readonly>

        <input
            type="text"
            class="gp-output"
            readonly>

        <button
            class="delete-btn">

            <i class="fa-solid fa-trash"></i>

        </button>

    `;

    return row;

}

function addSubject(){

    const row =
    createSubjectRow();

    subjectsContainer.appendChild(row);

    subjectCount++;

    updateSubjectCount();

}


function createFirstRow(){

    if(subjectCount===0){

        addSubject();

    }

}

function updateSubjectCount(){

    const totalSubjects =
    document.getElementById("totalSubjects");

    totalSubjects.innerText =
    subjectCount;

}

addSubjectBtn.addEventListener(

    "click",

    function(){

        addSubject();

    }

);


subjectsContainer.addEventListener(

    "click",

    function(e){

        if(

            e.target.classList.contains("delete-btn") ||

            e.target.closest(".delete-btn")

        ){

            const row =
            e.target.closest(".subject-row");

            row.remove();

            subjectCount--;

            if(subjectCount<=0){

                subjectCount=0;

                createFirstRow();

            }

            updateSubjectCount();

        }

    }

);


function getSubjects(){

    const rows =
    document.querySelectorAll(".subject-row");

    const subjects = [];

    rows.forEach(row=>{

        subjects.push({

            subject:
            row.querySelector(".subject-name").value.trim(),

            credit:
            Number(
                row.querySelector(".credit-hours").value
            ),

            marks:
            Number(
                row.querySelector(".marks").value
            )

        });

    });

    return subjects;

}


function updateGrade(row){

    const marksInput =
    row.querySelector(".marks");

    const gradeOutput =
    row.querySelector(".grade-output");

    const gpOutput =
    row.querySelector(".gp-output");


    const marks =
    Number(marksInput.value);


    if(

        marksInput.value==="" ||

        marks<0 ||

        marks>100

    ){

        gradeOutput.value="";

        gpOutput.value="";

        return;

    }


    gradeOutput.value =
    Calculator.getGrade(marks);

    gpOutput.value =
    Calculator
    .getGradePoint(marks)
    .toFixed(2);

}


subjectsContainer.addEventListener(

    "input",

    function(e){

        if(

            e.target.classList.contains("marks")

        ){

            const row =
            e.target.closest(".subject-row");

            updateGrade(row);

        }

    }

);


subjectsContainer.addEventListener(

    "input",

    function(e){

        if(

            e.target.classList.contains("credit-hours")

        ){

            let credit =
            Number(e.target.value);

            if(credit<1){

                e.target.value=1;

            }

            if(credit>6){

                e.target.value=6;

            }

        }

    }

);


subjectsContainer.addEventListener(

    "input",

    function(e){

        if(

            e.target.classList.contains("marks")

        ){

            let marks =
            Number(e.target.value);

            if(marks<0){

                e.target.value=0;

            }

            if(marks>100){

                e.target.value=100;

            }

        }

    }

);

subjectsContainer.addEventListener(

    "input",

    function(){

        updateSubjectCount();

    }

);


function updateResultUI(result){

    document.getElementById("semesterGPA").innerText =
    result.semesterGPA.toFixed(2);

    document.getElementById("finalCGPA").innerText =
    result.finalCGPA.toFixed(2);

    document.getElementById("totalCredits").innerText =
    result.totalCredits;

    document.getElementById("totalSubjects").innerText =
    result.totalSubjects;

    applyResultColors(result);

}

function applyResultColors(result){

    const semester =
    document.getElementById("semesterGPA");

    const cgpa =
    document.getElementById("finalCGPA");


    semester.className = "";

    cgpa.className = "";


    semester.classList.add(

        Calculator.getGPAColor(

            result.semesterGPA

        )

    );


    cgpa.classList.add(

        Calculator.getGPAColor(

            result.finalCGPA

        )

    );

}

function animateCards(){

    const cards =

    document.querySelectorAll(

        ".result-card"

    );


    cards.forEach(card=>{

        card.style.transform="scale(.95)";

        setTimeout(()=>{

            card.style.transform="scale(1)";

        },200);

    });

}

calculateBtn.addEventListener(

    "click",

    function(){

        const validation =

        Validation.validateForm();


        if(!validation.valid){

            showToast(

                validation.message,

                "error"

            );

            return;

        }


        showLoading();


        setTimeout(()=>{

            const result =

            Calculator.calculateResults();


            updateResultUI(result);

            animateCards();

            hideLoading();


            showToast(

                "CGPA Calculated Successfully",

                "success"

            );

        },400);

    }

);

function resetCalculator(){

    document.getElementById(

        "previousCGPA"

    ).value="";


    document.getElementById(

        "previousCredits"

    ).value="";


    subjectsContainer.innerHTML="";

    subjectCount=0;

    createFirstRow();


    document.getElementById(

        "semesterGPA"

    ).innerText="0.00";


    document.getElementById(

        "finalCGPA"

    ).innerText="0.00";


    document.getElementById(

        "totalCredits"

    ).innerText="0";


    document.getElementById(

        "totalSubjects"

    ).innerText="1";


}

resetBtn.addEventListener(

    "click",

    function(){

        resetCalculator();

        showToast(

            "Calculator Reset",

            "info"

        );

    }

);
function showToast(message, type = "success") {

    const container =
        document.getElementById("toastContainer");

    if (!container) return;

    const toast =
        document.createElement("div");

    toast.className = `toast ${type}`;

    let icon = "fa-circle-check";

    if (type === "error") {

        icon = "fa-circle-xmark";

    }
    else if (type === "info") {

        icon = "fa-circle-info";

    }

    toast.innerHTML = `
        <i class="fa-solid ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "0";

        toast.style.transform =
            "translateX(50px)";

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}
function showLoading() {

    const overlay =
        document.getElementById("loadingOverlay");

    if (overlay) {

        overlay.classList.add("active");

    }

}

function hideLoading() {

    const overlay =
        document.getElementById("loadingOverlay");

    if (overlay) {

        overlay.classList.remove("active");

    }

}


function printResult() {

    showToast(

        "Preparing Print...",

        "info"

    );

    setTimeout(() => {

        window.print();

    }, 500);

}


printBtn.addEventListener(

    "click",

    function () {

        printResult();

    }

);


function exportPDF() {

    showToast(

        "PDF Export Started",

        "info"

    );

    setTimeout(() => {

        window.print();

    }, 700);

}

downloadBtn.addEventListener(

    "click",

    function () {

        exportPDF();

    }

);


function scrollToResult() {

    document.querySelector(

        ".result-grid"

    ).scrollIntoView({

        behavior: "smooth"

    });

}

document.addEventListener(

    "keydown",

    function (e) {

        if (e.key === "Enter") {

            const active =

                document.activeElement;

            if (

                active.classList.contains("marks")

            ) {

                calculateBtn.click();

            }

        }

    }

);

function initializeUI() {

    createFirstRow();

    updateSubjectCount();

}

function getCalculatorState() {

    return {

        previousCGPA:
        document.getElementById("previousCGPA").value,

        previousCredits:
        document.getElementById("previousCredits").value,

        subjects:
        getSubjects()

    };

}

function loadCalculatorState(data) {

    if (!data) return;

    document.getElementById("previousCGPA").value =
        data.previousCGPA || "";

    document.getElementById("previousCredits").value =
        data.previousCredits || "";

    subjectsContainer.innerHTML = "";

    subjectCount = 0;

    if (data.subjects && data.subjects.length > 0) {

        data.subjects.forEach(subject => {

            addSubject();

            const row =
                subjectsContainer.lastElementChild;

            row.querySelector(".subject-name").value =
                subject.subject;

            row.querySelector(".credit-hours").value =
                subject.credit;

            row.querySelector(".marks").value =
                subject.marks;

            updateGrade(row);

        });

    }

    else {

        createFirstRow();

    }

}

function disableButtons() {

    document.querySelectorAll("button")

        .forEach(button => {

            button.disabled = true;

        });

}


function enableButtons() {

    document.querySelectorAll("button")

        .forEach(button => {

            button.disabled = false;

        });

}


document.addEventListener(

    "input",

    function () {

        if (

            typeof StorageManager !==

            "undefined"

        ) {

            StorageManager.saveData();

        }

    }

);


window.addEventListener(

    "load",

    function () {

        initializeUI();

        if (

            typeof StorageManager !==

            "undefined"

        ) {

            StorageManager.loadData();

        }

    }

);


window.addEventListener(

    "beforeunload",

    function () {

        if (

            typeof StorageManager !==

            "undefined"

        ) {

            StorageManager.saveData();

        }

    }

);

window.UI = {

    addSubject,

    createFirstRow,

    getSubjects,

    updateGrade,

    updateResultUI,

    resetCalculator,

    initializeUI,

    getCalculatorState,

    loadCalculatorState,

    showToast,

    showLoading,

    hideLoading,

    printResult,

    exportPDF,

    disableButtons,

    enableButtons

};
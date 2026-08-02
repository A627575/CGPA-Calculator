


const STORAGE_KEY = "uaf_cgpa_calculator_data";




function saveData() {

    const data = {

        previousCGPA:
        document.getElementById("previousCGPA").value,

        previousCredits:
        document.getElementById("previousCredits").value,

        subjects:
        UI.getSubjects()

    };

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(data)

    );

}


function loadData() {

    const savedData =

        localStorage.getItem(

            STORAGE_KEY

        );

    if (!savedData) return;

    const data =

        JSON.parse(savedData);

    UI.loadCalculatorState(data);

}


function clearData() {

    localStorage.removeItem(

        STORAGE_KEY

    );

}



function hasData() {

    return localStorage.getItem(

        STORAGE_KEY

    ) !== null;

}




document.addEventListener(

    "input",

    function () {

        saveData();

    }

);




resetBtn.addEventListener(

    "click",

    function () {

        clearData();

    }

);


window.StorageManager = {

    saveData,

    loadData,

    clearData,

    hasData

};
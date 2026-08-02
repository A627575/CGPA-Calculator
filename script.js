


document.addEventListener("DOMContentLoaded", () => {

    console.log("UAF CGPA Calculator Started");

   

    UI.initializeUI();


    

    if (StorageManager.hasData()) {

        StorageManager.loadData();

    }


   

    calculateBtn.addEventListener("click", () => {

        const validation = Validation.validateForm();

        if (!validation.valid) {

            UI.showToast(

                validation.message,

                "error"

            );

            return;

        }

        UI.showLoading();

        setTimeout(() => {

            const result =

                Calculator.calculateResults();

            UI.updateResultUI(result);

            UI.hideLoading();

            UI.showToast(

                "CGPA Calculated Successfully",

                "success"

            );

            StorageManager.saveData();

        }, 400);

    });


    

    resetBtn.addEventListener("click", () => {

        UI.resetCalculator();

        StorageManager.clearData();

        UI.showToast(

            "Calculator Reset",

            "info"

        );

    });


    

    printBtn.addEventListener("click", () => {

        UI.printResult();

    });


    
    downloadBtn.addEventListener("click", () => {

        UI.exportPDF();

    });

});




window.addEventListener(

    "beforeunload",

    () => {

        StorageManager.saveData();

    }

);




document.addEventListener(

    "keydown",

    (e) => {

        if (

            e.ctrlKey &&

            e.key.toLowerCase() === "s"

        ) {

            e.preventDefault();

            StorageManager.saveData();

            UI.showToast(

                "Data Saved",

                "success"

            );

        }

    }

);



window.onerror = function (

    message,

    source,

    line,

    column,

    error

) {

    console.error(

        message,

        source,

        line,

        column,

        error

    );

    UI.showToast(

        "Unexpected Error!",

        "error"

    );

};




window.addEventListener(

    "offline",

    () => {

        UI.showToast(

            "You are Offline",

            "info"

        );

    }

);

window.addEventListener(

    "online",

    () => {

        UI.showToast(

            "Internet Connected",

            "success"

        );

    }

);
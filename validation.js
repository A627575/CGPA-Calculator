

function validatePreviousCGPA() {

    const cgpa = Number(

        document.getElementById(

            "previousCGPA"

        ).value

    );

    if (isNaN(cgpa)) {

        return {

            valid: false,

            message: "Please enter Previous CGPA."

        };

    }

    if (cgpa < 0 || cgpa > 4) {

        return {

            valid: false,

            message: "CGPA must be between 0.00 and 4.00"

        };

    }

    return {

        valid: true

    };

}


function validatePreviousCredits() {

    const credits = Number(

        document.getElementById(

            "previousCredits"

        ).value

    );

    if (isNaN(credits)) {

        return {

            valid: false,

            message: "Please enter Previous Credit Hours."

        };

    }

    if (credits < 0) {

        return {

            valid: false,

            message: "Credit Hours cannot be negative."

        };

    }

    return {

        valid: true

    };

}



function validateSubjects() {

    const subjects = UI.getSubjects();

    if (subjects.length === 0) {

        return {

            valid: false,

            message: "Please add at least one subject."

        };

    }

    for (let i = 0; i < subjects.length; i++) {

        const subject = subjects[i];

        if (subject.subject.trim() === "") {

            return {

                valid: false,

                message: `Enter Subject Name for row ${i + 1}.`

            };

        }

        if (

            subject.credit === "" ||

            subject.credit <= 0 ||

            subject.credit > 6

        ) {

            return {

                valid: false,

                message: `Invalid Credit Hours in row ${i + 1}.`

            };

        }

        if (

            subject.marks === "" ||

            subject.marks < 0 ||

            subject.marks > 100

        ) {

            return {

                valid: false,

                message: `Invalid Marks in row ${i + 1}.`

            };

        }

    }

    return {

        valid: true

    };

}


function validateForm() {

    const cgpa =

        validatePreviousCGPA();

    if (!cgpa.valid) {

        return cgpa;

    }

    const credits =

        validatePreviousCredits();

    if (!credits.valid) {

        return credits;

    }

    const subjects =

        validateSubjects();

    if (!subjects.valid) {

        return subjects;

    }

    return {

        valid: true

    };

}


function showValidationError(message) {

    if (

        typeof UI !== "undefined"

    ) {

        UI.showToast(

            message,

            "error"

        );

    }

    else {

        alert(message);

    }

}


window.Validation = {

    validatePreviousCGPA,

    validatePreviousCredits,

    validateSubjects,

    validateForm,

    showValidationError

};
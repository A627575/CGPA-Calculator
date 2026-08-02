

const gradeScale = [

    {min:85,max:100,grade:"A",gp:4.00},

    {min:80,max:84,grade:"A-",gp:3.67},

    {min:75,max:79,grade:"B+",gp:3.33},

    {min:71,max:74,grade:"B",gp:3.00},

    {min:68,max:70,grade:"B-",gp:2.67},

    {min:64,max:67,grade:"C+",gp:2.33},

    {min:61,max:63,grade:"C",gp:2.00},

    {min:58,max:60,grade:"C-",gp:1.67},

    {min:54,max:57,grade:"D+",gp:1.33},

    {min:50,max:53,grade:"D",gp:1.00},

    {min:0,max:49,grade:"F",gp:0.00}

];




function getGrade(marks){

    marks = Number(marks);

    for(let item of gradeScale){

        if(marks>=item.min && marks<=item.max){

            return item.grade;

        }

    }

    return "F";

}




function getGradePoint(marks){

    marks = Number(marks);

    for(let item of gradeScale){

        if(marks>=item.min && marks<=item.max){

            return item.gp;

        }

    }

    return 0;

}



function getQualityPoints(

    credit,

    gp

){

    return Number(credit) *

           Number(gp);

}




function calculateCredits(subjects){

    let total = 0;

    subjects.forEach(subject=>{

        total += Number(subject.credit);

    });

    return total;

}

function calculateSemesterGPA(subjects){

    let totalQualityPoints = 0;

    let totalCredits = 0;

    subjects.forEach(subject=>{

        const credit = Number(subject.credit);

        const gp = getGradePoint(subject.marks);

        totalQualityPoints += getQualityPoints(credit, gp);

        totalCredits += credit;

    });

    if(totalCredits === 0){

        return 0;

    }

    return totalQualityPoints / totalCredits;

}



function calculateFinalCGPA(

    previousCGPA,

    previousCredits,

    semesterGPA,

    semesterCredits

){

    previousCGPA = Number(previousCGPA) || 0;

    previousCredits = Number(previousCredits) || 0;

    semesterCredits = Number(semesterCredits) || 0;

    const previousQualityPoints =

        previousCGPA * previousCredits;


    const currentQualityPoints =

        semesterGPA * semesterCredits;


    const totalCredits =

        previousCredits + semesterCredits;


    if(totalCredits === 0){

        return 0;

    }


    return (

        previousQualityPoints +

        currentQualityPoints

    ) / totalCredits;

}




function getPerformance(gpa){

    if(gpa >= 3.70){

        return "Excellent";

    }

    else if(gpa >= 3.00){

        return "Very Good";

    }

    else if(gpa >= 2.50){

        return "Good";

    }

    else if(gpa >= 2.00){

        return "Average";

    }

    else{

        return "Poor";

    }

}




function getGPAColor(gpa){

    if(gpa >= 3.70){

        return "gpa-good";

    }

    else if(gpa >= 2.50){

        return "gpa-average";

    }

    else if(gpa >= 2.00){

        return "gpa-low";

    }

    else{

        return "gpa-fail";

    }

}




function calculateResults(){

    const previousCGPA =

        Number(

            document.getElementById(

                "previousCGPA"

            ).value

        ) || 0;


    const previousCredits =

        Number(

            document.getElementById(

                "previousCredits"

            ).value

        ) || 0;


    const subjects =

        UI.getSubjects();


    const semesterCredits =

        calculateCredits(subjects);


    const semesterGPA =

        calculateSemesterGPA(subjects);


    const finalCGPA =

        calculateFinalCGPA(

            previousCGPA,

            previousCredits,

            semesterGPA,

            semesterCredits

        );


    return{

        semesterGPA,

        finalCGPA,

        currentCredits:semesterCredits,

        totalCredits:

            previousCredits +

            semesterCredits,

        totalSubjects:

            subjects.length,

        performance:

            getPerformance(

                semesterGPA

            )

    };

}




window.Calculator = {

    gradeScale,

    getGrade,

    getGradePoint,

    getQualityPoints,

    calculateCredits,

    calculateSemesterGPA,

    calculateFinalCGPA,

    calculateResults,

    getPerformance,

    getGPAColor

};
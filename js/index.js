/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @author Nicolás Penagos Montoya
 * nicolas.penagosm98@gmail.com
 **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();

// -------------------------------------
// DECLARATIONS
// -------------------------------------
const questionInput = document.getElementById('currentQuestionInput');
const okButton = document.getElementById('okButton');
const currentQuestionDiv = document.getElementById('currentQuestionDiv');

// -------------------------------------
// EVENTS
// -------------------------------------
okButton.addEventListener('click', ()=>{

    let questionS = questionInput.value;
    if(questionS != null && questionS != ''){

        let reference = database.ref('currentQuestion');
        let question = {
            question: questionS
        }

        reference.set(question);

    }else{
        alert('The new question cannot be empty');
    }

    questionInput.value = '';
    
});


// -------------------------------------
// DATA READING
// -------------------------------------
database.ref('currentQuestion').on('value', function(data){

    data.forEach(
        currentQuestion => {
            
            let val = currentQuestion.val();
            currentQuestionDiv.innerHTML = val;
         
        }
    );

});



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
const currentQuestionDiv = document.getElementById('currentQuestion');
const averageDiv = document.getElementById('average');
const historyDiv = document.getElementById('history');
const deleteButton = document.getElementById('delete');

// -------------------------------------
// GLOBAL VARIABLES
// -------------------------------------
var currentQuestionString;
var currentQuestionAverage;
var flag = false;
var enableButton = true;

// -------------------------------------
// EVENTS
// -------------------------------------
okButton.addEventListener('click', () => {


    let questionS = questionInput.value;
    if (questionS != null && questionS != '') {

        if (this.flag) {

            let historyReference = database.ref('history/').push();
            let historyQuestion = {
                id: historyReference.key,
                q: currentQuestionString,
                s: currentQuestionAverage
            }

            historyReference.set(historyQuestion);

        }

        let reference = database.ref('currentQuestion/question');
        let scoresReference = database.ref('currentQuestion/scores');
        let question = {
            question: questionS
        }

        reference.set(question);
        scoresReference.set(null);

    } else {
        alert('The new question cannot be empty');
    }

    questionInput.value = '';

});

deleteButton.addEventListener('click', () => {

    if (enableButton) {

        let historyReference = database.ref('history/').push();
        let historyQuestion = {
            id: historyReference.key,
            q: currentQuestionString,
            s: currentQuestionAverage
        }
        historyReference.set(historyQuestion);
        this.flag = false;

        let reference = database.ref('currentQuestion/question');
        let scoresReference = database.ref('currentQuestion/scores');
        let question = {
            question: 'NO_QUESTION'
        }

        enableButton = false;
        reference.set(question);
        scoresReference.set(null);

    }

});

// -------------------------------------
// DATA READING
// -------------------------------------
database.ref('currentQuestion/question').on('value', function (data) {

    data.forEach(
        currentQuestion => {

            let val = currentQuestion.val();
            if (val === 'NO_QUESTION') {
                currentQuestionDiv.innerHTML = '';
            } else {

                currentQuestionDiv.innerHTML = val;
                currentQuestionString = val;
                this.flag = true;
                enableButton = true;

            }

            currentQuestionAverage = 0;

        }
    );

});

database.ref('currentQuestion/scores').on('value', function (data) {

    let summatory = 0;
    let counter = 0;

    data.forEach(
        score => {

            let val = score.val().score;
            summatory += val;
            counter += 1;

        }
    );

    if (counter != 0) {

        let average = summatory / counter;
        averageDiv.innerHTML = '' + average;
        currentQuestionAverage = average.toFixed(1);

    } else {
        averageDiv.innerHTML = '   ';
    }

});

database.ref('history').on('value', function (data) {

    historyDiv.innerHTML = '';
    data.forEach(
        currentQuestion => {

            let val = currentQuestion.val();
            let questionComponent = new QuestionsQueue(val);
            historyDiv.appendChild(questionComponent.render());
            console.log(val.q);

        }
    );

});
/**~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * @author Nicolás Penagos Montoya
 * nicolas.penagosm98@gmail.com
 **~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 */

class QuestionsQueue {

    // -------------------------------------
    // CONSTRUCTOR
    // -------------------------------------
    constructor(question) {
        this.question = question;
    }

    // -------------------------------------
    // Render
    // -------------------------------------
    render = () => {

        let component = document.createElement('div');
        component.className = 'question';

        let questionDiv = document.createElement('div');
        questionDiv.className = 'questionDiv';
        questionDiv.innerHTML = this.question.q;

        let scoreDiv = document.createElement('div');
        scoreDiv.className = 'scoreDiv';
        scoreDiv.innerHTML = this.question.s;

        let deleteButton = document.createElement('button');
        deleteButton.className = 'deleteButton';
        deleteButton.innerHTML = 'X';

        deleteButton.addEventListener('click', () => {
            let reference = database.ref('history/' + this.question.id).set(null);
        });

        component.appendChild(questionDiv);
        component.appendChild(scoreDiv);
        component.appendChild(deleteButton);

        return component;

    }

}
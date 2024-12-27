const questions = [
{
    question: "Which HTML tag is used to define an internal style sheet?",
    answers:[
        {text:"style",correct: true},
        {text:"script",correct: false},
        {text:"css",correct: false},
        {text:"link",correct: false},
    ]
    },
    {
        question:"Which of the following is the correct HTML element for inserting a line break?",
    answers:[
        {text:"break",correct: false},
        {text:"lb",correct: false},
        {text:"br",correct: true},
        {text:"hr",correct: false},
    ]
    },
    {   
        question:"Which HTML tag is used to create a hyperlink?",
        answers:[
            {text:"a",correct: true},
            {text:"link",correct: false},
            {text:"href",correct: false},
            {text:"button",correct: false},
        ]
        },
        {question:"Which HTML tag is used to display an image?",
            answers:[
                {text:"img",correct: true},
                {text:"image",correct: false},
                {text:"src",correct: false},
                {text:"picture",correct: false},
            ]
        }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score =0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ${score} out of ${questions.length}!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
       handleNextButton(); 
    }else{
        startQuiz();
    }
});

startQuiz();











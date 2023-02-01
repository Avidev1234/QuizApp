// console.log("this");
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector('.info_box');
const exit_btn = info_box.querySelector('.buttons .quit');
const continue_btn = info_box.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');

const option_list = document.querySelector(".option_list");
// const result_box=document.querySelector('.result_box');

const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_left_txt");

//To start the quiz
start_btn.onclick = function () {
    info_box.classList.add("activeInfo");//show info box
}
//To Exit from Quiz
exit_btn.onclick = function () {
    info_box.classList.remove("activeInfo");
}
//To continue  Quiz
continue_btn.onclick = function () {
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.add("activeQuiz");//show the Quiz box
    showQuestion(0);
    queCounter(1);
    startTimer(30);
    startTimerLine(0);
}


let que_count = 0;

let que_numb = 1;

let counter;
let counterLine;

let timeValue = 30;
let widthValue = 0;
let userScore = 0;


const next_btn = quiz_box.querySelector('.next_btn');
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .Quit");

// restart_quiz.onclick = () => {
//     result_box.classList.add("activeResult");
//     result_box.classList.remove("activeResult");
//     let que_count = 0;
//     let que_numb = 1;
//     let timeValue = 15;
//     let widthValue = 0;
//     let userScore = 0;
//     showQuestion(que_count);
//     queCounter(que_numb);
//     clearInterval(counterLine);
//     clearInterval(counter);
//     startTimer(timeValue);
//     startTimerLine(widthValue);
//     next_btn.style.display = "none";
//     timeOff.textContent="Time left"


// }
// quit_quiz.onclick = () => {
//     window.location.reload();
// }


//if Next button click

next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestion(que_count);
        queCounter(que_numb);
        clearInterval(counterLine);
        clearInterval(counter);
        startTimer(timeValue);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent="Time left"

    } else {
        clearInterval(counterLine);
        clearInterval(counter);
        
        console.log("Question completed");
        showResultBox();
    }



}



//getting questions and options from an array.
function showQuestion(index) {
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>' + questions[index].numb + "." + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
        + '<div class="option">' + questions[index].options[3] + '<span></span></div>'


    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");

    }
}

let tickIcon = ' <div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'



function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    console.log(userScore);
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct")
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);

    } else {
        answer.classList.add("incorrect")

        console.log("Wrong Answer!!");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //if answer is incorrect then automatically select the currect ans

        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);

            }
        }
    }
    // once the user will seclect disable all options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");

    }
    next_btn.style.display = "block";
}

function showResultBox(params) {
    info_box.classList.remove("activeInfo");//hide the info box
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 13) {
        let scoreTag = '<span>Best you got<p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 25) {
        let scoreTag = ' <span> nice you got<p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = ' <span>and sorry you got<p>' + userScore + '</p>out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }

}

function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer(params) {
        timeCount.textContent = time;
        time--;

        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";

            timeOff.textContent="Time off"
            let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);

                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
        
            }
            next_btn.style.display = "block";
        }
    }
}


function startTimerLine(time) {
    counterLine = setInterval(timer, 55);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px"
        if (time > 549) {
            clearInterval(counterLine);
        }

    }

}







function queCounter(index) {

    const bottom_ques_counter = quiz_box.querySelector(".total_que");

    let totalQuesCountTag = '<span><p>' + index + '</p>of<p>' + questions.length + '<p>Questions</span>';

    bottom_ques_counter.innerHTML = totalQuesCountTag;
}

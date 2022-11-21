//문서객체
function Question(text, choice, answer){
    this.text = text;   //문제의 내용
    this.choice = choice;  //문제의 보기
    this.answer = answer;  //정답 내용
}

//퀴즈 정보 객체
function Quiz(questions){  //배열을 받는 매개변수
    this.score = 0;  //점수
    this.questions = questions;  //질문
    this.questionsIndex = 0; //질문 순서

    //정답을 확인하는 기능(함수)
    //프로토타입으로 제작
    //문제의 정답을 확인하는 역할
}
Quiz.prototype.correctAnswer = function(answer){
    return answer == this.questions[this.questionsIndex].answer;
};

let questions = [
    new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
    new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
    new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
    new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
];

let quiz = new Quiz(questions);

function update_quiz(){  //화면에 진행 사항에 맞게 문제를 표시
    let question = document.getElementById("question");
    //**querySelectorAll()**는 특정 name, id, class를 제한하지 않고 css선택자를 사용하여 요소를 찾습니다
    let choice = document.querySelectorAll('.btn');
    let idx = quiz.questionsIndex + 1;

    //문제출력
    question.innerHTML = '문제' + idx + ')' + quiz.questions[quiz.questionsIndex].text;

    //보기 출력
    for(let i=0;i<4;i++){
        choice[i].innerHTML = quiz.questions[quiz.questionsIndex].choice[i];
    }
    progress();
};

function progress(){
    let progress = document.getElementById("progress");
    progress.innerHTML = '문제 ' + (quiz.questionsIndex + 1) + '/' + quiz.questions.length;
};

function result(){
    let quiz_div = document.getElementById('quiz');
    let per = parseInt((quiz.score * 100)/quiz.questions.length);

    let txt = "<h1>결과</h1>" + "<h2 id= 'score'> 당신의 점수: " + quiz.score + "/" + quiz.questions.length +'</br></br>' + per + '점</h2>';
    quiz_div.innerHTML = txt;

    if(per < 60){
        txt += '<h2 style = "color:red">못했다</h2>';
        quiz_div.innerHTML = txt;
    }else if(per >=60 && per<80){
        txt += '<h2 style = "color:red">무난하다</h2>';
        quiz_div.innerHTML = txt;
    }else if(per >=80){
        txt += '<h2 style = "color:red">잘했다</h2>';
        quiz_div.innerHTML = txt;
    }
}


let btn = document.querySelectorAll('.btn');

function checkAnswer(i){
    btn[i].addEventListener('click',function(){
        let answer = btn[i].innerHTML;
        if(quiz.correctAnswer(answer)){
            alert("정답");
            quiz.score++;
        }else{
            alert("오답");
        }

        if(quiz.questionsIndex < quiz.questions.length -1){
            quiz.questionsIndex++;
            update_quiz();
        }else{
            result();
        }
    });
}

for(let i=0;i<btn.length;i++){
    checkAnswer(i);
}


update_quiz();
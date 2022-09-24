alert("🚀you must click을 누르면 홈 메인화면에 나의 작품이 올라갑니다. 다른 사용자들이 홈화면에서 나의 작품을 보고 놀러올 수 있어요. 눌러주지 않으면 올라가지 않아요// 다른 사람의 작업 공간에 내 작업 댓글로 올리는 방법 : 음악의 종류를 선택하고 메세지 ,음악을 올리고 제출해주세요 제출 후에 🎶 가 보일텐데 체크해주시고 다른 playtogether버튼을 누르면 모든 음악들이 함께 재생되어 조화를 볼 수 있어요!" 
);

$("#subupload-btn").on('click', function() {
    document.all.commendInput.click();
});
var check = 0;
$("#playbutton").on('click', function() {
    wavesurfer.playPause();
    if (check == 0) {
        check = 1;
        document.getElementById("playbutton").classList.replace("fa-play-circle", "fa-pause-circle");
    } else {
        check = 0;
        document.getElementById("playbutton").classList.replace("fa-pause-circle", "fa-play-circle");
    }
});


comment_plays = document.getElementsByClassName("cm-play");

function change_play(event) {
    button = this.getElementsByClassName("button")[0];
    if (button.classList.contains("fa-play-circle")) {
        button.classList.replace("fa-play-circle", "fa-pause-circle");
    }
    else {
        button.classList.replace("fa-pause-circle", "fa-play-circle");
    }
}

for (i = 0; i < comment_plays.length; i++) {
    comment_plays[i].addEventListener("click" , change_play);
}
function findout_checked() {
    //console.log("hello")

    var obj_length = document.getElementsByName("checked").length;
    let checked_list = []

    for (var i = 0; i < obj_length; i++) {
        if (document.getElementsByName("checked")[i].checked == true) {
            console.log("안녕", document.getElementsByName("checked")[i].value)
            checked_list.push(document.getElementsByName("checked")[i].value)

        }
    }
    console.log(checked_list)

    //Play button 들 다 가져오기
    let elementList = document.querySelectorAll(".cm_play");
    console.dir(elementList)
    console.dir(elementList[0].attributes[3].nodeValue) //이걸로 가져올 수 있음 ㅠㅠ

    for (var i = 0; i < elementList.length; i++) {
        for (var j = 0; j < checked_list.length; j++) {
            if (elementList[i].attributes[3].value == parseInt(checked_list[j])) {
                console.log("이걸 클릭해!!")
                elementList[i].click();
                if (i == (elementList.length - 1) || checked_list.length == 1) //순서가 마지막이면
                {
                    $("#playbutton").click()
                }
            }
        }

    }



}

const checking_button = document.querySelector("#checkedbutton");
checking_button.addEventListener("click", findout_checked);


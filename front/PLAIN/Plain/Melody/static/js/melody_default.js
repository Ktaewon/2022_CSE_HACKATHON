alert("๐you must click์ ๋๋ฅด๋ฉด ํ ๋ฉ์ธํ๋ฉด์ ๋์ ์ํ์ด ์ฌ๋ผ๊ฐ๋๋ค. ๋ค๋ฅธ ์ฌ์ฉ์๋ค์ด ํํ๋ฉด์์ ๋์ ์ํ์ ๋ณด๊ณ  ๋๋ฌ์ฌ ์ ์์ด์. ๋๋ฌ์ฃผ์ง ์์ผ๋ฉด ์ฌ๋ผ๊ฐ์ง ์์์// ๋ค๋ฅธ ์ฌ๋์ ์์ ๊ณต๊ฐ์ ๋ด ์์ ๋๊ธ๋ก ์ฌ๋ฆฌ๋ ๋ฐฉ๋ฒ : ์์์ ์ข๋ฅ๋ฅผ ์ ํํ๊ณ  ๋ฉ์ธ์ง ,์์์ ์ฌ๋ฆฌ๊ณ  ์ ์ถํด์ฃผ์ธ์ ์ ์ถ ํ์ ๐ถ ๊ฐ ๋ณด์ผํ๋ฐ ์ฒดํฌํด์ฃผ์๊ณ  ๋ค๋ฅธ playtogether๋ฒํผ์ ๋๋ฅด๋ฉด ๋ชจ๋  ์์๋ค์ด ํจ๊ป ์ฌ์๋์ด ์กฐํ๋ฅผ ๋ณผ ์ ์์ด์!" 
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
            console.log("์๋", document.getElementsByName("checked")[i].value)
            checked_list.push(document.getElementsByName("checked")[i].value)

        }
    }
    console.log(checked_list)

    //Play button ๋ค ๋ค ๊ฐ์ ธ์ค๊ธฐ
    let elementList = document.querySelectorAll(".cm_play");
    console.dir(elementList)
    console.dir(elementList[0].attributes[3].nodeValue) //์ด๊ฑธ๋ก ๊ฐ์ ธ์ฌ ์ ์์ ใ ใ 

    for (var i = 0; i < elementList.length; i++) {
        for (var j = 0; j < checked_list.length; j++) {
            if (elementList[i].attributes[3].value == parseInt(checked_list[j])) {
                console.log("์ด๊ฑธ ํด๋ฆญํด!!")
                elementList[i].click();
                if (i == (elementList.length - 1) || checked_list.length == 1) //์์๊ฐ ๋ง์ง๋ง์ด๋ฉด
                {
                    $("#playbutton").click()
                }
            }
        }

    }



}

const checking_button = document.querySelector("#checkedbutton");
checking_button.addEventListener("click", findout_checked);


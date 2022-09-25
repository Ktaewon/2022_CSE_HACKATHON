function imgSize(which){
    img = document.getElementById(which)
    var width = img.width;
    var height = img.height;
    var max_width= 300;   // 이미지의 가로 최대 크기    
    var max_height = 300; // 이미지의 세로 최대 크기
    img.width = 300;
    img.height = 300;
    /*
    if ( width > max_width ) {  // 이미지가 300보다 크다면 너비를 300으로 맞우고 비율에 맞춰 세로값을 변경한다. 
        height = height/(width / max_width);
        img.width = max_width;
        img.height = height;
        //eval("document."+which+".width = max_width");     
        //eval("document."+which+".height = height");
        width = max_width;     
    }

    if( height > max_height ) {
        width = width/(height / max_height);
        eval(img.width = width);
        eval(img.height = max_height);
    }*/
}


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          // console.log(e.target.result);
          $('#image_section').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function readAudio(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#audio_section').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
    
   //이벤트를 바인딩해서 input에 파일이 올라올때 위의 함수를 this context로 실행합니다.
var ImgLink = "";
$(function() {
    $("#imgInput").on('change', function(){
        ImgLink = readURL(this);
        imgSize("image_section");
    });
});
$(document).ready(function() {
    $("#image_section").load(function() {
        imgSize("image_section");
        // document.getElementById("image_section").style.borderRadius=27;
        document.getElementById("image_section").style.visibility="visible";
    });
});

$("#img_up").on('click', function() {
    document.all.imgInput.click();
});

$("#up_mel").on('click', function() {
    document.all.melodyInput.click();
});
$(function() {
    $("#melodyInput").on('change', function(){
        readAudio(this);
        var fileValue = $("#melodyInput").val().split("\\");
        var fileName = fileValue[fileValue.length-1];
        var text = document.getElementById("music_name");
        text.innerText = fileName;
        $("#music_name").show();
    });
});


let hashtags = "";
var addedHashtags = [];
function makehash(){
    var hashtag = document.getElementById("hashtags");
    if (hashtag.value == "" || hashtag.value == null) {
        alert("Empty! Write a hashtag and push Add button.");
        return false;
    }
    document.getElementById("hash-con").innerHTML += "<span id='hash'>" + "#" + hashtag.value + "</span>";
    if (hashtags == ""){
      hashtags = hashtag.value;
    } else {
      hashtags += "," + hashtag.value;
    }
    addedHashtags.push(hashtag.value);
    document.getElementById("hashtag_data").innerText = hashtags;
    hashtag.value = null;
}

var hash_btn = document.getElementById("hashtag-btn");
hash_btn.addEventListener('click', makehash);

function addInst() {
    document.getElementById("inst-con").innerHTML += '<select class="form-select" aria-label="select example"> \
<option value="">Choose your instrument</option>\
<option value="1">Piano</option>\
<option value="2">Guitar</option>\
<option value="3">Bass</option>\
<option value="4">Drum</option>\
<option value="5">Else...</option>\
</select>'
}
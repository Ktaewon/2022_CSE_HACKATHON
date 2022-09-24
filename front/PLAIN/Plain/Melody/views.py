from django.shortcuts import get_list_or_404, redirect, render, get_object_or_404
from .models import Melody, Comment, Follow,Joiner, Chat
from .forms import MelodyForm
from django.utils import timezone
from django.contrib import messages
from accounts.models import User

# Create your views here.
def melody(request):
    #form = MelodyForm()
    #return render(request, 'melody_upload.html', {'form' : form })
    return render(request, 'melody_upload.html')

def detail(request, id):
    melody = get_object_or_404(Melody, pk=id)  #melody를 작성한 id 값이 들어감
    comments = Joiner.objects.filter( post =melody)  #melody와 연관된 comments들 다 가져오기
    chats = Chat.objects.all().filter(post = melody)
    if melody.likes.filter(id=request.user.id):
        message= 1
    else: 
        message = 2
    message_joiner = 0
    count = 0
    if comments:
        joiner=get_object_or_404(Joiner, pk=id)
        if joiner.joiner_likes.filter(id=request.user.id):
            message_joiner = 1
        else:
            message_joiner = 2
        
    
    comment_sub = []
    for i in range(0, 6):
        comment_sub.append(list())
    for comment in comments:
        print(comment.position)
        if comment.position == "1": #piano
            comment_sub[1].append(comment)
        elif comment.position == "2": #guitar
            comment_sub[2].append(comment)
        elif comment.position == "3": #bass
            comment_sub[3].append(comment)
        elif comment.position == "4": #drum
            comment_sub[4].append(comment)
        elif comment.position == "5": #else
            comment_sub[5].append(comment)
    print(comment_sub)
    return render(request,'melody_default.html',{"melody":melody,"comment_sub":comment_sub, "chats":chats, "message":message, "message_joiner":message_joiner, "count":count},)   #'melody_detail2.html'
    

def upload_melody(request):
    if request.method == "POST":
        melody = Melody()
        melody.title = request.POST["title"]
        melody.deadline = request.POST["deadline"]
        melody.img = request.FILES.get("imgInput")
        if request.POST["body"]:
            melody.body = request.POST["body"]
        user = get_object_or_404(User, pk=request.user.id)
        request.user = user
        melody.owner = request.user
        melody.myInstrument = request.POST["mine"]
        melody.audio = request.FILES.get("melodyInput")
        melody.save()
        tags = request.POST["hashtag_data"].split(",")
        for tag in tags:
            tag = tag.strip()
            melody.hashtags.add(tag)
        melody.save()
        messages.warning(request, 'Upload Finish!')
        #return redirect('default')
        return redirect('default', melody.id)


def preview(request):
    preview=Melody.objects.all()
    return redirect('home')



#commend create
def createcomment(request,id):
    if request.method == "POST":
        comment = Joiner()
        comment.body = request.POST['body']
        comment.position = request.POST['position']  
        comment.pub_date = timezone.datetime.now()
        comment.writer = request.user
        comment.post = get_object_or_404(Melody , pk=id)
        comment.audio = request.FILES.get("commendInput")
        comment.save()
        return redirect('detail',id)
    else:
        return redirect('detail',id)


def comment_delete(request, comment_id):
    comment = get_object_or_404(Joiner, pk=comment_id)
    melody_id = comment.post.id
    comment.delete()

    return redirect('/melody/default/'+str(melody_id))

# '''이밑으로는 안 쓰임!! comment를 join이라는 모델로 만들었음 !!
#    댓글쓴 사람만 댓글 삭제할 수 있는 기능 구현 안됨
#    작성자만 게시물 삭제하거나 수정할 수 있는 것도 아직 안 만든 상태
# '''


#Chats
def chat(request, melody_id):
    if request.method == "POST" :
        chat = Chat()
        chat.body = request.POST['body']
        chat.date = timezone.datetime.now()
        chat.chatter = request.user
        chat.post = get_object_or_404(Melody, pk=melody_id)
        chat.save()

        return redirect('/melody/default/'+str(melody_id))
    else:
        return redirect('/melody/default/'+str(melody_id))

def chat_delete(request, chat_id):
    chat = get_object_or_404(Chat, pk=chat_id)
    melody_id = chat.post.id
    chat.delete()

    return redirect('/melody/default/'+str(melody_id))



# likes
def post_like(request, melody_id):
    melody = get_object_or_404(Melody, pk=melody_id)
    user = request.user

    if melody.likes.filter(id=user.id):
        melody.likes.remove(user)
    else: 
        melody.likes.add(user)

    return redirect('/melody/default/' + str(melody_id))

def joiner_like(request, joiner_id):
    joiner = get_object_or_404(Joiner, pk=joiner_id)
    user = request.user

    if joiner.likes.filter(id=user.id):
        joiner.likes.remove(user)
    else: 
        joiner.likes.add(user)




def default(request, id):
    user = request.user
    #return redirect('/melody/detail/' + str(melody_id))

#     return render(request,'melody_default.html')

    
# # follows
# def follow(request, user_id):
#     people = get_object_or_404(User, id=user_id)

#     if request.user in people.follower.all():
#         people.follower.remove(request.user)
#     else: 
#         people.follower.add(request.user)
#     return redirect('', people.username)
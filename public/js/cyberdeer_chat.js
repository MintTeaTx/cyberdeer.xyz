var username = 'anon';

var socket = io("http://localhost:3000", {});


$(document).ready(function(){
  $("#cursor").remove();
  $("#input").focus();

  $("button").on('click',function(){
    console.log("Clicked! " + $(this).attr('id'));
    switch ($(this).attr('id')) {
      case 'send':
        sendMessage();
        break;
        case 'setUser':
          $("#userModal").css("display", "block");
        break;
      default:

    }
  });

  $(document).keypress(function(e) {
      if(e.which == 13) {
          sendMessage();
      }
  });
});

socket.on('sendMessage', function(msg){
  $("#messageList").append('<div class="entry">> '+msg+'</div>');
});

function sendMessage()
{
  let input = $("#messageInput").val();
  if(input.length <1){
    alert("Message cannot be empty!");
    return;
  }
  socket.emit('sendMessage', $("#messageInput").val());
  $("#input").val('');
}

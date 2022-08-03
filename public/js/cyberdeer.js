let hidden = false;

let modal = [];
$(document).ready( function() {

$("#x").on({
  mouseenter: function() {
    $(this).css("color", "red");
  },
  mouseleave: function() {
    $(this).css("color", "white");
  },
  click: function() {
    if (hidden) {
      $(".terminal.body").show();
    } else {
      $(".terminal.body").hide();
    }
    hidden = !hidden;
  }
});

$("#return").on({
mouseenter: function() {
  $(this).css("color", "green");
},
mouseleave: function() {
  $(this).css("color", "white");
},
click: function() {

  history.back();

}
});
$(".terminal>img").on({
  click: function() {
    console.log("Image clicked!");
    console.log($(this).attr('src'));
    showModal('<img class="modal-image" id="img01" name="img01" src="'+ $(this).attr('src')+'">');
  }
});

$(".close").on({
  click: function() {
  closeModal();
}
});
// $(".modal").on({
//   click: function(){
//     closeModal();
//   }
// });
});
function showModal(appends){
  $("#modalContent").append(appends);
  $(".modal").css("display", "block");
}

function closeModal()
{
  $("#modalContent").empty();
  $(".modal").css("display", "none");
}

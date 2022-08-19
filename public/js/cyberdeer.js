let hidden = false;

$(document).ready(function() {

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
      $("#img01").attr('src', $(this).attr('src'));
      $("#imageModal").css("display", "block");
    }
  });
  $(".close").on({
    click: function() {
      $("#imageModal").css("display", "none");
    }
  });
  $(".modal").on({
    click: function() {
      $("#imageModal").css("display", "none");
    }
  });
  $("#treeview .parent").click(function (e) {
      e.stopPropagation();
      $(this).find(">ul").toggle("slow");
      var caret = $(this).find(">ul>span");
      if(caret.hasClass("caret-down")){
        caret.removeClass("caret-down");
      } else {
        caret.addClass("caret-down");
      }
      if ($(this).hasClass("inactive"))
          $(this).removeClass("inactive");
      else
          $(this).addClass("inactive");
  });
  $("li").click(function(e){
    e.stopPropagation();
    console.log($(this).text());
  });
});

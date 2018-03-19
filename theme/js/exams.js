$(document).ready(function() {
    $(".Q a").click(function(){
         if( $(this).hasClass("true")){
             $(this).find("span").addClass("correct");
         }else{
             $(this).find("span").addClass("wrong");
         }
         $(this).removeAttr("href");
         $(this).addClass("selected");
    });
    $("button span").click(function() {
         if( $(this).text() == "Show Answer"){
             $(this).text('Hide Answer');
         }else if( $(this).text() == "Hide Answer"){
             $(this).text('Show Answer');
         }else if( $(this).text() == "Show Editor"){
             $(this).text('Hide Editor');
         }else if( $(this).text() == "Hide Editor"){
             $(this).text('Show Editor');
         }
    });
});
function showAnswer( id ){
   $('#A' + id).slideToggle('slow');
   $('#Q' + id + " .true").removeAttr("href");
   $('#Q' + id + " .true").addClass("selected");
   $('#Q' + id + " .true").find("span").addClass("correct");
}
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}
var incrementTime = 70;
var Timer = null;
var timeout = 0;
function updateTimer() {
     var timeString = formatTime(currentTime);
     $('#counter').html(timeString);
     // If timer is complete, trigger alert
     if (currentTime == 0 && !timeout) {
         finishTest();
         return;
     }else{
        // Increment timer position
        currentTime -= incrementTime;
        if (currentTime < 0) currentTime = 0;
     }
}

function finishTest(){
    Timer.stop();
    $("div.control").addClass( "hide" );
    $("#stage").html("");
    $("#stage").append("<a href='javascript:checkTestResult();' title='Check Result'><img src='/images/time_over.png' alt='Test is Over'/></a>");
    $("#stage").append("<center><a href='javascript:checkTestResult();' title='Check Result'><h2>Test is Over, Check Result</h2></a></center>");
    timeout = 1;
    elapsedTime = givenTime - currentTime;
    return;
}

function checkTestResult(){
    $.ajax({
       url: "/checkTestResult.php",
       data: { testID: testID, testURL:testURL, questionMap:questionMap, totalQ:totalQ, elapsedTime: elapsedTime },
       success: function( data ) {
          $( "#stage" ).html( data );
       }
   });
}

var selected = 1;
function nextQuestion( prefix ){
  if( timeout > 0 ){
      alert('Given time for online test is over');
      return;
  }
  $(".Q a").each(function( index ){
     if( $(this).hasClass("selected")){
         selected = 1;
     }
  });
  if( !selected ){
      alert("Please select an asnwer before proceeding");
      return;
  }
  if( Timer === null ){
     /* Start the timer */
     Timer = $.timer(updateTimer, incrementTime, true);
  }
  if( currentQ == totalQ ){
      alert('You are already at last question');
      return;
  }else{
      currentQ++;
  }
  /* Get the next question ID */
  questionID = questionMap[currentQ].id;
  $("div.control").removeClass( "hide" );
  $("#stage").load(prefix + "/" + questionID + ".htm?QN=" + currentQ, function(){
      selected = 0;
      $("button").addClass( "hide" );
      /* Check if its already clicked one */
      if( questionMap[currentQ].selected < 10){
         $(".Q a").each(function( index ){
             if( questionMap[currentQ].selected === index ){
                 $(this).addClass("selected");
                 selected = 1;
             }
         });
      }
      if( $('.middle-col').height() < $('.sidebar').height() && (window.innerWidth > 991)){
           $('.middle-col').css("height", $('.sidebar').height() + 50 );
      }
      if( $('.middle-col').height() < $('#rightbar').height() && (window.innerWidth > 991)){
           $('.middle-col').css("height", "1113");
      }
      $(".Q a").click(function(){
         /* Get the index of clicked option */
         var index = $( ".Q a" ).index( this );
         questionMap[currentQ].selected = index;

         /* Unselect all the options */
         $(".Q a").each(function( index ){
             if( $(this).hasClass("true")){
                 /* Note down index of correct answer */
                 questionMap[currentQ].correct = index;
             }
             $(this).removeClass("selected");
         });
         $(this).addClass("selected");
         selected = 1;
     });
     if (timeout) {
         $("#stage").html("");
         $("#stage").append("<a href='javascript:checkTestResult();' title='Check Result'><img src='/images/time_over.png' alt='Time is Over'/></a>");
         $("#stage").append("<center><a href='javascript:checkTestResult();' title='Check Result'><h2>Time is Over, Check Result</h2></a></center>");
     }
  });
}

function previousQuestion( prefix ){
  if( timeout > 0 ){
      alert('Given time for online test is over');
      return;
  }
  /* Get the previous question ID */
  currentQ--;
  if( currentQ < 1 ){
     currentQ++;
     alert( "You are already at first question!");
     return;
  }
  questionID = questionMap[currentQ].id;
  $("div.pre-btn").removeClass( "hide" );
  $("div.nxt-btn").removeClass( "hide" );
  $("hr").removeClass( "hide" );
  $("#stage").load(prefix + "/" + questionID + ".htm?QN=" + currentQ, function(){
      $("button").addClass( "hide" );
      /* Check if its already clicked one */
      if( questionMap[currentQ].selected < 10  ){
         $(".Q a").each(function( index ){
             if( questionMap[currentQ].selected === index ){
                 $(this).addClass("selected");
             }
         });
      }
      $(".Q a").click(function(){
         /* Get the index of clicked option */
         var index = $( ".Q a" ).index( this );
         questionMap[currentQ].selected = index;

         /* Unselect all the options */
         $(".Q a").each(function( index ){
             if( $(this).hasClass("true")){
                 /* Note down index of correct answer */
                 questionMap[currentQ].correct = index;
             }
             $(this).removeClass("selected");
         });
         $(this).addClass("selected");
     });
     if (timeout) {
         $("#stage").html("");
         $("#stage").append("<a href='javascript:checkTestResult();' title='Check Result'><img src='/images/time_over.png' alt='Time is Over'/></a>");
         $("#stage").append("<center><a href='javascript:checkTestResult();' title='Check Result'><h2>Time is Over, Check Result</h2></a></center>");
     }
  });
}

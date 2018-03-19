$(document).ready(function() {  
   window.fbAsyncInit = function() {
      FB.init({
         appId      : '1541683152714097',
         xfbml      : true,
         version    : 'v2.1'
      });
   };
   (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));	
		
   var lurname = '';
   var hashK = 'RU5DUlBUX0tFWQ==';
	var re =  /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			
   $('.wrapLoader').hide();
			
   if(lurname != '')
   {
      $('#ulSignup').hide();
      $('#ancUname').html(lurname);
      $('#ulUsername').show();
      $('#scrlmenu').hide();
      $('#teachOnline').hide();
      $('#searchBar').addClass("gg");
      $('.sticky-menu-active #searchBar').addClass("gg");
   } else {
      $('#ulSignup').show();
      $('#ancUname').html('');
      $('#ulUsername').hide();    
   }			
   var url = window.location.pathname;
   var pagename = url.substring(url.lastIndexOf('/')+1);

   $.ajax({
      url: "absoluteclasses/ajax/ajaxSignIn.php",
      method:"POST",
      data: {"hashCki":hashK}
      }).done(function(msg) {  
         $('.wrapLoader').show();
      if(msg == -1)
      {					
         $('.wrapLoader').hide();
         $('#ulSignup').show();		
         var pagenameArr = ['','courseinfo.htm','tutorsignup.htm','topcourses.htm','allcourses.htm','ourinstructors.htm','upcomingclasses.htm','scheduledetails.htm'];  
         if(!$.inArray(pagename,pagenameArr))
         {
            if((pagename != 'index.htm') || (pagename == '')  )
            {							
               $(location).attr('href',"index.htm");	
            } 
         }
      }
      else
      {    					
         $('#ancUname').html(msg);
         $('#ulUsername').show();
         $('.wrapLoader').hide();
         $('#submenuu').hide();
       }
   });
   $('#LearnMoreBtn').click(function(){
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      overlay.style.display = "block";
      popup.style.display = "block";
   });
   $('#CloseBtn').click(function(){
      var overlay = document.getElementById("overlay");
      var popup = document.getElementById("popup");
      overlay.style.display = "none";
      popup.style.display = "none";      
   });
   $('#MoreBtn').click(function(){
      var overlay = document.getElementById("overlay2");
      var popup = document.getElementById("popup2");
      overlay.style.display = "block";
      popup.style.display = "block";
   });
   $('#CloseBtn2').click(function(){
      var overlay = document.getElementById("overlay2");
      var popup = document.getElementById("popup2");
      overlay.style.display = "none";
      popup.style.display = "none";     
   });
   $('#MoreTeachBtn').click(function(){
      var overlay = document.getElementById("overlay3");
      var popup = document.getElementById("popup3");
      overlay.style.display = "block";
      popup.style.display = "block";
   });
   $('#CloseBtn3').click(function(){
      var overlay = document.getElementById("overlay3");
      var popup = document.getElementById("popup3");
      overlay.style.display = "none";
      popup.style.display = "none";     
   });

   $('#liLogout').click(function(){
      $('.wrapLoader').show();
      $.ajax({
        url: "absoluteclasses/ajax/ajaxSignOut.php",
        method:"POST"				  
      }).done(function(msg) {     
         $(location).attr('href',"index.htm");        	
      });
   });	

   $('#my-login, #my-loginscrl').on('click', function(e) {
      e.preventDefault();
      $('#popup1').html('');      
      $('#popup1').bPopup({
         loadUrl: 'absoluteclasses/login.php'
      });
   });
   $('#my-signup, #my-signupscrl').on('click', function(e) {
      e.preventDefault();
      $('#popup2').html('');      
      $('#popup2').bPopup({
         loadUrl: 'absoluteclasses/signup.php' 
      });
   });
});
function addWishlist(uid,crid)
{
   if(uid != '')
   {
      $.ajax({
        url: "absoluteclasses/ajax/ajaxSetWishlist.php",
        method:"POST",
        data: {"uid":uid,"crid":crid}
      }).done(function(msg) {    
         if(msg == -1)
         {
            alert("Something went wrong. Please try again later");
         } else if(msg == 'flag0'){            
            $('#hh'+crid).css('color','#3a734b');
         } else if(msg == 'flag1'){          
            $('#hh'+crid).css('color','#f00');
         }
      });
   } else {		
      $(location).attr('href',"absoluteclasses/userlogin.htm");	
/*
      $('#popup1').html('');     
      $('#popup1').bPopup({
         loadUrl: 'absoluteclasses/login.php'
      });
*/
   }
}
function addSubscribe(userid1,crid)
{
   if(userid1 != '')
   {
      $.ajax({
        url: "absoluteclasses/ajax/ajaxSetUserSubscribe.php",
        method:"POST",
        data: {"uid":userid1,"crid":crid}
      }).done(function(msg) {       
         if(msg == -1)
         {
            alert("Something went wrong. Please try again later");
         } else {
            alert(msg);				
         }
      }); 
   } else {		
      $(location).attr('href',"absoluteclasses/userlogin.htm");	
/*
      $('#popup1').html('');      
      $('#popup1').bPopup({
         loadUrl: 'absoluteclasses/login.php' 
      });
*/
   }
}	

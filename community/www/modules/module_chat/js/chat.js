
var on=true;
var windowFocus = true;
var username;
var chatHeartbeatCount = 0;
var minChatHeartbeat = 2000;
var maxChatHeartbeat = 8000;
var chatHeartbeatTime = minChatHeartbeat;
var originalTitle;
var blinkOrder = 0;
var user_list = "open";
var scrollalert_timeout;
var chatheartbeat_timeout;
var refresh_rate = 4000; // How fast the User List will be refreshed?
var scrollalertNotCaringCss_timeout;



var chatboxFocus = new Array();
var newMessages = new Array();
var newMessagesWin = new Array();
var chatBoxes = new Array();

var $J = jQuery.noConflict();

$J(document).ready(function(){

 originalTitle = document.title;

 startChatSession();

if ($J.cookie("chat_on") == null)
  $J.cookie("chat_on", "on");

 var chat_status = $J.cookie('chat_on');
 scrollalertNotCaringCss();


 if (chat_status == "off"){

  $J('#user_list').css("visibility","hidden");
  $J('#user_list').css("height","0px");
  $J('#chat_bar').css("height","25px");
  $J('#chat_bar').css("width","22px");
  $J('#chat_bar').css("text-align","center");
  //$J('#chat_bar').css("margin-left","102.8em");
  $J('#chat_bar').css("float","right");

  $J('#status').html(' ');
  $J('#status').hide();
  $J('#first').hide();
 }
 else{

  user_list = "closed";
  $J('#chat_bar').css("height","25px");
  $J('#user_list').css("visibility","hidden");
  $J('#user_list').css("height","0px");
  clearTimeout(scrollalert_timeout);
  scrollalertNotCaringCss_timeout = setTimeout('scrollalertNotCaringCss();', refresh_rate);
 }

 $J([window, document]).blur(function(){
  windowFocus = false;
 }).focus(function(){
  windowFocus = true;
  document.title = originalTitle;
 });


 updatestatus();/* ADDED FOR THE USER LIST CONTENT BOX */


 $J('body').click(function() {
          if (user_list == "open")
          toggle_users();
         });

 $J('#chat_bar').click(function(event){
     event.stopPropagation();
 });

});


/* Update status - Fix user list content box height*/
function updatestatus(){

 var chat_status = $J.cookie("chat_on");

 if (chat_status == 'on'){
  //Show number of loaded items
  var totalItems=$J('#content p').length;
  var height = totalItems*20;
  if ( height > 600)
   height = 600;
  $J('#user_list').height(height);
  height = height+25;
  $J('#chat_bar').height(height);
  $J('#status').html('<img src="'+ modulechatbaselink +'img/chat16x16.png" />'+ 'Chat (' +totalItems +')');

 }
}

function updatestatusNotCaringCss(){

 var chat_status = $J.cookie("chat_on");

 if (chat_status == 'on'){
  //Show number of loaded items
  var totalItems=$J('#content p').length;
  $J('#status').html('<img src="'+ modulechatbaselink +'img/chat16x16.png" />'+ 'Chat (' +totalItems +')');

 }
}

function scrollalert(){

 var chat_status = $J.cookie("chat_on");

 if (chat_status == 'on'){
  //fetch new users
  //$J('#status').text('Loading Users...');
  $J.get(modulechatbaselink+'new-items.php', '', function(newitems){
   $J('#content').html(newitems);
   updatestatus();
  });
 }

 scrollalert_timeout = setTimeout('scrollalert();', refresh_rate);
}


function scrollalertNotCaringCss(){

 var chat_status = $J.cookie("chat_on");

 if (chat_status == 'on'){
  //fetch new users
  //$J('#status').text('Loading Users...');
  $J.get(modulechatbaselink+'new-items.php', '', function(newitems){
   $J('#content').html(newitems);
   updatestatusNotCaringCss();
  });
 }

 scrollalertNotCaringCss_timeout = setTimeout('scrollalertNotCaringCss();', refresh_rate);
}

/* Turn the Chat System ON or OFF*/
function on_off() {
 var chat_status = $J.cookie('chat_on');

 //Closing chat module
 if (chat_status == "on"){
  $J('#user_list').css("visibility","hidden");
  $J('#user_list').css("height","0px");
  $J('#chat_bar').css("height","25px");
  $J('#chat_bar').css("width","22px");
  $J('#chat_bar').css("text-align","center");
  $J('#chat_bar').css("float","right");

  $J('#status').html(' ');
  $J('#status').hide();
  $J('#first').hide();

  user_list = "closed";
  clearTimeout(scrollalert_timeout);
  clearTimeout(chatheartbeat_timeout);
  $J.get(modulechatbaselink+'chat.php?action=logoutfromchat');


  $J.cookie("chat_on", "off");
 }
 //Opening Chat module
 else{
  $J('#status').text('Connecting.......  ');
  $J('#user_list').css("visibility","visible");
  $J('#chat_bar').css("width","18em");
  $J('#chat_bar').css("text-align","left");
  $J('#chat_bar').css("float","right");
  $J('#status').show();
  $J('#first').show();


  $J.cookie("chat_on", "on");
  toggle_users();


  $J.get(modulechatbaselink+'chat.php?action=logintochat');

  chatHeartbeat();
 }
}


function toggle_users() {

 var chat_status = $J.cookie('chat_on');

 if (user_list == "open"){

  $J('#user_list').css("visibility","hidden");
  $J('#user_list').css("height","0px");
  $J('#chat_bar').css("height","25px");
  user_list = "closed";

  clearTimeout(scrollalert_timeout);
  scrollalertNotCaringCss_timeout = setTimeout('scrollalertNotCaringCss();', refresh_rate);

 }
 else{
  $J('#user_list').css("visibility","visible");
  user_list = "open";
  clearTimeout(scrollalertNotCaringCss_timeout);
  scrollalert();
 }

}


function restructureChatBoxes() {

 align = 0;
 for (x in chatBoxes) {
  if (chatBoxes.hasOwnProperty(x)){
   chatboxtitle = chatBoxes[x];

   if ($J("#chatbox_"+chatboxtitle).css('display') != 'none') {
    if (align == 0) {
     $J("#chatbox_"+chatboxtitle).css('right', '220px');
    } else {
     width = (align)*(225+1)+220;
     $J("#chatbox_"+chatboxtitle).css('right', width+'px');
    }
    align++;
   }
  }
 }
}

function chatWith(chatuser) {
 createChatBox(chatuser);
 $J("#chatbox_"+chatuser+" .chatboxtextarea").focus();
}

function createChatBox(chatboxtitle,minimizeChatBox) {

 if ($J("#chatbox_"+chatboxtitle).length > 0) {
  if ($J("#chatbox_"+chatboxtitle).css('display') == 'none') {
   $J("#chatbox_"+chatboxtitle).css('display','block');
   restructureChatBoxes();
  }
  $J("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
  return;
 }

 $J(" <div />" ).attr("id","chatbox_"+chatboxtitle)
 .addClass("chatbox")
 .html('<div class="chatboxhead" onclick="javascript:toggleChatBoxGrowth(\''+chatboxtitle+'\')"><div class="chatboxtitle">'+chatboxtitle+'</div><div class="chatboxoptions"><a href="javascript:void(0)" onclick="javascript:closeChatBox(\''+chatboxtitle+'\')">x</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onkeydown="javascript: return checkChatBoxInputKey(event,this,\''+chatboxtitle+'\');"></textarea></div>')
 .appendTo($J( "body" ));

 $J("#chatbox_"+chatboxtitle).css('bottom', '0px');

 chatBoxeslength = 0;

 for (x in chatBoxes) {
  if (chatBoxes.hasOwnProperty(x)){
   if ($J("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
    chatBoxeslength++;
   }
  }
 }

 if (chatBoxeslength == 0) {
  $J("#chatbox_"+chatboxtitle).css('right', '220px');
 } else {
  width = (chatBoxeslength)*(225+1)+220;
  $J("#chatbox_"+chatboxtitle).css('right', width+'px');
 }

 chatBoxes.push(chatboxtitle);

 if (minimizeChatBox == 1) {
  minimizedChatBoxes = new Array();

  if ($J.cookie('chatbox_minimized')) {
   minimizedChatBoxes = $J.cookie('chatbox_minimized').split(/\|/);
  }
  minimize = 0;
  for (j=0;j<minimizedChatBoxes.length;j++) {
   if (minimizedChatBoxes[j] == chatboxtitle) {
    minimize = 1;
   }
  }

  if (minimize == 1) {
   $J('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
   $J('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
  }
 }

 chatboxFocus[chatboxtitle] = false;

 $J("#chatbox_"+chatboxtitle+" .chatboxtextarea").blur(function(){
  chatboxFocus[chatboxtitle] = false;
  $J("#chatbox_"+chatboxtitle+" .chatboxtextarea").removeClass('chatboxtextareaselected');
 }).focus(function(){
  chatboxFocus[chatboxtitle] = true;
  newMessages[chatboxtitle] = false;
  $J('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass('chatboxblink');
  $J("#chatbox_"+chatboxtitle+" .chatboxtextarea").addClass('chatboxtextareaselected');
 });

 /*$J("#chatbox_"+chatboxtitle).click(function() {

		if ($J('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') != 'none') {

			$J("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();

		}

	});*/
 $J("#chatbox_"+chatboxtitle).show();
}
function chatHeartbeat(){

  var itemsfound = 0;

  if (windowFocus == false) {

   var blinkNumber = 0;
   var titleChanged = 0;
   for (x in newMessagesWin) {
    if (newMessagesWin[x] == true) {
     ++blinkNumber;
     if (blinkNumber >= blinkOrder) {
      document.title = x+' says...';
      titleChanged = 1;
      break;
     }
    }
   }

   if (titleChanged == 0) {
    document.title = originalTitle;
    blinkOrder = 0;
   } else {
    ++blinkOrder;
   }

  } else {
   for (x in newMessagesWin) {
    newMessagesWin[x] = false;
   }
  }

  for (x in newMessages) {
   if (newMessages[x] == true) {
    if (chatboxFocus[x] == false) {
     $J('#chatbox_'+x+' .chatboxhead').toggleClass('chatboxblink');
    }
   }
  }

  $J.ajax({
    url: modulechatbaselink+"chat.php?action=chatheartbeat",
    cache: false,
    dataType: "json",
    success: function(data) {

   $J.each(data.items, function(i,item){
    if (item) { // fix strange ie bug

     chatboxtitle = item.f;

     if ($J("#chatbox_"+chatboxtitle).length <= 0) {
      createChatBox(chatboxtitle);
     }
     if ($J("#chatbox_"+chatboxtitle).css('display') == 'none') {
      $J("#chatbox_"+chatboxtitle).css('display','block');
      restructureChatBoxes();
     }

     if (item.s == 1) {
      item.f = username;
     }

     if (item.s == 2) {
      $J("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
     } else {
      newMessages[chatboxtitle] = true;
      newMessagesWin[chatboxtitle] = true;
      $J("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
     }

     $J("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($J("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
     itemsfound += 1;
    }
   });

   chatHeartbeatCount++;

   if (itemsfound > 0) {
    chatHeartbeatTime = minChatHeartbeat;
    chatHeartbeatCount = 1;
   } else if (chatHeartbeatCount >= 10) {
    chatHeartbeatTime *= 2;
    chatHeartbeatCount = 1;
    if (chatHeartbeatTime > maxChatHeartbeat) {
     chatHeartbeatTime = maxChatHeartbeat;
    }
   }

   chatheartbeat_timeout = setTimeout('chatHeartbeat();',chatHeartbeatTime);
  }});

}

function closeChatBox(chatboxtitle) {



 $J('#chatbox_'+chatboxtitle).css('display','none');
 $J("#chatbox_"+chatboxtitle+" .chatboxcontent").html('');
 restructureChatBoxes();

 $J.post(modulechatbaselink+"chat.php?action=closechat", { chatbox: chatboxtitle} , function(data){
 });

 //$J('.chatboxmessage').html(''); //added to prevent duplicate of chat history after chat window has closed

}

function toggleChatBoxGrowth(chatboxtitle) {
 if ($J('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') == 'none') {

  var minimizedChatBoxes = new Array();

  if ($J.cookie('chatbox_minimized')) {
   minimizedChatBoxes = $J.cookie('chatbox_minimized').split(/\|/);
  }

  var newCookie = '';

  for (i=0;i<minimizedChatBoxes.length;i++) {
   if (minimizedChatBoxes[i] != chatboxtitle) {
    //newCookie += chatboxtitle+'|'; //DEBUG changed for not toggling minimized chat windows
    newCookie += minimizedChatBoxes[i]+'|';
   }
  }

  newCookie = newCookie.slice(0, -1)


  $J.cookie('chatbox_minimized', newCookie);
  $J('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','block');
  $J('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','block');
  $J("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($J("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
 } else {

  var newCookie = chatboxtitle;

  if ($J.cookie('chatbox_minimized')) {
   newCookie += '|'+$J.cookie('chatbox_minimized');
  }


  $J.cookie('chatbox_minimized',newCookie);
  $J('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
  $J('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
 }

}

function checkChatBoxInputKey(event,chatboxtextarea,chatboxtitle) {

 if(event.keyCode == 13 && event.shiftKey == 0) {
  message = $J(chatboxtextarea).val();
  message = message.replace(/^\s+|\s+$/g,"");
  $J(chatboxtextarea).val('');
  $J(chatboxtextarea).focus();
  $J(chatboxtextarea).css('height','44px');
  if (message != '') {
   /*$J.post(modulechatbaselink+"chat.php?action=sendchat", {to: chatboxtitle, message: message} , function(data){



				message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");

				$J("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+username+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+message+'</span></div>');

				$J("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($J("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);

				

				

			});*/
   msg = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
    $J("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+username+':&nbsp;</span><span class="chatboxmessagecontent">'+msg+'</span></div>');
    $J("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($J("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
   $J.post(modulechatbaselink+"chat.php?action=sendchat", {to: chatboxtitle, message: message});
  }
  chatHeartbeatTime = minChatHeartbeat;
  chatHeartbeatCount = 1;
  return false;
 }
 var adjustedHeight = chatboxtextarea.clientHeight;
 var maxHeight = 94;
 if (maxHeight > adjustedHeight) {
  adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
  if (maxHeight)
   adjustedHeight = Math.min(maxHeight, adjustedHeight);
  if (adjustedHeight > chatboxtextarea.clientHeight)
   $J(chatboxtextarea).css('height',adjustedHeight+8 +'px');
 } else {
  $J(chatboxtextarea).css('overflow','auto');
 }
}
function startChatSession(){
  $J.ajax({
  url: modulechatbaselink+"chat.php?action=startchatsession",
  cache: false,
  dataType: "json",
  success: function(data) {
   username = data.username;
   $J.each(data.items, function(i,item){
    if (item) { // fix strange ie bug

     chatboxtitle = item.f;

     if ($J("#chatbox_"+chatboxtitle).length <= 0) {
      createChatBox(chatboxtitle,1);
     }

     if (item.s == 1) {
      item.f = username;
     }

     if (item.s == 2) {
      $J("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
     } else {
      $J("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+item.f+':&nbsp;&nbsp;</span><span class="chatboxmessagecontent">'+item.m+'</span></div>');
     }
    }
   });
   for (i=0;i<chatBoxes.length;i++) {
     chatboxtitle = chatBoxes[i];
     $J("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($J("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
     setTimeout('$J("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($J("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);', 100); // yet another strange ie bug
   }

   chatheartbeat_timeout = setTimeout('chatHeartbeat();',chatHeartbeatTime);

  }
 });

}



function disableSelection(target){

    if (typeof target.onselectstart!="undefined") //IE route
        target.onselectstart=function(){return false}

    else if (typeof target.style.MozUserSelect!="undefined") //Firefox route
        target.style.MozUserSelect="none"

    else //All other route (ie: Opera)
        target.onmousedown=function(){return false}

    target.style.cursor = "default"
}



/**

 * Cookie plugin

 *

 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)

 * Dual licensed under the MIT and GPL licenses:

 * http://www.opensource.org/licenses/mit-license.php

 * http://www.gnu.org/licenses/gpl.html

 *

 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

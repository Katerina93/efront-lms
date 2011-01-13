<?php
include("../../../libraries/configuration.php");

session_start();

/*if ($_SESSION['s_lessons_ID']){



	$lsn = eF_getTableData("lessons", "name", "id='".$_SESSION['s_lessons_ID']."'");

	foreach ($lsn as $value){

		$lesson = str_replace(' ', '_', $value['name']);

		echo '<p><a href="javascript:void(0)" onClick="javascript:chatWith(\''.$lesson.'\')">'.$lesson.'</a></p>';

	}

}*/
$onlineUsers = getConnectedUsers();
if ($_SESSION['utype'] == 'administrator') {
 foreach ($onlineUsers as $user){
  if ($user['login'] != $_SESSION['chatter'])
   echo '<p><a href="javascript:void(0)" onClick="javascript:chatWith(\''.$user['login'].'\')">'.$user['formattedLogin'].'</a></p>';
 }
}
else{
 foreach ($onlineUsers as $user){
  if ($user['login'] != $_SESSION['chatter'])
   if ($_SESSION['commonality'][$user['login']] > 0)
    echo '<p><a href="javascript:void(0)" onClick="javascript:chatWith(\''.$user['login'].'\')">'.$user['formattedLogin'].'</a></p>';
 }
}
function getConnectedUsers(){
 $usersOnline = array();
  //A user may have multiple active entries on the user_times table, one for system, one for unit etc. Pick the most recent
  $result = eF_getTableData("user_times,users,module_chat_users", "users_LOGIN, users.name, users.surname, users.user_type, timestamp_now, session_timestamp", "users.login=user_times.users_LOGIN and users.login=module_chat_users.username and session_expired=0", "timestamp_now desc");
  foreach ($result as $value) {
   if (!isset($parsedUsers[$value['users_LOGIN']])) {
    $value['login'] = $value['users_LOGIN'];
    if (time() - $value['timestamp_now'] < $interval || !$interval) { // TODO: DEN XREIAZETAI NA KANW LOGOUT TOUS USERS - REMOVE IF-ELSE
  //if (in_array( $value['users_LOGIN'], $_SESSION['commonality'])){
   $usersOnline[] = array('login' => $value['users_LOGIN'],
     'formattedLogin'=> formatLogin(false, $value),
     'user_type' => $value['user_type'],
     'timestamp_now' => $value['timestamp_now'],
     'time' => eF_convertIntervalToTime(time() - $value['session_timestamp']));
  //}
    } else {
     EfrontUserFactory :: factory($value['users_LOGIN']) -> logout();
    }
    $parsedUsers[$value['users_LOGIN']] = true;
   }
  }
  return $usersOnline;
}
?>

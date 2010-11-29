{*Smarty template*}

{capture name = 't_change_login_code'}
 {eF_template_printForm form = $T_TOOLS_FORM}
 <div id = "module_administrator_tools_autocomplete_users_div" class = "autocomplete"></div>
{/capture}

{capture name = 't_global_settings_code'}
  {eF_template_printBlock title = $smarty.const._MODULE_ADMINISTRATOR_TOOLS_GLOBALLESSONSETTINGS columns = 4 links = $T_LESSON_SETTINGS image='32x32/lessons.png' main_options = $T_TABLE_OPTIONS groups = $T_LESSON_SETTINGS_GROUPS}
{/capture}

{capture name = 't_sql_code'}
 {eF_template_printForm form = $T_SQL_FORM}
 <div id = "sql_output_area" style = "width:100%;border:1px dotted black;height:400px">
 {if isset($T_SQL_RESULT)}
 <table>
 {foreach name = 'sql_results_loop' item = "row" key = "key" from = $T_SQL_RESULT}
  {if $smarty.foreach.sql_results_loop.first}
  <tr class = "topTitle" style = "border-top:0px">
  {else}
  <tr class = "defaultRowHeight {cycle values = "oddRowColor, evenRowColor"}">
  {/if}
   {foreach name = "row_loop" item = "column" key = "foo" from = $row}
    <td style = "padding:0px 3px 0px 3px">{$column}</td>
   {/foreach}
  </tr>
  {if $smarty.foreach.sql_results_loop.last}
  <tr><td colspan = "100%">{$smarty.foreach.sql_results_loop.total} {$smarty.const._MODULE_ADMINISTRATOR_TOOLS_ROWSINSET}</td></tr>
  {/if}
 {foreachelse}
   {if isset($T_SQL_AFFECTED_ROWS)}
    {$smarty.const._MODULE_ADMINISTRATOR_TOOLS_QUERYOK}, {$T_SQL_AFFECTED_ROWS} {$smarty.const._MODULE_ADMINISTRATOR_TOOLS_ROWSAFFECTED}
   {else}
    {$smarty.const._MODULE_ADMINISTRATOR_TOOLS_EMPTYSET}
   {/if}
 {/foreach}
 </table>
 {/if}
 </div>
{/capture}

{capture name = 't_set_course_users_code'}
            <table class = "statisticsTools statisticsSelectList" style = "margin-bottom:50px">
                <tr><td class = "labelCell">{$smarty.const._CHOOSELESSON}:</td>
                    <td class = "elementCell" colspan = "4">
                        <input type = "text" id = "autocomplete" class = "autoCompleteTextBox" value = "{$T_CURRENT_LESSON->lesson.name}"/>
                        <img id = "busy" src = "images/16x16/clock.png" style="display:none;" alt = "{$smarty.const._LOADING}" title = "{$smarty.const._LOADING}"/>
                        <div id = "module_administrator_tools_autocomplete_lessons_div" class = "autocomplete"></div>&nbsp;&nbsp;&nbsp;
                    </td>
                </tr>
                <tr><td></td>
                 <td class = "infoCell" colspan = "4">{$smarty.const._STARTTYPINGFORRELEVENTMATCHES}</td></tr>
         </table>
{if $smarty.get.lessons_ID}

<!--ajax:usersTable-->

     <table style = "width:100%" class = "sortedTable" size = "{$T_TABLE_SIZE}" sortBy = "0" id = "usersTable" useAjax = "1" rowsPerPage = "{$smarty.const.G_DEFAULT_TABLE_SIZE}" url = "{$T_MODULE_ADMINISTRATOR_TOOLS_BASEURL}&lessons_ID={$smarty.get.lessons_ID}&">
      <tr class = "topTitle">
       <td class = "topTitle" name = "login">{$smarty.const._LOGIN}</td>
       <td class = "topTitle" name = "name">{$smarty.const._NAME}</td>
       <td class = "topTitle" name = "surname">{$smarty.const._SURNAME}</td>
       <td class = "topTitle" name = "user_type">{$smarty.const._USERTYPE}</td>
       <td class = "topTitle" name = "role">{$smarty.const._USERROLEINLESSON}</td>
       <td class = "topTitle centerAlign">{$smarty.const._OPERATIONS}</td>
       <td class = "topTitle centerAlign" name = "has_lesson">{$smarty.const._STATUS}</td>
      </tr>
 {foreach name = 'users_to_lessons_list' key = 'key' item = 'user' from = $T_DATA_SOURCE}
      <tr class = "defaultRowHeight {cycle values = "oddRowColor, evenRowColor"} {if !$user.active}deactivatedTableElement{/if}">
       <td>#filter:login-{$user.login}#</td>
       <td>{$user.name}</td>
       <td>{$user.surname}</td>
       <td>{$T_ROLES[$user.basic_user_type]}</td>
       <td>
  {if !isset($T_CURRENT_USER->coreAccess.users) || $T_CURRENT_USER->coreAccess.users == 'change'}
        <select name="type_{$user.login}" id = "type_{$user.login}" onchange = "$('checked_{$user.login}').checked=true;ajaxPost('{$user.login}', this);">
   {foreach name = 'roles_list' key = 'role_key' item = 'role_item' from = $T_ROLES}
         <option value="{$role_key}" {if !$user.role}{if $user.user_types_ID && $user.user_types_ID == $role_key}selected{elseif !$user.user_types_ID && $user.user_type == $role_key}selected{/if}{elseif ($user.role == $role_key)}selected{/if} {if $user.user_types_ID == $role_key || $user.user_type == $role_key}style = "font-weight:bold"{/if}>{$role_item}</option>
   {/foreach}
        </select>
  {else}
        {$T_ROLES[$user.role]}
  {/if}
       </td>
       <td class = "centerAlign">
       {if $user.basic_user_type == 'student'}
         <img class = "ajaxHandle" src="images/16x16/refresh.png" title="{$smarty.const._RESETPROGRESSDATA}" alt="{$smarty.const._RESETPROGRESSDATA}" onclick = "resetProgress(this, '{$user.login}');">
       {/if}
       </td>
       <td class = "centerAlign">
  {if !isset($T_CURRENT_USER->coreAccess.users) || $T_CURRENT_USER->coreAccess.users == 'change'}
        <input class = "inputCheckbox" type = "checkbox" name = "checked_{$user.login}" id = "checked_{$user.login}" onclick = "ajaxPost('{$user.login}', this);" {if $user.has_lesson}checked = "checked"{/if} />
  {else}
         {if $user.has_lesson}<img src = "images/16x16/success.png" title = "{$smarty.const._LESSONUSER}" alt = "{$smarty.const._LESSONUSER}" >{/if}
  {/if}
       </td>
     </tr>
 {foreachelse}
     <tr class = "defaultRowHeight oddRowColor"><td class = "emptyCategory" colspan = "100%">{$smarty.const._NODATAFOUND}</td></tr>
 {/foreach}
    </table>

<!--/ajax:usersTable-->

{/if}
{/capture}

{capture name = 't_administrator_tools_code'}
 <div class = "tabber">
  {eF_template_printBlock tabber = "change_login" title = $smarty.const._MODULE_ADMINISTRATOR_TOOLS_CHANGELOGIN data = $smarty.capture.t_change_login_code absoluteImagePath=1 image=$T_MODULE_ADMINISTRATOR_TOOLS_BASELINK|cat:'images/tools.png'}
  {eF_template_printBlock tabber = "global_settings" title = $smarty.const._MODULE_ADMINISTRATOR_TOOLS_GLOBALLESSONSETTINGS data = $smarty.capture.t_global_settings_code absoluteImagePath=1 image=$T_MODULE_ADMINISTRATOR_TOOLS_BASELINK|cat:'images/tools.png'}
  {eF_template_printBlock tabber = "sql" title = $smarty.const._MODULE_ADMINISTRATOR_TOOLS_SQLINTERFACE data = $smarty.capture.t_sql_code image='32x32/generic.png'}
  {eF_template_printBlock tabber = "set_course_lesson_users" title = $smarty.const._MODULE_ADMINISTRATOR_TOOLS_SETCOURSELESSONUSERSCODE data = $smarty.capture.t_set_course_users_code image='32x32/users.png'}
 </div>
{/capture}
{eF_template_printBlock title = $smarty.const._MODULE_ADMINISTRATOR_TOOLS data = $smarty.capture.t_administrator_tools_code absoluteImagePath=1 image=$T_MODULE_ADMINISTRATOR_TOOLS_BASELINK|cat:'images/tools.png'}

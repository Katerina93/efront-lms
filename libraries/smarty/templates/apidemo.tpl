{include file = "includes/header.tpl"}
{if !isset($T_OPTION)}
   {capture name='demo'}
        <tr><td class = "moduleCell" colspan="100%">
            {$T_ACTION_FORM.javascript}
            <form {$T_ACTION_FORM.attributes}>
                {$T_ACTION_FORM.hidden}
                <table class = "formElements" style = "width:100%;">
                    <tr>
                        <td class = "labelCell">{$T_ACTION_FORM.action.label}:&nbsp;</td>
                        <td class = "elementCell">{$T_ACTION_FORM.action.html}</td>
                    </tr>
                    {if $T_ACTION_FORM.action.error}
                        <tr><td></td><td class = "formError">{$T_ACTION_FORM.action.error}</td></tr>
                    {/if}
                    
                    {if $T_ACTION == 'login'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.password.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.password.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'efrontlogin'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'create_user'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.password.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.password.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.name.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.name.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.surname.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.surname.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.email.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.email.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.language.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.language.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'update_user'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.password.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.password.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.name.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.name.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.surname.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.surname.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.email.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.email.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'activate_user'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'deactivate_user'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'remove_user'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'lesson_to_user'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.lesson.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.lesson.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'lesson_from_user'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.lesson.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.lesson.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'user_lessons'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.login.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.login.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'lessons'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                    {elseif $T_ACTION == 'logout'}
                        <tr>
                            <td class = "labelCell">{$T_ACTION_FORM.token.label}:&nbsp;</td>
                            <td class = "elementCell">{$T_ACTION_FORM.token.html}</td>
                        </tr>
                    {/if}
                    
                    <tr><td></td><td class = "submitCell centerAlign">
                        {$T_ACTION_FORM.submit_action.html}
                    </td></tr>
                    <tr><td>&nbsp;</td></tr>
                    <tr>
                        <td class = "labelCell">{$T_ACTION_FORM.output.label}:&nbsp;</td>
                        <td class = "elementCell">{$T_ACTION_FORM.output.html}</td>
                    </tr>
                </table>
            </form>
        </td></tr>        
    {/capture}
    <table class = "leftAlign" width="100%">
        <tr> 
           <td class = "singleColumn" id = "singleColumn" colspan="100%">
                <table class = "singleColumnData">
                    {$smarty.capture.demo}
                </table>
            </td>
        </tr>
    </table>
{/if}
{include file = "includes/closing.tpl"}
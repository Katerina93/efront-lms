{if $T_SHOW_CONFIRMATION}
            {assign var = 't_show_side_menu' value = true}
                <table class = "testHeader">
                    <tr><td id = "testName">{$T_TEST_DATA->test.name}</td></tr>
                    <tr><td id = "testDescription">{$T_TEST_DATA->test.description}</td></tr>
                    <tr><td>
                            <table class = "testInfo">
                                <tr><td rowspan = "6" id = "testInfoImage"><img src = "images/32x32/tests.png" alt = "{$T_TEST_DATA->test.name}" title = "{$T_TEST_DATA->test.name}"/></td>
                                    <td id = "testInfoLabels"></td>
                                    <td></td></tr>
                                <tr><td>{$smarty.const._TESTDURATION}:&nbsp;</td>
                                    <td>
                                    {if $T_TEST_DATA->options.duration}
                                        {if $T_TEST_DATA->convertedDuration.hours}{$T_TEST_DATA->convertedDuration.hours}     {$smarty.const._HOURS}&nbsp;{/if}
                                        {if $T_TEST_DATA->convertedDuration.minutes}{$T_TEST_DATA->convertedDuration.minutes} {$smarty.const._MINUTES}&nbsp;{/if}
                                        {if $T_TEST_DATA->convertedDuration.seconds}{$T_TEST_DATA->convertedDuration.seconds} {$smarty.const._SECONDS}{/if}
                                    {else}
                                        {$smarty.const._UNLIMITED}
                                    {/if}
                                    </td></tr>
                                <tr><td>{$smarty.const._NUMOFQUESTIONS}:&nbsp;</td>
                                    <td>{$T_TEST_QUESTIONS_NUM}</td></tr>
                                <tr><td>{$smarty.const._QUESTIONSARESHOWN}:&nbsp;</td>
                                    <td>{if $T_TEST_DATA->options.onebyone}{$smarty.const._ONEBYONEQUESTIONS}{else}{$smarty.const._ALLTOGETHER}{/if}</td></tr>
                            {if $T_TEST_STATUS.status == 'incomplete' && $T_TEST_DATA->time.pause}
                                <tr><td>{$smarty.const._YOUPAUSEDTHISTESTON}:&nbsp;</td>
                                    <td>#filter:timestamp_time-{$T_TEST_DATA->time.pause}#</td></tr>
                            {else}
                                <tr><td>{$smarty.const._DONETIMESSOFAR}:&nbsp;</td>
                                    <td>{if $T_TEST_STATUS.timesDone}{$T_TEST_STATUS.timesDone}{else}0{/if}&nbsp;{$smarty.const._TIMES}</td></tr>
                                <tr><td>{if $T_TEST_STATUS.timesLeft !== false }{$smarty.const._YOUCANDOTHETEST}:&nbsp;</td>
                                    <td>{$T_TEST_STATUS.timesLeft}&nbsp;{$smarty.const._TIMESMORE}{/if}</td></tr>
                            {/if}
                            </table>
                        </td>
                    <tr><td id = "testProceed">
                    {if $T_TEST_STATUS.status == 'incomplete' && $T_TEST_DATA->time.pause}
                        <input class = "flatButton" type = "button" name = "submit_sure" value = "{$smarty.const._RESUMETEST}&nbsp;&raquo;" onclick = "javascript:location=location+'&resume=1'" />
                    {else}
                        <input class = "flatButton" type = "button" name = "submit_sure" value = "{$smarty.const._PROCEEDTOTEST}&nbsp;&raquo;" onclick = "javascript:location=location+'&confirm=1'" />
                    {/if}
                    </td></tr>
                </table>
{elseif $smarty.get.test_analysis}
            {assign var = 'title' value = "`$title`&nbsp;&raquo;&nbsp;<a class = 'titleLink' href = '`$smarty.server.PHP_SELF`?ctg=content&view_unit=`$smarty.get.view_unit`&test_analysis=1'>`$smarty.const._TESTANALYSISFORTEST` &quot;`$T_TEST_DATA->test.name`&quot;</a>"}

                <div class = "headerTools">
                    <span>
                        <img src = "images/16x16/arrow_left.png" alt = "{$smarty.const._VIEWSOLVEDTEST}" title = "{$smarty.const._VIEWSOLVEDTEST}">
                        <a href = "{$smarty.server.PHP_SELF}?ctg=content&view_unit={$smarty.get.view_unit}">{$smarty.const._VIEWSOLVEDTEST}</a>
                    </span>
                    {if $T_TEST_STATUS.testIds|@sizeof > 1}
                    <span>
                        <img src = "images/16x16/go_into.png" alt = "{$smarty.const._JUMPTOEXECUTION}" title = "{$smarty.const._JUMPTOEXECUTION}">
                        &nbsp;{$smarty.const._JUMPTOEXECUTION}
                        <select onchange = "location.toString().match(/show_solved_test/) ? location = location.toString().replace(/show_solved_test=\d+/, 'show_solved_test='+this.options[this.selectedIndex].value) : location = location + '&show_solved_test='+this.options[this.selectedIndex].value">
                            {if $smarty.get.show_solved_test}{assign var = "selected_test" value = $smarty.get.show_solved_test}{else}{assign var = "selected_test" value = $T_TEST_STATUS.lastTest}{/if}
                            {foreach name = "test_analysis_list" item = "item" key = "key" from = $T_TEST_STATUS.testIds}
                                <option value = "{$item}" {if $selected_test == $item}selected{/if}>#{$smarty.foreach.test_analysis_list.iteration} - #filter:timestamp_time-{$T_TEST_STATUS.timestamps[$key]}#</option>
                            {/foreach}
                        </select>
                    </span>
                    {/if}
                </div>
                <table class = "test_analysis">
                    <tr><td>{$T_CONTENT_ANALYSIS}</td></tr>
                    <tr><td><iframe id = "analysis_frame" frameborder = "no" src = "student.php?ctg=content&view_unit={$smarty.get.view_unit}&display_chart=1&selected_unit={$smarty.get.selected_unit}&test_analysis=1&show_solved_test={$smarty.get.show_solved_test}"></iframe></td></tr>
                </table>
{else}
        {if $T_TEST_STATUS.status == '' || $T_TEST_STATUS.status == 'incomplete'}
            {capture name = "test_footer"}
            <table class = "formElements" style = "width:100%">
                <tr><td colspan = "2">&nbsp;</td></tr>
                <tr><td colspan = "2" class = "submitCell" style = "text-align:center">{$T_TEST_FORM.submit_test.html}&nbsp;{$T_TEST_FORM.pause_test.html}</td></tr>
            </table>
            {/capture}
        {/if}
        {if !$T_NO_TEST}
            {$T_TEST_FORM.javascript}
            <form {$T_TEST_FORM.attributes}>
                {$T_TEST_FORM.hidden}
                {$T_TEST}
                {$smarty.capture.test_footer}
            </form>
        {/if}
{/if}
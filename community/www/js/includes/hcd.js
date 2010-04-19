function deleteBranch(el, id, fatherId) {
 var url = location.toString();
 parameters = {delete_branch:id, father_ID:fatherId, ajax:'branch', method: 'get'};
 ajaxRequest(el, url, parameters, onDeleteBranch);
}
function onDeleteBranch(el, response) {
 new Effect.Fade(el.up().up());
}

/****************************************************************************

* Auxilliary functions by Alistair Lattimore to simulate IE options disabled

* Website:  http://www.lattimore.id.au/

*****************************************************************************/
function restoreSelection(e) {
    Element.extend(e);
    if (e.options[e.selectedIndex].disabled) {
        e.selectedIndex = e.selIndex;
        return false;
    } else {
       e.selIndex = e.selectedIndex;
       return true;
    }
}
function emulateDisabledOptions(e) {
    Element.extend(e);
    var opSize = e.options.length;
    for (var i=0; i < opSize; i++) {
        if ( e.options[i].disabled) {
            e.options[i].style.color = "#BBA8AC";
        } else {
            e.options[i].style.color = 0;
        }
    }
}
// Auxilliary function to select the option of a selectElement with the specific value
// If the specified value is not found then false is returned
function selectOption(selectElement, value) {
    Element.extend(selectElement);
    var length = selectElement.options.length;
    for (i = 0; i < length; i++) {
        if (selectElement.options[i].value == value) {
             selectElement.options[i].selected = true;
             selectElement.selIndex = i;
             return true;
        }
    }
    return false;
}

//Function for printing in IE6
//Opens a new popup, set its innerHTML like the content we want to print
//then calls window.print and then closes the popup without the user knowing
function printPartOfPage(elementId)
{
 var printContent = document.getElementById(elementId);
 var windowUrl = 'about:blank';
 var uniqueName = new Date();
 var windowName = 'Print' + uniqueName.getTime();
 var printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');
 printWindow.document.write("<link rel = \"stylesheet\" type = \"text/css\" href = \"css/css_global.php\" />");
 printWindow.document.write(printContent.innerHTML);
 printWindow.document.close();
 printWindow.focus();
 printWindow.print();
 printWindow.close();
}

//REPORTS: Refreshes the results table according to a new url based on the form values of the reports and the other select criteria
function refreshResults()
{
    var cut = location.href.split("?");

    if (document.getElementById('new_login').value ||document.getElementById('name').value ||document.getElementById('surname').value ||document.getElementById('email').value ||document.getElementById('user_type').value||document.getElementById('registration').value||document.getElementById('father').value ||document.getElementById('sex').value ||document.getElementById('birthday').value||document.getElementById('birthplace').value||document.getElementById('birthcountry').value||document.getElementById('mother_tongue').value||document.getElementById('nationality').value ||document.getElementById('address').value ||document.getElementById('city').value ||document.getElementById('country').value ||document.getElementById('homephone').value ||document.getElementById('mobilephone').value||document.getElementById('office').value ||document.getElementById('company_internal_phone').value ||document.getElementById('afm').value||document.getElementById('doy').value ||document.getElementById('police_id_number').value ||document.getElementById('work_permission_data').value||document.getElementById('employement_type').value ||document.getElementById('hired_on').value ||document.getElementById('left_on').value ||document.getElementById('wage').value ||document.getElementById('marital_status').value ||document.getElementById('bank').value ||document.getElementById('bank_account').value ||document.getElementById('way_of_working').value ) {
        newUrl = cut[0] +"?ctg=module_hcd&op=reports&search=1&all=" + document.getElementById('all_criteria').checked + "&branch_ID=" + document.getElementById('search_branch').value + "&include_sb="+document.getElementById('include_subbranchesId').checked + "&job_description_ID=" + document.getElementById('search_job_description').value + "&skill_ID=" + document.getElementById('search_skill').value + "&new_login=" + document.getElementById('new_login').value+ "&name=" + document.getElementById('name').value + "&surname=" + document.getElementById('surname').value+ "&email=" + document.getElementById('email').value + "&user_type=" + document.getElementById('user_type').value+ "&registration=" + document.getElementById('registration').value+ "&father=" + document.getElementById('father').value + "&sex=" + document.getElementById('sex').value+ "&birthday=" + document.getElementById('birthday').value + "&birthplace=" + document.getElementById('birthplace').value+ "&birthcountry=" + document.getElementById('birthcountry').value + "&mother_tongue=" + document.getElementById('mother_tongue').value+ "&nationality=" + document.getElementById('nationality').value + "&address=" + document.getElementById('address').value+ "&city=" + document.getElementById('city').value + "&country=" + document.getElementById('country').value+ "&homephone=" + document.getElementById('homephone').value + "&mobilephone=" + document.getElementById('mobilephone').value + "&office=" + document.getElementById('office').value+ "&company_internal_phone=" + document.getElementById('company_internal_phone').value + "&afm=" + document.getElementById('afm').value + "&doy=" + document.getElementById('doy').value + "&police_id_number=" + document.getElementById('police_id_number').value+ "&work_permission_data=" + document.getElementById('work_permission_data').value+ "&employement_type=" + document.getElementById('employement_type').value+ "&hired_on=" + document.getElementById('hired_on').value + "&left_on=" + document.getElementById('left_on').value + "&wage=" + document.getElementById('wage').value+ "&marital_status=" + document.getElementById('marital_status').value+ "&bank=" + document.getElementById('bank').value + "&bank_account=" + document.getElementById('bank_account').value + "&way_of_working=" + document.getElementById('way_of_working').value;
    } else {
        newUrl = cut[0] +"?ctg=module_hcd&op=reports&search=1&all=" + document.getElementById('all_criteria').checked + "&branch_ID=" + document.getElementById('search_branch').value + "&include_sb="+document.getElementById('include_subbranchesId').checked + "&job_description_ID=" + document.getElementById('search_job_description').value + "&skill_ID=" + document.getElementById('search_skill').value;
    }

    if (document.getElementById('driving_licence').checked) {
        newUrl += "&driving_licence=" + document.getElementById('driving_licence').value;
    }
    if (document.getElementById('national_service_completed').checked) {
        newUrl += "&national_service_completed=" + document.getElementById('national_service_completed').value;
    }
    if (document.getElementById('transport').checked) {
        newUrl += "&transport=" + document.getElementById('transport').value;
    }
    if (document.getElementById('active').checked) {
        newUrl += "&active=" + document.getElementById('active').value;
    }

    var i = 0;
    var other_skills_to_return = "";

 while (i++ < __criteria_total_number) {
  //alert(__criteria_total_number);
  if ($('search_skill_'+ i) && $('search_skill_'+ i).value != "0") {
  //alert(i + " of " + __criteria_total_number + " " + $('search_skill_'+ i).value); 
   if (other_skills_to_return == "") {
    other_skills_to_return = $('search_skill_'+ i).value;
   } else {
    other_skills_to_return += "_" + $('search_skill_'+ i).value;
   }
  }

 }
 //alert("sto telos " + other_skills_to_return); 
 if (other_skills_to_return != "") {
  newUrl += "&other_skills=" + other_skills_to_return;
 }

    // Update all form tables
    var tables = sortedTables.size();

    for (i = 0; i < tables; i++) {
        ajaxUrl[i] = newUrl + "&";
        if (sortedTables[i].id == 'foundEmployees') {
            eF_js_rebuildTable(i, 0, 'null', 'desc');
        }
    }
    //location.href = newUrl;
}

//Function used as a wrapper function for refreshing or not results
//in the search employee form, in order to include subbranches:
//If no branch is selected then no refresh of the ajax table is going to take place
function includeSubbranches() {
 if (document.getElementById('search_branch').value != "0") {
     refreshResults();
 }
}

//Function used as a wrapper function for refreshing or not results
//in the search employee form, in order to include subbranches:
//If no branch is selected then no refresh of the ajax table is going to take place
function setAdvancedCriterion(el) {
 refreshResults();
 Element.extend(el);
//kkkkkkkkkkkkkkkkkkkkkkkkkkk
 var img_id = 'img_'+ el.id;
 var img_position = eF_js_findPos(el);
 var img = document.createElement("img");

 img.style.position = 'absolute';
 img.style.top = Element.positionedOffset(Element.extend(el)).top + 'px';
 img.style.left = Element.positionedOffset(Element.extend(el)).left + 6 + Element.getDimensions(Element.extend(el)).width + 'px';

 img.setAttribute("id", img_id);
 img.setAttribute('src', 'themes/default/images/others/transparent.png');
 img.addClassName('sprite16 sprite16-success');

 el.parentNode.appendChild(img);
 img.style.display = 'none';

 new Effect.Appear(img_id);
 window.setTimeout('Effect.Fade("'+img_id+'")', 2500);
}

//Expands/collapses the branches tree based on a tree attribute called expanded
function expandCollapse(id) {
 var status = document.getElementById(id).collapsed;

 // Status = 0 means that the tree was originally collapsed
 if (status) {
     treeObj.expandAll();
     document.getElementById(id).collapsed = false;
 } else {
     treeObj.collapseAll();
     document.getElementById(id).collapsed = true;
 }


}

//Shows and hides the specification text boxes
function show_hide_spec(i)
{
 var spec = document.getElementById("spec_skill_" + i);
 if (spec.style.visibility == "hidden")
     spec.style.visibility = "visible";
 else
     spec.style.visibility = "hidden";
}

function show_hide_job_selects(i)
{
 var spec_job = document.getElementById("job_selection_row" + i);
 var spec_pos = document.getElementById("position_select_row" + i);
 if (spec_job.style.visibility == "hidden") {
     spec_job.style.visibility = "visible";
     spec_pos.style.visibility = "visible";
 } else {

     spec_job.style.visibility = "hidden";
     spec_pos.style.visibility = "hidden";
 }
}


//Shows and hides the lense next to the select of a branch
function change_branch(element,link, forbidden_link)
{

 var fb = document.getElementById(element).value;
 var flink = document.getElementById(link);
 if (fb == 0 || fb == "all" || fb == forbidden_link)
     flink.style.visibility = "hidden";
 else {
     flink.style.visibility = "visible";
     var main_url = flink.href.split("?");
     flink.href = main_url[0] + "?ctg=module_hcd&op=branches&edit_branch=" + fb;
 }

 return true;
}

//Shows and hides the lense next to the select of a branch
function change_skill_category(element)
{
//change_skill_category
 var skill_cat_ID = document.getElementById(element).value;
 var edit_link = document.getElementById('edit_skill_cat');
 var del_link = document.getElementById('del_skill_cat');
 if (skill_cat_ID == "" || skill_cat_ID == 0) {
     edit_link.style.visibility = "hidden";
     del_link.style.visibility = "hidden";
 } else {
     edit_link.style.visibility = "visible";
     del_link.style.visibility = "visible";
     var main_url = edit_link.href.split("?");
     edit_link.href = main_url[0] + "?ctg=module_hcd&op=skill_cat&edit_skill_cat=" + skill_cat_ID;
     del_link.href = main_url[0] + "?ctg=module_hcd&op=skill_cat&del_skill_cat=" + skill_cat_ID;
 }

 return true;
}

function activate(el, user) {
    Element.extend(el);
    if (el.down().src.match('red')) {
        url = sessionType + '.php?ctg=users&activate_user='+user;
        newSource = 'images/16x16/trafficlight_green.png';
  imageText = deactivateConst;
    } else {
        url = sessionType + '.php?ctg=users&deactivate_user='+user;
        newSource = 'images/16x16/trafficlight_red.png';
  imageText = activateConst;
    }

    var img = new Element('img', {id: 'img_'+user, src:'images/others/progress1.gif'}).setStyle({position:'absolute'});
    el.getOffsetParent().insert(img);
    el.down().src = 'images/16x16/trafficlight_yellow.png';
    new Ajax.Request(url, {
        method:'get',
        asynchronous:true,
        onSuccess: function (transport) {
            img.setStyle({display:'none'});
            el.down().src = newSource;
   el.down().title = imageText;
            new Effect.Appear(el.down(), {queue:'end'});

            if (el.down().src.match('green')) {
                // When activated
                $('column_'+user).innerHTML = '<a href = "' + sessionType+ '.php?ctg=users&edit_user='+user+'" class = "editLink">'+user+'</a>';

                var cName = $('row_'+user).className.split(" ");
                $('row_'+user).className = cName[0];
            } else {
                $('column_'+user).innerHTML = user;
                $('row_'+user).className += " deactivatedTableElement";
            }

            }
        });
}



 // Wrapper function for any of the 2-3 points where Ajax is used in the module personal
 function branchJobsAjaxPost(id, el, table_id) {
     Element.extend(el);

     if (table_id == "lessonsTable") {
      ajaxBranchLessonPost(id, el, table_id);
      return;
     } else if (table_id == "coursesTable") {
      ajaxBranchCoursePost(id, el, table_id);
      return;
     }
     var baseUrl = sessionType + '.php?ctg=module_hcd&op=branches&edit_branch='+editBranch+'&postAjaxRequest=1';
     if (id) {
         var default_position_n_job = document.getElementById('position_select_' +id).name;

         if (default_position_n_job != "_") {
             var pos = default_position_n_job.split("_");
             var job = pos[0];
             var position = pos[1];
         } else {
             var position = "";
             var job = "";
         }

         var url = baseUrl + '&add_employee=' + document.getElementById('job_selection_'+id).name + '&add_job=' + encodeURI(document.getElementById('job_selection_'+id).value) + '&add_position=' + document.getElementById('position_select_' +id).value + '&default_job=' + encodeURI(job) + '&default_position=' + position + '&insert='+document.getElementById('check_'+id).checked;

         if (document.getElementById('check_'+id).checked) {

             job = document.getElementById('job_selection_'+id).value ;

             position = document.getElementById('position_select_'+id).value ;

             document.getElementById('position_select_' +id).name = job + "_" + position;
             document.getElementById('none_job_' +id).innerHTML = job;
             document.getElementById('none_position_' +id).innerHTML = position;
         } else {
             document.getElementById('position_select_' +id).name = "_";
             document.getElementById('none_job_' +id).innerHTML = "";
             document.getElementById('none_position_' +id).innerHTML = "";
             document.getElementById('none_check_' +id).innerHTML = "0";

         }
         var img_id = 'img_'+ id;
     } else if (table_id && table_id == 'branchJobsTable') {
         el.checked ? url = baseUrl + '&addAll=1' : url = baseUrl + '&removeAll=1';
         if ($(table_id+'_currentFilter')) {
          url = url+'&filter='+$(table_id+'_currentFilter').innerHTML;
         }
         var img_id = 'img_selectAll';
        var massive_operation = 1;

     } else {
         return false;
     }


  parameters = {method: 'get'};
  ajaxRequest(el, url, parameters, function (el, transport) { // on Success
                 // Update all form tables
                 var tables = sortedTables.size();
                 var i;
                 for (i = 0; i < tables; i++) {
                     if (sortedTables[i].id == 'branchUsersTable') {
                         eF_js_rebuildTable(i, 0, 'null', 'desc');
                     }

                 }


                 if (massive_operation) {

                     var all_inputs = $('branchJobsTable').getElementsByTagName('input');
                     for (i = 0; i<all_inputs.length; i++) {
                      // Check according to the naming convention for check boxes
                      if (all_inputs[i].id.match("check_row")) {
              show_hide_job_selects(all_inputs[i].id.substr(9)); // strlen('check_row') = 9
                      }
                     }
                 }


             },// on failure
             function (el, transport) {
                       // Administrators do not get job descriptions assigned
                          img.hide();
                          img.writeAttribute({src:'images/16x16/error_delete.png', title: transport.responseText}).hide();
                          img.onclick = function () {alert(transport.responseText);};
                          new Effect.Appear(img_id);
                          show_hide_job_selects(el.id.substr(9)); // strlen('check_row') = 9
                          el.checked = false;
             }
         );
 //    var position = eF_js_findPos(el);
 //    var img      = document.createElement("img");
 //
 //    img.style.position = 'absolute';
 //    img.style.top      = Element.positionedOffset(Element.extend(el)).top  + 'px';
 //    img.style.left     = Element.positionedOffset(Element.extend(el)).left + 6 + Element.getDimensions(Element.extend(el)).width + 'px';
 //
 //    img.setAttribute("id", img_id);
 //    img.setAttribute('src', 'images/others/progress1.gif');
 //
 //    el.parentNode.appendChild(img);
 //      new Ajax.Request(url, {
 //                method:'get',
 //                asynchronous:true,
 //                onFailure: function (transport) {
 //                	// Administrators do not get job descriptions assigned
 //                    img.hide();
 //                    img.writeAttribute({src:'images/16x16/error_delete.png', title: transport.responseText}).hide();
 //                    img.onclick = function () {alert(transport.responseText);};
 //                    new Effect.Appear(img_id);
 //                    show_hide_job_selects(el.id.substr(9));	// strlen('check_row') = 9
 //                    el.checked = false;
 //                },
 //                onSuccess: function (transport) {
 //
 //                    // Update all form tables
 //                    var tables = sortedTables.size();
 //                    var i;
 //                    for (i = 0; i < tables; i++) {
 //                        if (sortedTables[i].id == 'branchUsersTable') {
 //                            eF_js_rebuildTable(i, 0, 'null', 'desc');
 //                        }
 //                        
 //                        // Used to correct the not appearing selects
 //                        //if (massive_operation && sortedTables[i].id == 'branchJobsTable') {
 //                        //  eF_js_rebuildTable(i, 0, 'null', 'desc');
 //                        //}                                    
 //                    }
 //                    
 //                    
 //                    if (massive_operation) {
 //                    
 //                        var all_inputs = $('branchJobsTable').getElementsByTagName('input');
 //                        for (i = 0; i<all_inputs.length; i++) {
 //                        	// Check according to the naming convention for check boxes
 //                        	if (all_inputs[i].id.match("check_row")) {
 //								show_hide_job_selects(all_inputs[i].id.substr(9));	// strlen('check_row') = 9
 //                        	}
 //                        }
 //                    }
 //                    
 //
 //                    img.style.display = 'none';
 //                    img.setAttribute('src', 'images/16x16/success.png');
 //                    new Effect.Appear(img_id);
 //
 //                    window.setTimeout('Effect.Fade("'+img_id+'")', 2500);
 //
 //                }
 //            });

 }


var _showingAllEmployees = 0;
function ajaxShowAllSubbranches() {
 if (_showingAllEmployees) {
  prev = 1;
  _showingAllEmployees = 0;
  $('andSubbranchesTitle').style.visibility = "hidden";
 } else {
  prev = 0;
  _showingAllEmployees = 1;
  $('andSubbranchesTitle').style.visibility = "visible";
 }

    // Update all form tables
    var tables = sortedTables.size();
    var i;
    for (i = 0; i < tables; i++) {
        if (sortedTables[i].id == 'branchUsersTable' && ajaxUrl[i]) {
         ajaxUrl[i] = ajaxUrl[i].replace("&showAllEmployees=" + prev, "&showAllEmployees=" + _showingAllEmployees);
            eF_js_rebuildTable(i, 0, 'null', 'desc');
        }
    }
}


 // Wrapper function for any of the 2-3 points where Ajax is used in the module personal
 function skillEmployeesAjaxPost(id, el, table_id) {
     table_id == 'skillEmployeesTable' ? ajaxSkillUserPost(1, id, el, table_id) : usersAjaxPost(id, el, table_id);
 }

 // type: 1 - inserting/deleting the skill to an employee | 2 - changing the specification
 // id: the users_login of the employee to get the skill
 // el: the element of the form corresponding to that skill/lesson
 // table_id: the id of the ajax-enabled table
 function ajaxSkillUserPost(type, id, el, table_id) {
     Element.extend(el);

     var baseUrl = sessionType + '.php?ctg=module_hcd&op=skills&edit_skill='+editSkill+'&postAjaxRequest=1';
     if (type == 1) {
         if (id) {
             var url = baseUrl + '&add_user=' + id + '&insert='+el.checked + '&specification='+document.getElementById('spec_skill_'+id).value;
             var img_id = 'img_'+ id;
         } else if (table_id && table_id == 'skillEmployeesTable') {
             el.checked ? url = baseUrl + '&addAll=1' : url = baseUrl + '&removeAll=1';
             if ($(table_id+'_currentFilter')) {
              url = url+'&filter='+$(table_id+'_currentFilter').innerHTML;
             }
             var img_id = 'img_selectAll';
         }
     } else if (type == 2) {
         if (id) {
             var url = baseUrl + '&add_user=' + id + '&insert=true&specification='+el.value;
             var img_id = 'img_'+ id;
         }
     } else {
         return false;
     }

  parameters = {method: 'get'};
  ajaxRequest(el, url, parameters, function (el, transport) {
                  // Update the main form table
                  var tables = sortedTables.size();
                  var i;
                  for (i = 0; i < tables; i++) {
                      if (sortedTables[i].id == 'usersSkillsTable') {
                          eF_js_rebuildTable(i, 0, 'null', 'desc');
                      }
                  }
         });

 }



 function globalAjaxPost(id, el, table_id) {
     Element.extend(el);

     var type;

     if (table_id && table_id == 'skillsTable') {
         type = "skill";
     } else if (table_id && table_id == 'lessonsTable') {
         type = "lesson";
     } else if (table_id && table_id == 'coursesTable') {
         type = "course";
     } else {
         type = el.name;
     }

     if (type == "skill" || type == "lesson" || type == "course") {
         var baseUrl = sessionType + '.php?ctg=module_hcd&op=job_descriptions&edit_job_description='+editJobDescription+'&postAjaxRequest=1&'+type+'=1&apply_to_all_jd=' + document.getElementById(type + '_changes_apply_to').checked;

         if (id) {
             var checked = $(type+'_'+id).checked;
             var url = baseUrl + '&add_'+type+'ID=' + id + '&insert='+checked;
             var img_id = 'img_'+ id;
         } else if (table_id && table_id == 'skillsTable') {
             el.checked ? url = baseUrl + '&addAll=1' : url = baseUrl + '&removeAll=1';
             var img_id = 'img_selectAll';
         } else if (table_id && table_id == 'lessonsTable') {
             el.checked ? url = baseUrl + '&addAll=1' : url = baseUrl + '&removeAll=1';
             var img_id = 'img_selectAll';
         } else if (table_id && table_id == 'coursesTable') {
             el.checked ? url = baseUrl + '&addAll=1' : url = baseUrl + '&removeAll=1';
             var img_id = 'img_selectAll';
         }
         if ($(table_id+'_currentFilter')) {
          url = url+'&filter='+$(table_id+'_currentFilter').innerHTML;
         }



      parameters = {method: 'get'};
      ajaxRequest(el, url, parameters);

 //        var position = eF_js_findPos(el);
 //        var img      = document.createElement("img");
 //
 //        img.style.position = 'absolute';
 //        img.style.top      = Element.positionedOffset(Element.extend(el)).top  + 'px';
 //        img.style.left     = Element.positionedOffset(Element.extend(el)).left + 6 + Element.getDimensions(Element.extend(el)).width + 'px';
 //
 //        img.setAttribute("id", img_id);
 //        img.setAttribute('src', 'images/others/progress1.gif');
 //
 //        el.parentNode.appendChild(img);
 //
 //            new Ajax.Request(url, {
 //                    method:'get',
 //                    asynchronous:true,
 //                    onSuccess: function (transport) {
 //                        img.style.display = 'none';
 //                        img.setAttribute('src', 'images/16x16/success.png');
 //                        new Effect.Appear(img_id);
 //                        window.setTimeout('Effect.Fade("'+img_id+'")', 2500);
 //                        }
 //                });
     } else {
         return false;
     }

 }


function applyToAllJobDescriptionsInfo(el, jobDescription) {
 if (el.checked) {
  newValue = "checked";
  alert(futureAssignmentsWill + jobDescription);
 } else {
  newValue = "";
  alert(futureAssignmentsWillNot + jobDescription);
 }
 $('skill_changes_apply_to').checked = newValue;
 $('lesson_changes_apply_to').checked = newValue;
 $('course_changes_apply_to').checked = newValue;
}

var __criteria_total_number = 0;

// Function for inserting the new job row into the edit_user profile
// The row argument denotes how many placements were initially present
// so that only one extra job may be inserted each time
function add_new_criterium_row(row) {

    var table = document.getElementById('criteriaTable');

    noOfRows = table.rows.length;

    var row = noOfRows;
    var x = table.insertRow(row);

    row = (++__criteria_total_number);
    x.setAttribute("id","row_"+row);
    newCell = x.insertCell(0);
    //    $form -> addElement('select', 'search_skill_template' , null, $skills_list ,'id="search_skill_row" onchange="javascript:refreshResults();"');

    var newCellHTML = searchSkillTemplate;

    // Replacing the "row" strings of the HTML code of the select to the correct row. For example the onclick="change(row)" will become onclick="change(2)"
    newCellHTML = newCellHTML.replace('row', row);
    newCellHTML = newCellHTML.replace('row', row);

    //newCell.innerHTML= '<table><tr><td>'+newCellHTML+'</td></td<td align="right"><a id="courses_details_link_'+row+'" name="courses_details_link" style="visibility:hidden"><img src="images/16x16/search.png" title="'+detailsConst+'" alt="'+detailsConst+'" border="0" /></a></td></tr></table>';
 newCell.innerHTML= newCellHTML;

    newCell = x.insertCell(1);
    newCell.setAttribute("align", "center");

    newCell.innerHTML = '<a id="job_'+row+'" href="javascript:void(0);" onclick="delete_criterium_row(\''+row+'\', this);" class = "deleteLink"><img class="sprite16 sprite16-error_delete handle" src = "themes/default/images/others/transparent.png" alt = "'+deleteConst+'" title= "'+deleteConst+'"/></a></td>';
    document.getElementById('job_' + row).setAttribute('rowCount', row);


}

//delete row
function delete_criterium_row(id, el)
{
    var criteriaTable = document.getElementById('criteriaTable');

    noOfRows = criteriaTable.rows.length;
    var rowId;
    for (i = 0; i < noOfRows; i++) {
        rowId = "row_"+id;
        if (criteriaTable.rows[i].id == rowId) {
            // el.up.up.id has the form 'row_'*
            //deleteInHidden(rowId);
            criteriaTable.deleteRow(i);
            break;
        }
    }

 refreshResults();
    // If no job descriptions remain then show the "No jobs assigned" message
    /*

    if (criteriaTable.rows.length == 1) {

        var x = criteriaTable.insertRow(1);

        var newCell = x.insertCell(0);

        var newCellHTML = noSearchCriteriaConst;' // @TODO: define noSearchCriteriaConst in module_hcd.tpl

        newCell.innerHTML= newCellHTML;

        newCell.setAttribute("id", "no_criteria_found");

        newCell.colSpan = 5;

        newCell.className = "emptyCategory";

    }

    */
    return false;
}
//Used to associate branches to lessons
function onBranchLessonAssignment(el, response) {
 //$('participation' + el.name).innerHTML = parseInt($('participation' + el.name).innerHTML) + parseInt(response); 
//    var tables = sortedTables.size();
//
//    for (i = 0; i < tables; i++) {
//        if (sortedTables[i].id == 'lessonsTable') {
//            eF_js_rebuildTable(i, 0, 'null', 'desc');
//        }
//    }
}
function ajaxBranchLessonPost(id, el, table_id) {
 var url = location.toString();
 var parameters = {postAjaxRequest:1, method: 'get'};
    if (id) {
     Object.extend(parameters, {add_lesson: id, insert: el.checked});
    } else if (table_id && table_id == 'lessonsTable') {
        el.checked ? Object.extend(parameters, {add_lesson:1, addAll: 1}) : Object.extend(parameters, {add_lesson:1, removeAll: 1});
        if ($(table_id+'_currentFilter')) {
         Object.extend(parameters, {filter: $(table_id+'_currentFilter').innerHTML});
        }
    }
 ajaxRequest(el, url, parameters, onBranchLessonAssignment);
}
function ajaxBranchCoursePost(id, el, table_id) {
 var url = location.toString();
 var parameters = {postAjaxRequest:1, method: 'get'};
    if (id) {
     Object.extend(parameters, {add_course: id, insert: el.checked});
    } else if (table_id && table_id == 'coursesTable') {
        el.checked ? Object.extend(parameters, {add_course:1, addAll: 1}) : Object.extend(parameters, {add_course:1, removeAll: 1});
        if ($(table_id+'_currentFilter')) {
         Object.extend(parameters, {filter: $(table_id+'_currentFilter').innerHTML});
        }
    }
 ajaxRequest(el, url, parameters);//, onBranchCourseAssignment);
}
function ajaxPost(id, el, table_id) {
 if ($('branchJobsTable')) {
  branchJobsAjaxPost(id, el, table_id);
 } else if ($('skillEmployeesTable')) {
  skillEmployeesAjaxPost(id, el, table_id);
 } else if ($('skillsTable') || (!$('branchJobsTable') && ($('lessonsTable') || $('coursesTable')))) {
  globalAjaxPost(id, el, table_id);
 }
}

<?php

/**
 * Represents a training report.
 */
class TrainingReports_Report {

    private $report = null;
    private $name = null;
    private $from = null;
    private $to = null;
    private $separatedBy = null;
    private $fields = array();
    private $courses = array();

    /**
     * Constructor
     *
     * @param integer $id The id of the report
     */
    public function __construct($id = null) {

        if ($id != null) {
            $report = eF_getTableData('module_time_reports', '*', 'id=' . $id);
            $this->report = $report[0];

            $this->name = $this->report['name'];
            $this->from = $this->report['from_date'];
            $this->to = $this->report['to_date'];
            $this->separatedBy = $this->report['separated_by'];

            $results = eF_getTableDataFlat('module_time_reports_fields', 'name', 'reports_ID=' . $id, 'position');
            if (sizeof($results) > 0) {
                $this->fields = $results['name'];
            }

            $results = eF_getTableDataFlat('module_time_reports_courses', 'courses_ID', 'reports_ID=' . $id);
            if (sizeof($results) > 0) {
                $this->courses = $results['courses_ID'];
            }
        }
    }

    /**
     * Returns weather a report is valid or not.
     * 
     * @param integer $id The id of the report
     * @return boolean true if valid false otherwise
     */
    public static function isValid($id) {
        $isValid = false;

        if (is_numeric($id)) {
            $reports = eF_getTableData('module_time_reports', 'id', 'id=' . $id);
            $isValid = (count($reports) == 1);
        }

        return $isValid;
    }

    /**
     * Returns the basic data of a report.
     * @return array
     */
    public function getReport() {
        return $this->report;
    }

    /**
     * Returns the name of the report
     * 
     * @return string The name of the report
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Returns the fields of the report
     * 
     * @return array The fields of the report
     */
    public function getFields() {
        return $this->fields;
    }

    /**
     * Returns the courses of the report
     * 
     * @return array The courses of the report
     */
    public function getCourses() {
        return $this->courses;
    }

    /**
     * Returns the from timestamp.
     *
     * @return integer
     */
    public function getFromTimestamp() {
        return $this->from;
    }

    /**
     * Sets the from timestamp.
     *
     * @param integer $from
     */
    public function setFromTimestamp($from) {
        $this->from = $from;
    }

    /**
     * Returns the to timestamp.
     *
     * @return integer
     */
    public function getToTimestamp() {
        return $this->to;
    }

    /**
     * Sets the to timestamp.
     * 
     * @param integer $to
     */
    public function setToTimestamp($to) {
        $this->to = $to;
    }

    /**
     * Returns the period's separator.
     * 
     * @return string one of 'week', 'fortnight', 'month'
     */
    public function getSeparatedBy() {
        return $this->separatedBy;
    }

    /**
     * Sets the period's separator.
     * 
     * @param string $separatedBy
     */
    public function setSeparatedBy($separatedBy) {
        $this->separatedBy = $separatedBy;
    }

    /**
     * Returns the avaible fields to select from for a report.
     * 
     * @return array
     */
    public static function getFieldsOptions() {

        $standardOptions = array(
            'name' => _NAME,
            'surname' => _SURNAME,
            'email' => _EMAIL,
            'login' => _LOGIN,
            'timestamp' => _TRAININGREPORTS_REGISTERED,
            'completed' => _TRAININGREPORTS_ALLCOMPLETED,
            'last_login' => _LASTLOGIN);

        $results = eF_getTableDataFlat('user_profile', 'name, description');

        if (sizeof($results) > 0) {
            $extendedOptions = array_combine($results['name'], $results['description']);
            $fieldOptions = array_merge($standardOptions, $extendedOptions);
        } else {
            $fieldOptions = $standardOptions;
        }

        return $fieldOptions;
    }

    /**
     * Returns an array of courses Ids from which to select from.
     * 
     * @return array
     */
    public static function getCoursesOptions() {

        $courses = eF_getTableDataFlat('courses', 'id, name');
        $courseOptions = array_combine($courses['id'], $courses['name']);

        return $courseOptions;
    }

    /**
     * Returns an array of the availabe period separators.
     * 
     * @return array
     */
    public static function getPeriodsOptions() {

        $periodOptions = array(
            'week' => _TRAININGREPORTS_WEEKS,
            'fortnight' => _TRAININGREPORTS_FORTNIGHTS,
            'month' => _TRAININGREPORTS_MONTHS);

        return $periodOptions;
    }

    /**
     * Return the user data.
     * 
     * @return array
     */
    public function getUserData() {

        $usersData = array();

        if (sizeof($this->courses) == 0) {
            return $usersData;
        }

        $users = $this->getUsers();

        foreach ($users as $user) {
            $login = $user['login'];
            $courses = $this->getUserCourses($login);

            $countCompleted = 0;

            $coursesData = array();
            foreach ($courses as $course) {
                $course['completed'] = ($course['completed'] == 1 && $course['to_timestamp'] < $this->to);

                if ($course['completed']) {
                    $countCompleted++;
                }

                $coursesData[$course['courses_ID']] = $course;
            }

            $user['last_login'] = $this->getUserLastLogin($login);
            $user['completed'] = ($countCompleted == sizeof(array_unique($this->courses)));
            $user['courses'] = $coursesData;
            $usersData[] = $user;
        }

        return $usersData;
    }

    private function getUsers() {

        $users = array();

        if (sizeof($this->courses) == 0) {
            return $users;
        }

        $usersTableFields = eF_getTableFields('users');
        $usersFields = array_intersect($this->fields, $usersTableFields);

        if (in_array('login', $usersFields) == false) {
            $usersFields[] = 'login';
        }

        $where = "
        active = 1 AND
        login IN (
            SELECT users_LOGIN
            FROM users_to_courses
            WHERE
                courses_ID IN (" . implode(',', $this->courses) . ")
                AND
                user_type = 'student'
                AND
                (
                    ( completed = 1 AND to_timestamp <= $this->to )
                    OR
                    ( from_timestamp <= $this->to )
                )
        )";

        $users = eF_getTableData('users', implode(',', $usersFields), $where);

        return $users;
    }

    private function getUserCourses($login) {

        $fields = 'courses_ID, from_timestamp, to_timestamp, completed';
        $where = 'users_LOGIN =\'' . $login . '\' AND courses_ID IN (' . implode(',', $this->courses) . ')';

        $results = eF_getTableData('users_to_courses', $fields, $where);

        return $results;
    }

    private function getUserLastLogin($login) {

        $where = 'users_LOGIN = "' . $login . '"';
        $fields = 'MAX(session_timestamp) AS last_login';

        $users = eF_getTableData('user_times', $fields, $where);

        return $users[0]['last_login'];
    }

    public function getPeriods() {

        $periods;

        switch ($this->separatedBy) {
            case 'week':
                $periods = $this->getPeriodsInWeeks();
                break;
            case 'fortnight':
                $periods = $this->getPeriodsInFortnights();
                break;
            case 'month':
                $periods = $this->getPeriodsInMonths();
                break;
        }

        return $periods;
    }

    private function getPeriodsInWeeks() {

        $periods = array();

        $start = strtotime('00:00', $this->from);
        $end = strtotime('23:59', $this->to);

        $periodStart = null;
        $periodEnd = null;

        while ($periodEnd < $end) {

            if ($periodStart == null) {
                $periodStart = $start;
            } else {
                $periodStart = strtotime('tomorrow', $periodEnd);
            }

            $periodEnd = strtotime('next Sunday 23:59', $periodStart);

            if ($periodEnd > $end) {
                $periodEnd = $end;
            }

            $periods[] = array(
                'title' => formatTimestamp($periodStart) . ' - ' . formatTimestamp($periodEnd),
                'start' => $periodStart,
                'end' => $periodEnd
            );
        }

        return $periods;
    }

    private function getPeriodsInFortnights() {
        $periods = array();

        $start = strtotime('00:00', $this->from);
        $end = strtotime('23:59', $this->to);

        $periodStart = null;
        $periodEnd = null;

        while ($periodEnd < $end) {

            if ($periodStart == null) {
                $periodStart = $start;
            } else {
                $periodStart = strtotime('tomorrow', $periodEnd);
            }

            $periodEnd = strtotime('next Sunday 23:59', $periodStart);
            $periodEnd = strtotime('next Sunday 23:59', $periodEnd);

            if ($periodEnd > $end) {
                $periodEnd = $end;
            }

            $periods[] = array(
                'title' => formatTimestamp($periodStart) . ' - ' . formatTimestamp($periodEnd),
                'start' => $periodStart,
                'end' => $periodEnd
            );
        }

        return $periods;
    }

    private function getPeriodsInMonths() {
        $periods = array();

        $start = strtotime('00:00', $this->from);
        $end = strtotime('23:59', $this->to);

        $periodStart = null;
        $periodEnd = null;

        while ($periodEnd < $end) {

            if ($periodStart == null) {
                $periodStart = $start;
            } else {
                $periodStart = strtotime('tomorrow', $periodEnd);
            }

            $periodEnd = strtotime('next month', $periodStart);
            $periodEnd = strtotime(date('Y-M-01', $periodEnd));
            $periodEnd = strtotime('yesterday 23:59', $periodEnd);

            if ($periodEnd > $end) {
                $periodEnd = $end;
            }

            $title = date('F', $periodStart);

            if (date('d', $periodStart) > 1) {
                $title .= ' ' . _FROM . ' ' . date('d', $periodStart);
            }

            if (date('d', strtotime('tomorrow', $periodEnd)) > 1) {
                $title .= ' ' . _TO . ' ' . date('d', $periodEnd);
            }

            $periods[] = array(
                'title' => $title,
                'start' => $periodStart,
                'end' => $periodEnd
            );
        }

        return $periods;
    }

}

?>

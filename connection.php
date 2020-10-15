<?php


ini_set('display_errors', 1);

$host = "mysql-fariz1999.alwaysdata.net";
$user = "fariz1999";
$password = "3151936Fz";
$db = "fariz1999_pw3";


mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
try {
    $link = mysqli_connect($host, $user, $password, $db);
    mysqli_set_charset($link, 'utf8');

    $query = "SELECT courses.course_date,courses.start_time,courses.end_time,courses.course_duration,classes.class_full_name,subjects.subject,professors.first_name,professors.last_name FROM courses JOIN classes USING (class_id) INNER JOIN professors ON (courses.professor_id = professors.professor_id) JOIN subjects USING (subject_id) WHERE courses.course_date BETWEEN '2019-04-01' AND '2019-06-30';";



    $result = mysqli_query($link, $query);
    $nbRows = mysqli_num_rows($result);
} catch (mysqli_sql_exception $e) {
    echo "MySQLi Error : Code " . $e->getCode() . " ,Expectation Msg : " . $e->getMessage() . "<br>";
    exit();
};


function renderTable()
{
    global $result;
    while ($var = mysqli_fetch_assoc($result)) {
        extract($var);
        echo "
            <tr>
                <td>$course_date</td>
                <td>$start_time</td>
                <td>$end_time</td>
                <td>$course_duration hours</td>
                <td>$class_full_name</td>
                <td>$subject</td>
                <td>$first_name $last_name</td>
            </tr>
        ";
    }
}

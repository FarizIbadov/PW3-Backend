<?php
include "./connection.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/style.css">
    <script src="./assets/app.js" defer></script>
    <title>Student Timetable</title>
</head>

<body>
    <div class="heading-container">
        <h1 class="heading">Student Timetable: <?php echo $nbRows ?></h1>
        <input id="search" type="text" placeholder="Search" class="heading-search">
    </div>
    <table id="student-timetable">
        <thead>
            <tr>
                <th>Date of course</th>
                <th>Starting at</th>
                <th>Ending at</th>
                <th>Course duration</th>
                <th>Class full name</th>
                <th>Subject</th>
                <th>Professor</th>
            </tr>
        </thead>
        <tbody>
            <?php renderTable() ?>
        </tbody>
    </table>
    <div class="footer-container">
        <select id="select" class="select">
            <option value="">Show entires</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
        </select>
        <div class="pagination" id="pagination"></div>
    </div>
</body>

</html>
<?php
// Database connection
$host = "localhost";
$username = "root"; // Default username in XAMPP
$password = ""; // Default password is empty
$dbname = "voting"; // Your database name

$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Capture form data and sanitize
$voting_id = htmlspecialchars($_POST['voting_id']);
$candidate_name = htmlspecialchars($_POST['candidate_name']);
$odd_number = (int)$_POST['odd_number']; // Casting to integer
$additional_info = htmlspecialchars($_POST['additional_info']);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO votings (`Voting ID`, `Candidate Name`, `Odd Number`, `Additional Info`) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssis", $voting_id, $candidate_name, $odd_number, $additional_info);

// Execute the query
if ($stmt->execute()) {
    // Redirect to success page after successful submission
    header("Location: success.php");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

// Close connection
$stmt->close();
$conn->close();
?>

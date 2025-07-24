<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "leadfree@dyfenco.com";  // 收件人 Email
    $subject = "Website Contact Form Message";

    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $message = htmlspecialchars($_POST["message"]);

    $body = "You have received a new message from the contact form:\n\n"
          . "Name: $name\n"
          . "Email: $email\n"
          . "Phone: $phone\n\n"
          . "Message:\n$message";

    $headers = "From: noreply@dyfenco.com\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Message sent successfully!'); window.location.href='contact-en.html';</script>";
    } else {
        echo "<script>alert('Failed to send message.'); window.history.back();</script>";
    }
}
?>

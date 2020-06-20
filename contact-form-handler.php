<?php
    $first_name = $_Post["firstName"];
    $last_name = $_Post["lastName"];
    $company_name = $_Post["companyName"];
    $phone_number = $_Post["phoneNumber"];
    $visitor_email = $_Post["visitorEmail"];
    $message = $_Post["message"];

    $email_from = "plunderin@gmail.com"

    $email_subject = "New Form Submission";

    $email_body = "User Name: $first_name $last_name.\n";
                    "User Company: $company_name.\n";
                    "User Phone Number: $phone_number.\n";
                    "User Email: $visitor_email.\n";
                        "User Message: $message.\n";
    
    $to = "alexdshafer@gmail.com";

    $headers = "From: $email_from \r\n";

    $headers = "Reply-to: $visitor_email \r\n";

    mail($to,$email_subject,$email_body,$headers);

    header("Location: contact.html")
?>
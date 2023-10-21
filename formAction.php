<?php

// require_once('inc/phpmailer/class.phpmailer.php');
require_once('inc/phpmailer/class.phpmailer.php');
require_once('inc/phpmailer/PHPMailerAutoload.php');

if (isset($_REQUEST['name']) && isset($_REQUEST['email']) && isset($_REQUEST['phone']) && isset($_REQUEST['message'])) {
    $name = filter_var($_REQUEST["name"], FILTER_SANITIZE_STRING);
    $email = filter_var($_REQUEST["email"], FILTER_SANITIZE_STRING);
    $phone = filter_var($_REQUEST["phone"], FILTER_SANITIZE_STRING);
    $message = filter_var($_REQUEST["message"], FILTER_SANITIZE_STRING);

    // Rvm.ca
    $servername = "localhost";
    $username = "rvmuser";
    $password = "rvm@123";
    $dbname = "rvm_ca";

    // RVM.in
    // $servername = "localhost";
    // $username = "rvmuser";
    // $password = "rvm@123";
    // $dbname = "rvm_main";

    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        echo failedBlock();
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "insert into contact_form (name, email, phone, message) values ('$name', '$email', '$phone', '$message')";
    if ($conn->query($sql) === TRUE) {
        // Send Mail
        $mail = new PHPMailer;
        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'sg2plcpnl0208.prod.sin2.secureserver.net';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'no-reply@rvmatrix.ca';              // SMTP username --- use .in for india
        $mail->Password = 'Hema@123';                    // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 465;                                    // TCP port to connect to

        // $mail->setFrom('no-reply@rvmatrix.in');
        $mail->setFrom('no-reply@rvmatrix.ca');
        $mail->addAddress($email, $name); // Add a recipient
        $mail->isHTML(true);

        $mail->Subject = 'Thank you for your Interest in RV Matrix';
        $mail->Body = '<p>Thank you for subscribing to RV Matrix.  Looking forward to Connect with you soon. Have a good day.</p><br/><br/><p style="margin:0;">Regards,</p><p style="margin:0;">HR team</p><p style="margin:0;">RV Matrix Software Technologies</p><p style="margin:0;">Canada</p>';
        if ($mail->send()) {
            echo successBlock();
        } else {
            echo failedBlock();
        }
    } else {
        echo failedBlock();
    }
} else {
    echo failedBlock();
}

function failedBlock()
{
    return <<<HTML
<html>
<head>
    <title>RV Matrix - Contact</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        body {
            background-color: #fff;
        }

        body, h1, p {
            font-family: "Helvetica Neue", "Segoe UI", Segoe, Helvetica, Arial, "Lucida Grande", sans-serif;
            font-weight: normal;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            margin-left:  auto;
            margin-right:  auto;
            margin-top: 177px;
            max-width: 1170px;
            padding-right: 15px;
            padding-left: 15px;
        }

        .row:before, .row:after {
            display: table;
            content: " ";
        }

        .col-md-6 {
            width: 50%;
        }

        .col-md-push-3 {
            margin-left: 25%;
        }

        h1 {
            font-size: 48px;
            font-weight: 300;
            margin: 0 0 20px 0;
        }

        .lead {
            font-size: 21px;
            font-weight: 200;
            margin-bottom: 20px;
        }

        p {
            margin: 0 0 10px;
        }

        a {
            color: #3282e6;
            text-decoration: none;
        }
    </style>


</head>

<body>
    <div class="container text-center" id="error">

        <div class="row">
            <div class="col-md-12">
                <div class="main-icon text-warning"><span class="uxicon uxicon-alert"></span></div>
                <h1>Something Went Wrong!</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-md-push-3">
                <p class="lead">Please Try again Later.</p>
            </div>
        </div>
    </div>
    <div>
        <p>You will be redirected back to the website in <span id="counter">5</span> <span id="counter1">seconds</span> </p>
    </div>
    <script>
        setInterval(function() {
                var div = document.querySelector("#counter");
                var count = div.textContent * 1 - 1;
                div.textContent = count;
    
                if (count == 1) {
                    var div1 = document.querySelector("#counter1");
                    div1.innerHTML = "second";
                }
    
                if (count <= 0) {
                    var count = 0;
                    window.location.href="/";
                    return;
                }
            }, 1000);
    </script>
    </body>
</html>
HTML;
}

function successBlock()
{
    return <<<HTML
    <html>
    <head>
        <title>RV Matrix - Contact</title>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
        <meta content="utf-8" http-equiv="encoding">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style type="text/css">
            body {
                background-color: #fff;
            }
    
            body, h1, p {
                font-family: "Helvetica Neue", "Segoe UI", Segoe, Helvetica, Arial, "Lucida Grande", sans-serif;
                font-weight: normal;
                margin: 0;
                padding: 0;
                text-align: center;
            }
    
            .container {
                margin-left:  auto;
                margin-right:  auto;
                margin-top: 177px;
                max-width: 1170px;
                padding-right: 15px;
                padding-left: 15px;
            }
    
            .row:before, .row:after {
                display: table;
                content: " ";
            }
    
            .col-md-6 {
                width: 50%;
            }
    
            .col-md-push-3 {
                margin-left: 25%;
            }
    
            h1 {
                font-size: 48px;
                font-weight: 300;
                margin: 0 0 20px 0;
            }
    
            .lead {
                font-size: 21px;
                font-weight: 200;
                margin-bottom: 20px;
            }
    
            p {
                margin: 0 0 10px;
            }
    
            a {
                color: #3282e6;
                text-decoration: none;
            }
        </style>
    

</head>
    
    <body>
        <div class="container text-center" id="error">
    
            <div class="row">
                <div class="col-md-12">
                    <div class="main-icon text-warning"><span class="uxicon uxicon-alert"></span></div>
                    <h1>Thank You!</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-md-push-3">
                    <p class="lead">We will get back to you shortly.</p>
                </div>
            </div>
        </div>
        <div>
            <p>You will be redirected back to the website in <span id="counter">5</span> <span id="counter1">seconds</span> </p>
        </div>
        <script>
            setInterval(function() {
                var div = document.querySelector("#counter");
                var count = div.textContent * 1 - 1;
                div.textContent = count;
    
                if (count == 1) {
                    var div1 = document.querySelector("#counter1");
                    div1.innerHTML = "second";
                }
    
                if (count <= 0) {
                    var count = 0;
                    window.location.href="/";
                    return;
                }
            }, 1000);
        </script>
        </body>
    </html>
    HTML;
}

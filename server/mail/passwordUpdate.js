// In your code, change the `passwordupdated` function to this:
exports.passwordupdated = (email, name) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Update Confirmation</title>
    <style>
        body{
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container{
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        .logo{
            max-width: 200px;
            margin-bottom: 20px;
        }
        .message{
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }
        .body{
            font-size: 16px;
            margin-bottom: 20px;
        }
        .cta{
            display: inline-block;
            padding: 10px 20px;
            background-color: #ffd60a;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }
        .support{
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }
        .highLight{
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Studynotion logo"></a>
        <div class="message">Password Update Confirmation</div>
        <div class="body">
            <p>Hey ${name},</p>
            <p>Your password has been changed successfully for the email <span class="highLight">${email}</span>.</p>
            <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us.</div>
            <a href="https://studynotion-edtech-project.vercel.app/dashboard" class="cta">Go to Dashboard</a>
        </div>
        <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help you!</div>
    </div>
</body>
</html>`;
}

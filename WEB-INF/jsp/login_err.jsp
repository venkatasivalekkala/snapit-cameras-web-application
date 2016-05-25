<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />

	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
	<meta http-equiv="Pragma" content="no-cache" />
	<meta http-equiv="Expires" content="0" /> 
	<script type="text/javascript" src="/jquery/jquery.js"></script>
	<script id="indexjs" type="text/javascript"	src="login.js"></script>
</head>
<body>
	<div id="main">
		<div class="form">
			<form class="login-form" method="POST" action="/jadrn013/servlet/Login">
				<input type="text" id="user" name="user" placeholder="username"/>
				<input type="password" id="password" name="passwd" placeholder="password"/>
				<h4 id="error">Invalid Username or Password</h4>
				<input type="submit" value="Login" class="button">
				<p class="message">Not registered? <a href="#">Create an account</a></p>
			</form>
			<form class="register-form">
				<input type="text" placeholder="name"/>
				<input type="password" placeholder="password"/>
				<input type="text" placeholder="email address"/>
				<input type="submit" value="Create" class="button">
				<p class="message">Already registered? <a href="#">Sign In</a></p>
			</form>
		</div>
	</div>
</body>
</html>
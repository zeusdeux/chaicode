exports = module.exports = function(email, passwd){
	var _email = email | ''
	  , _passwd = passwd | '';


	this.setEmail = function(email){
		_email = email;
	};

	this.setPasswd = function(passwd){
		_passwd = passwd;
	};

	this.getEmail = function(){
		return _email;
	};

	this.getPasswd = function(){
		return _passwd;
	}

	this.getUserObj = function(){
		return {
			"email": _email,
			"passwd": _passwd
		};
	}

};
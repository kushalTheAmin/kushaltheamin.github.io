$(document).ready(function()
{
  // Name can't be blank
$('#contact_name').on('input', function() {
	var input=$(this);
	var is_name=input.val();
	if(is_name){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
  });

 // Email must be an email
$('#contact_email').on('input', function() {
	var input=$(this);
	var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	var is_email=re.test(input.val());
	if(is_email){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
});

 // phone number must be a number with max length 9
$('#contact_phone').on('input', function() {
	var input=$(this);
	
	var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
	var is_phone=re.test(input.val());
	if(is_phone){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}
});

 // Message can't be blank
$('#contact_message').keyup(function(event) {
	var input=$(this);
	var message=$(this).val();
	console.log(message);
	if(message){input.removeClass("invalid").addClass("valid");}
	else{input.removeClass("valid").addClass("invalid");}	
});

// After Form Submitted Validation


$("#contact_submit button").click(function(event){
	
	var form_data=$("#contact").serializeArray();
	var error_free=true;
	for (var input in form_data){
		var element=$("#contact_"+form_data[input]['name']);
		var valid=element.hasClass("valid");
		var error_element=$("span", element.parent());
		if (!valid){error_element.removeClass("error").addClass("error_show"); error_free=false;   
//		document.getElementById("test").innerHTML += "error_" + form_data[input]['name'];
	//	document.getElementById("errorFieldBefore").innerHTML =" Error in value of : ";
	//document.getElementById("errorField").innerHTML +=  form_data[input]['name'];
        document.getElementById("error_"+form_data[input]['name']).style.display ="block";
	    document.getElementById("error_"+form_data[input]['name']).style.color = "red";
        }
		else{error_element.removeClass("error_show1").addClass("error1");
           document.getElementById("error_message").style.display= "none";
	  }
	}
	if (!error_free){
		event.preventDefault(); 
	}
	else{
		alert('No errors: Form will be submitted');
	}
}); 

});
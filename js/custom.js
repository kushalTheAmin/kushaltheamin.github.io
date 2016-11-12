$(document).ready(function()
   {
     var $log_header = $( "#headerId" ),
         str_header  = '<div class="col-md-4"><a href="index.html" class="logo"><img src="img/myMain2.png"  class="img-responsive" alt="kushal tha amin"></a></div> <div class="col-md-4"><a href="index.html" id="nameLogo" class="logo">Kushal The Amin.org</a> </div><div class="col-md-4"><div class="navbar-header"><button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span></button></div><!-- navigation Bar--><div class="navbar-collapse"><ul class="nav navbar-nav navbar-right"><li><a href="index.html">Home</a></li><li class="dropdown"><a href="#" id="about" class="dropdown-toggle" data-toggle="dropdown">About <b class="caret"></b> </a><ul class="dropdown-menu"><li class="dropdown-header">About Personal Info</li><li><a href="aboutMe.html">About mySelf</a></li><li class="divider"></li><li><a href="aboutSite.html">About this Site</a></li></ul></li><li><a href="contactUs.html">Contact Us</a></li></ul></div></div>',
         html_header = $.parseHTML( str_header );
 
    $log_header.append( html_header );
      
    var $log_footer = $("#footerId"),
        str_footer  = '<div id="footerCreator" class="navbar-text pull-left"><p>&copy; 2016 by Kushal Amin. All rights reserved.</p></div><div id="footerSymbol" class="navbar-text pull-right"><a href="https://www.facebook.com/kushal.amin.96"><i class="fa fa-facebook-square fa-3x"></i></a><a href="https://plus.google.com/u/1/116121013257775084238"><i class="fa fa-google-plus-square fa-3x"></i></a><a href="https://www.linkedin.com/in/kushal-amin-47abab126"><i class="fa fa-linkedin-square fa-3x"></i></a><a href="https://github.com/kushalTheAmin"><i class="fa fa-github-square fa-3x"></i></a></div>',
        html_footer = $.parseHTML(str_footer);

    $log_footer.append( html_footer );
   });

function loadInfo()
{
    $.ajax({
         
         url: "profile.json",
         dataType: "json",
         type: "get",
         cache: false,
         success: function(data)
         {
            document.getElementById("about_name").innerHTML = data.profile[0].name;
            document.getElementById("about_email").innerHTML += data.profile[1].contact["email"];
            document.getElementById("about_phone").innerHTML += data.profile[1].contact["phone"];
            document.getElementById("about_bcourse").innerHTML += data.profile[2].education[4].course[0].bachelor;
            document.getElementById("about_bschool").innerHTML += data.profile[2].education[0].school[0].bachelor;
            document.getElementById("about_mcourse").innerHTML += data.profile[2].education[4].course[1].masters;
            document.getElementById("about_mschool").innerHTML += data.profile[2].education[0].school[1].masters;
                 
            
            $(data.profile[2].education[3].language).each(function(index,value)
            {  
                if(index==0)
                {
                  document.getElementById("about_language").innerHTML += value;
                }
                else
                {
                    document.getElementById("about_language").innerHTML += ",   "+value;
                }
            });

            $(data.profile[2].education[1].projects).each(function(index,value)
            {  
                if(index==0)
                {
                  document.getElementById("about_project").innerHTML += value;
                }
                else
                {
                    document.getElementById("about_project").innerHTML += ",   "+value;
                }
            });

            $(data.profile[2].education[2].certification).each(function(index,value)
            {  
                if(index==0)
                {
                  document.getElementById("about_certification").innerHTML += value;
                }
                else
                {
                    document.getElementById("about_certification").innerHTML += ",   "+value;
                }
            });

         }
    });
}























/*$(document).ready(function()
{
/*
$("a contains("About")").parent().addClass("active");
$("a contains("Home")").parent().addClass("active");

if($("a contains("About")").parent().hasClass("active"))
{
  $(".dropdown a contains("About mySelf")").parent().addClass("active");

  if($(".dropdown a contains("About My College")").parent().hasClass("active"))
  {
  	$(".dropdown a contains("About My College")").parent(),addClass("active");
  } 	
  
 if($(".dropdown a contains("About this Site")").parent().hasClass("active"))
  {
  	$(".dropdown a contains("About this Site")").parent(),addClass("active");
  }

 
}*//*
	    $("#contact_form").bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: "Please supply your first name"
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: "Please supply your last name"
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: "Please supply your email address"
                    },
                    emailAddress: {
                        message: "Please supply a valid email address"
                    }
                }
            },
            phone: {
                validators: {
                    notEmpty: {
                        message: "Please supply your phone number"
                    },
                    phone: {
                        country: "US",
                        message: "Please supply a vaild phone number with area code"
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: "Please supply your street address"
                    }
                }
            },
            city: {
                validators: {
                     stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: "Please supply your city"
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: "Please select your state"
                    }
                }
            },
            zip: {
                validators: {
                    notEmpty: {
                        message: "Please supply your zip code"
                    },
                    zipCode: {
                        country: "US",
                        message: "Please supply a vaild zip code"
                    }
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:"Please enter at least 10 characters and no more than 200"
                    },
                    notEmpty: {
                        message: "Please supply a description of your project"
                    }
                    }
                }
            }
        })
        .on("success.form.bv", function(e) {
            $("#success_message").slideDown({ opacity: "show" }, "slow") // Do something ...
                $("#contact_form").data("bootstrapValidator").resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data("bootstrapValidator");

            // Use Ajax to submit form data
            $.post($form.attr("action"), $form.serialize(), function(result) {
                console.log(result);
            }, "json");
        });
	
});*/


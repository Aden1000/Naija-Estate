try{
    var ajax = new XMLHttpRequest()
}
catch(e1){
    try{
        ajax = new ActiveXObject("Msxml2.XMLHTTP")
    }
    catch(e2){
        try{
            ajax = new ActiveXObject("Microsoft.XMLHTTP")
        }
        catch(e3){
            ajax=false;
        }
    }
}
if(!ajax){
    alert("Your browser does not support ajax. Please use another browser.");
}
function submit_form(object,form){
    if(object.tagName=="FORM"){
        event.preventDefault();
        return false;
    }
    object.className="hidden";
    getById("loadingImg").className="";
    getById("formFeedback").className="";
    getById("formFeedback").innerHTML="Please wait while we setup your account.";
    ajax.open('POST','../Scripts/signup.php');
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var buyer=getById("buyer_type_radio");
    var seller=getById("seller_type_radio");
    if(buyer.checked==true){
        var account_type="buyer";
    }
    else if(seller.checked==true){
        var account_type="seller";
    }
    var firstname=getById("firstname").value;
    var lastname=getById("lastname").value;
    var phone=getById("phone_number").value;
    var email=getById("email").value;
    var username=getById("username").value;
    var password=getById("password").value;
    var confirm_password=getById("confirm_password").value;
    var string;
    var count=0;
    if(firstname!="" && lastname!="" && phone!="" && email!="" && username!="" && password!="" && confirm_password!=""){
        string="account_type="+account_type;
        string+="&firstname="+firstname;
        string+="&lastname="+lastname;
        string+="&phone="+phone;
        string+="&email="+email;
        string+="&username="+username;
        string+="&password="+password;
        string+="&confirm_password="+confirm_password;
        ajax.onreadystatechange=checkResponse();
        ajax.send(string);
    }
        function checkResponse(){
            count+=1;
            if(ajax.readyState==4 && ajax.status==200){
                var response=ajax.responseText;
                var script=document.createElement("script");
                script.innerHTML=response;
                getById("server_response").append(script);
                ajax.abort();
                object.className="next_button";
                getById("loadingImg").className="hidden";
            }
            else{
                if(count>3){
                    ajax.abort();
                    getById("formFeedback").innerHTML="An error occured. Please try again later.";
                    getById("formFeedback").className='error';
                    object.className="next_button";
                    getById("loadingImg").className="hidden";
                    return false;
                }
                setTimeout(checkResponse,2000);
            }
        }

}
function validate_account_type(object){
    var buyer=getById("buyer_type_radio");
    var seller=getById("seller_type_radio");
    if(buyer.checked==false && seller.checked==false){
        getByClass("error").item(0).innerHTML="Please select an account type."
        getByClass("next_button").item(0).setAttribute("disabled","")
    }
    else{
        getByClass("error").item(0).innerHTML="";
        getByClass("next_button").item(0).removeAttribute("disabled");
    }
}
function validate_personal_info(object){
    var fname=getById("firstname");
    var lname=getById("lastname");
    var v1=true;
    var v2=true;

    switch(object.name){
        case "firstname":
            if(object.value==""){
                object.nextElementSibling.innerHTML="Please enter your firstname."
                object.className="error"
                v1=false;
            }
            else if(/[^a-zA-Z ]/.test(object.value)){
                object.nextElementSibling.innerHTML="Only letters a-z, A-Z are allowed."
                object.className="error"
                v1=false;
            }
            else{
                object.nextElementSibling.innerHTML=""
                object.className="correct";
                v1=true;
            }
    
        break;

        case "lastname":
            if(object.value==""){
                object.nextElementSibling.innerHTML="Please enter your lastname."
                object.className="error"
                v2=false;
            }
            else if(/[^a-zA-Z ]/.test(object.value)){
                object.nextElementSibling.innerHTML="Only letters a-z, A-Z are allowed."
                object.className="error"
                v2=false;
            }
            else{
                object.nextElementSibling.innerHTML=""
                object.className="correct";
                v2=true;
            }
        break;
    };
    if(fname.value!="" && lname.value!=""){
        if(v1 && v2){
            getByClass("next_button").item(1).removeAttribute("disabled");
        }
        else{
            getByClass("next_button").item(1).disabled=true;
            return false;
        }
    }
    else{
        getByClass("next_button").item(1).disabled=true;
    }
}

var phone=email=false;
var email_timeout=1;
function validate_contact_info(object){
    if(object.name=="phone_number"){   
        validate_phone_number(object);
    }
    else if(object.name=="email"){
        validate_email(object);
    }
    if(phone && email && (ajax.status==200 || ajax.readyState==0)){
        getByClass("next_button").item(2).removeAttribute("disabled");
    }
    else{
        getByClass("next_button").item(2).disabled=true;
    }
}

var username=password=confirm_password=false;
var username_timeout=1;
function validate_login_info(object){
    if(object.name=="username"){
        username=validate_username(object);
    }
    else if(object.name=="password"){
        validate_password(object);
    }
    else if(object.name=="confirm_password"){
        validate_confirm_password(object);
    }
    if(username && password && confirm_password && (ajax.readyState==0 || ajax.status==200)){
        getByClass("next_button").item(3).removeAttribute("disabled");
    }
    else{
        getByClass("next_button").item(3).disabled=true;
    }
}

function validate_phone_number(object){ 
    if(object.value==""){
        object.nextElementSibling.innerHTML="Please enter your phone number";
        object.className="error";
        getByClass("next_button").item(2).setAttribute("disabled",true);
    }
    else if(/[^0-9]/.test(object.value)){
        object.nextElementSibling.innerHTML="Only numbers 0-9 are allowed";
        object.className="error";
        getByClass("next_button").item(2).setAttribute("disabled",true);
    }
    else if(object.value.length!=11){
        object.nextElementSibling.innerHTML="Your phone number must be 11 digits.";
        object.className="error";
        getByClass("next_button").item(2).setAttribute("disabled",true);

    }
    else{
        object.nextElementSibling.innerHTML="";
        object.className="correct";
        getByClass("next_button").item(2).removeAttribute("disabled");
    }
}
function validate_email(object){
    ajax.abort();
    getByClass("next_button").item(2).disabled=true;
    clearTimeout(email_timeout);
    ajax.abort();
    if(/^[a-zA-Z]+([-_.]?[a-zA-Z0-9]+)*@[a-zA-Z]+-?[a-zA-Z]+\.[a-zA-Z]{2,}/.test(object.value)==false){
        object.nextElementSibling.innerHTML="Please enter a valid email address";
        object.className="error";
        email=false
    }
    else if(/^[a-zA-Z]+([-_.]?[a-zA-Z0-9]+)*@[a-zA-Z]+-?[a-zA-Z]+\.[a-zA-Z]{2,}[^a-zA-Z]+/.test(object.value)){
        object.nextElementSibling.innerHTML="Please enter a valid email address";
        object.className="error";
        email=false
    }
    else{
        getByClass("next_button").item(2).disabled=true;
        object.className="error";
        object.nextElementSibling.className="error";
        object.nextElementSibling.innerHTML="Checking if this email has been used..."
        var string="";
        ajax.open('POST','../Scripts/check_email.php');
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        string="email="+object.value;
        var count=0;
        ajax.onreadystatechange=check_response();
        function check_response(){
            if(ajax.readyState==4 && ajax.status==200){
                var script=document.createElement("script");
                script.innerHTML=ajax.responseText;
                getById("server_response").append(script);
                ajax.abort();
            }
            else{
                count+=1;
                if(count<3){
                    setTimeout(check_response,2000)
                }
            }
        }
        ajax.send(string);
    }

}
function validate_website(object){
    if(object.value!=""){
        if(!/^(https:\/\/)(www\.)?[a-z0-9]+(\.[a-z]{2,}){1,}/.test(object.value)){
            object.nextElementSibling.innerHTML="Please enter a valid URL.<br>For example, https://www.example.com, https://example.com";
            object.className="error";
            if(object.name=="website_1"){
                website_1=false;
            }
            else{
                website_2=false;
            }
        }
        else{
            object.nextElementSibling.innerHTML="";
            object.className="correct";
            if(object.name=="website_1"){
                website_1=true
            }
            else{
                website_2=true;
            }
        }
    }
    else{
        object.nextElementSibling.innerHTML="";
        object.className="";
        if(object.name=="website_1"){
            website_1=true
        }
        else{
            website_2=true;
        }

    }
}

function validate_username(object){
    getByClass("next_button").item(3).disabled=true;
    clearTimeout(username_timeout);
    ajax.abort();
    if(/[^a-zA-Z0-9_]/.test(object.value)){
        object.nextElementSibling.className="error";
        object.nextElementSibling.innerHTML="Only characters a-z, A-Z and 0-9 are allowed.";
        object.className="error";
        username=false;
    }
    else if(object.value.length<6){
        object.nextElementSibling.className="error";
        object.nextElementSibling.innerHTML="Your username must be more than 6 characters";
        object.className="error";
        username=false;
    }
    else{
        object.className="error";
        object.nextElementSibling.className="error";
        object.nextElementSibling.innerHTML="Checking if this username is available..."
        var string="";
        ajax.open('POST','../Scripts/check_username.php');
        ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        string="username="+object.value;
        var count=0;
        ajax.onreadystatechange=check_response();
        function check_response(){
            if(ajax.readyState==4 && ajax.status==200){
                var script=document.createElement("script");
                script.innerHTML=ajax.responseText;
                getById("server_response").append(script);
                ajax.abort();
            }
            else{
                count+=1;
                if(count<3){
                    setTimeout(check_response,2000)
                }
            }
        }
        ajax.send(string);
    }
}
function validate_password(object){
    if(/[^a-zA-Z0-9 \._\!\-]/.test(object.value)){
        object.parentElement.parentElement.nextElementSibling.innerHTML="Only letters a-z, A-Z, numbers 0-9, period(.), underscore(_), hyphen(-) and exclamation point(!) are allowed.";
        object.parentElement.parentElement.className="passwords error";
        password=false;
    }
    else if(object.value.length<6){
        object.parentElement.parentElement.nextElementSibling.innerHTML="Your password must be more than 6 characters";
        object.parentElement.parentElement.className="passwords error";
        password=false;
    }
    else{
        object.parentElement.parentElement.nextElementSibling.innerHTML="";
        object.parentElement.parentElement.className="passwords correct"
        password=true;
        
    }
    if(getById("confirm_password").value!=""){
    validate_confirm_password(getById("confirm_password"));
}
}
function validate_confirm_password(object){
    var password=getById("password");
    if(object.value!=password.value){
        object.parentElement.parentElement.nextElementSibling.innerHTML="Both passwords must be the same";
        object.parentElement.parentElement.className="passwords error";        confirm_password=false;
    }
    else{
        object.parentElement.parentElement.nextElementSibling.innerHTML="";
        object.parentElement.parentElement.className="passwords correct";        confirm_password=true;
    }
}
function togglePassword(object){
    if(object.innerHTML=="Show"){
        object.previousElementSibling.children.item(0).setAttribute('type','text');
        object.innerHTML="Hide"
    }
    else{
        object.previousElementSibling.children.item(0).setAttribute('type','password');
        object.innerHTML="Show"
    }
}
function go_back(object,progress){
    object.parentElement.parentElement.className="hidden";
    object.parentElement.parentElement.previousElementSibling.className="";
    getById("progress").children.item(progress).className=""
}
function go_next(object,preview,progress){
        object.parentElement.parentElement.className="hidden";
        object.parentElement.parentElement.nextElementSibling.className="";
        getById("progress").children.item(progress).className="completed"
        if(preview==true){
            if(getById("seller_type_radio").checked){
                getById("account_type_preview").innerHTML="Seller";
            }
            else{
                getById("account_type_preview").innerHTML="Buyer";
            }
            getById("firstname_preview").innerHTML=getById("firstname").value;
            getById("lastname_preview").innerHTML=getById("lastname").value;
            getById("phone_number_preview").innerHTML=getById("phone_number").value;
            getById("email_preview").innerHTML=getById("email").value;
            // getById("phone_number_2_preview").innerHTML=getById("phone_number_2").value;
            // getById("whatsapp_number_preview").innerHTML=getById("whatsapp_number").value;
            // getById("website_1_preview").innerHTML=getById("website_1").value;
            // getById("website_2_preview").innerHTML=getById("website_2").value;
            getById("username_preview").innerHTML=getById("username").value;
            getById("password_preview").innerHTML=getById("password").value;
        }
}
function getById(id){
    return document.getElementById(id);
}
function getByClass(className){
    return document.getElementsByClassName(className);
}
function getByTag(tag){
    return document.getElementsByTagName(tag);
}


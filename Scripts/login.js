function submitForm(form){
    event.preventDefault();
    var uname_email=getById("uname_email_input");
    var password=getById("password_input")
    var uname_email_validate=validate_uname_email(uname_email);
    var password_validate=validate_password(password);
    if((uname_email_validate || password_validate)==false){
        return false;
    }
    uname_email.disabled=true;
    password.disabled=true;
    getById("SubmitBtn").className="hidden";
    getById("loadingImg").className="";
}

function getById(id){
    return document.getElementById(id);
}
function getByClass(className){
    return document.getElementsByClassName(className);
}
function validate_uname_email(object){
    if(object.value==""){
        object.nextElementSibling.innerHTML="Please type in your username or email."
        object.className="error"
        return false;        
    }
    else{
        object.nextElementSibling.innerHTML=""
        object.className="";
    }
}
function validate_password(object){
    if(object.value==""){
        object.nextElementSibling.innerHTML="Please type in your password.";
        object.className="error"
        return false;
    }
    else{
        object.nextElementSibling.innerHTML="";
        object.className="";
    }
}
function clear_error(object){
    if(object.id=="uname_email_input"){
        validate_uname_email(object);
    }    
    else{
        validate_password(object);
    }
}
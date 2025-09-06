<?php
if(isset($_POST['email'])){
    extract($_POST,EXTR_PREFIX_ALL,"post");
    $sql=new mysqli("localhost","select_user","Jesusismylord1","umarket");
    $stmt=$sql->prepare("SELECT * FROM sellers WHERE email=?");
    $stmt->bind_param("s",$post_email);
    $stmt->execute();
    $stmt->store_result();
    if($stmt->num_rows==0){
        echo <<<_END
        getById('email').className='correct';
        getById('email').nextElementSibling.className='correct';
        getById('email').nextElementSibling.innerHTML="This email address has not been used.";
        email=true;
        validate_contact_info(getById("firstname"));
        email_timeout=setTimeout(function(){
            getById('email').nextElementSibling.innerHTML="";
        },3000);
        _END;
    }
    else{
        echo <<<_END
        getById('email').className='error';
        getById('email').nextElementSibling.className='error';
        getById('email').nextElementSibling.innerHTML="This email address has been used before. Please choose another one.";
        validate_contact_info(getById("firstname"));
        email=false;
        _END;
    }
}
?>
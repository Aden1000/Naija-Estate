<?php
if(isset($_POST['username'])){
    extract($_POST,EXTR_PREFIX_ALL,"post");
    $sql=new mysqli("localhost","select_user","Jesusismylord1","umarket");
    $stmt=$sql->prepare("SELECT * FROM sellers WHERE username=?");
    $stmt->bind_param("s",$post_username);
    $stmt->execute();
    $stmt->store_result();
    if($stmt->num_rows==0){
        echo <<<_END
        getById('username').className='correct';
        getById('username').nextElementSibling.className='correct';
        getById('username').nextElementSibling.innerHTML="This username is available.";
        username=true;
        validate_login_info(getById("firstname"));
        username_timeout=setTimeout(function(){
            getById('username').nextElementSibling.innerHTML="";
        },3000);       
        _END;
    }
    else{
        echo <<<_END
        getById('username').className='error';
        getById('username').nextElementSibling.className='error';
        getById('username').nextElementSibling.innerHTML="This username has been taken. Please choose another one.";
        username=false;
        validate_login_info(getById("firstname"));
        _END;
    }
}
?>
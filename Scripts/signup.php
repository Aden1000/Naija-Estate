<?php
$string=print_r($_REQUEST);
echo <<<_END
alert($string);
_END;
die();
if(count($_POST)==8){
    extract($_POST,EXTR_PREFIX_ALL,"post");
    if(isset($post_account_type,$post_firstname,$post_lastname,$post_phone,$post_email,$post_username,$post_password,$post_confirm_password)){
        if($post_account_type=="" || $post_firstname=="" || $post_lastname=="" || $post_phone=="" || $post_email=="" || $post_username=="" || $post_password=="" || $post_confirm_password==""){
            echo "window.location.reload();";
            die();
        }
        validate_account_type($post_account_type);
        validate_name($post_firstname,$post_lastname);
        validate_phone($post_phone);
        validate_email($post_email);
        validate_username($post_username);
        $post_password=validate_password($post_password,$post_confirm_password);
        create_account($post_account_type,$post_firstname,$post_lastname,$post_phone,$post_email,$post_username,$post_password);
    }
    else{
        echo "window.location.reload()";
        die();
    }
}
else{
    echo "window.location.reload();";
    die();
}
function validate_account_type($type){
    if($type!="buyer" && $type!="seller"){
        echo "window.location.reload();";
        die();
    }
}
function validate_name($fname,$lname){
    if(preg_match("/[^a-zA-Z ]/",$fname) || preg_match("/[^a-zA-Z ]/",$lname)){
        echo "window.location.reload();";
        die();
    };
}
function validate_phone($phone){
    if(preg_match("/[^0-9]/",$phone) || strlen($phone)!=11){
        echo "window.location.reload();";
        die();
    }
}
function validate_email($email){
    if(!preg_match("/^[a-zA-Z]+([-_.]?[a-zA-Z0-9]+)*@[a-zA-Z]+-?[a-zA-Z]+\.[a-zA-Z]{2,}/",$email)){
        echo "window.location.reload();";
        die();
    }
    elseif(preg_match("/^[a-zA-Z]+([-_.]?[a-zA-Z0-9]+)*@[a-zA-Z]+-?[a-zA-Z]+\.[a-zA-Z]{2,}[^a-zA-Z]+/",$email)){
        echo "window.location.reload();";
        die();
    }
    else{
        $sql=new mysqli("localhost","select_user","Jesusismylord1","umarket");
        $stmt=$sql->prepare("SELECT * FROM sellers WHERE email=?");
        $stmt->bind_param("s",$email);
        $stmt->execute();
        $stmt->store_result();
        if($stmt->num_rows!=0){
            echo "window.location.reload();";
            die();
        }
    }

}
function validate_username($username){
    if(preg_match("/[^a-zA-Z0-9_]/",$username) || strlen($username)<6){
        echo "window.location.reload();";
        die();
    }
    else{
        $sql=new mysqli("localhost","select_user","Jesusismylord1","umarket");
        $stmt=$sql->prepare("SELECT * FROM sellers WHERE username=?");
        $stmt->bind_param("s",$username);
        $stmt->execute();
        $stmt->store_result();
        if($stmt->num_rows!=0){
            echo "window.location.reload();";
            die();
        }
    }
}
function validate_password($password,$confirm_password){
    if(preg_match("/[^a-zA-Z0-9 \._\!\-]/",$password) || strlen($password)<6 || $confirm_password!=$password){
        echo "window.location.reload();";
        die();
    }
    $password=encrypt_password($password);
    return $password;
}
function create_account($type,$fname,$lname,$phone,$email,$username,$password){
    //mysqli("localhost","username","password","database"); 
    if($type=="seller"){
        $sql=new mysqli("localhost","insert_user","Jesusismylord1","umarket");
        $stmt=$sql->prepare("INSERT INTO sellers (firstname,lastname,phone_number,email,username,passwords) VALUES(?,?,?,?,?,?)");
        $stmt->bind_param("ssdsss",$fname,$lname,$phone,$email,$username,$password);
        $stmt->execute();
        $stmt->store_result();
        if($stmt->affected_rows==1){
        }
    }
}
function encrypt_password($password){
    $count=strlen($password);
    $new_password=str_split($password);
    $encrypted_password="";
    for($j=0; $j<$count; ++$j){
        switch($new_password[$j]){
            case "0":
                $encrypted_password.="2";
                break;
            case "1":
                $encrypted_password.="4";
                break;
            case "2":
                $encrypted_password.="5";
                break;
            case "3":
                $encrypted_password.="7";
                break;
            case "4":
                $encrypted_password.="1";
                break;
            case "5":
                $encrypted_password.="6";
                break;
            case "6":
                $encrypted_password.="8";
                break;
            case "7":
                $encrypted_password.="9";
                break;
            case "8":
                $encrypted_password.="3";
                break;
            case "9":
                $encrypted_password.="0";
                break;
            case "a":
                $encrypted_password.="f";
                break;
            case "b":
                $encrypted_password.="g";
                break;
            case "c":
                $encrypted_password.="h";
                break;
            case "d":
                $encrypted_password.="i";
                break;
            case "e":
                $encrypted_password.="l";
                break;
            case "f":
                $encrypted_password.="k";
                break;
            case "g":
                $encrypted_password.="c";
                break;
            case "h":
                $encrypted_password.="a";
                break;
            case "i":
                $encrypted_password.="j";
                break;
            case "j":
                $encrypted_password.="m";
                break;
            case "k":
                $encrypted_password.="e";
                break;
            case "l":
                $encrypted_password.="d";
                break;
            case "m":
                $encrypted_password.="o";
                break;
            case "n":
                $encrypted_password.="q";
                break;
            case "o":
                $encrypted_password.="s";
                break;
            case "p":
                $encrypted_password.="b";
                break;
            case "q":
                $encrypted_password.="n";
                break;
            case "r":
                $encrypted_password.="p";
                break;
            case "s":
                $encrypted_password.="r";
                break;
            case "t":
                $encrypted_password.="u";
                break;
            case "u":
                $encrypted_password.="v";
                break;
            case "v":
                $encrypted_password.="t";
                break;
            case "w":
                $encrypted_password.="x";
                break;
            case "x":
                $encrypted_password.="z";
                break;
            case "y":
                $encrypted_password.="w";
                break;
            case "z":
                $encrypted_password.="y";
                break;
            case "A":
                $encrypted_password.="F";
                break;
            case "B":
                $encrypted_password.="G";
                break;
            case "C":
                $encrypted_password.="H";
                break;
            case "D":
                $encrypted_password.="I";
                break;
            case "E":
                $encrypted_password.="L";
                break;
            case "F":
                $encrypted_password.="K";
                break;
            case "G":
                $encrypted_password.="C";
                break;
            case "H":
                $encrypted_password.="A";
                break;
            case "I":
                $encrypted_password.="J";
                break;
            case "J":
                $encrypted_password.="M";
                break;
            case "K":
                $encrypted_password.="E";
                break;
            case "L":
                $encrypted_password.="D";
                break;
            case "M":
                $encrypted_password.="O";
                break;
            case "N":
                $encrypted_password.="Q";
                break;
            case "O":
                $encrypted_password.="S";
                break;
            case "P":
                $encrypted_password.="B";
                break;
            case "Q":
                $encrypted_password.="N";
                break;
            case "R":
                $encrypted_password.="P";
                break;
            case "S":
                $encrypted_password.="R";
                break;
            case "T":
                $encrypted_password.="U";
                break;
            case "U":
                $encrypted_password.="V";
                break;
            case "V":
                $encrypted_password.="T";
                break;
            case "W":
                $encrypted_password.="X";
                break;
            case "X":
                $encrypted_password.="Z";
                break;
            case "Y":
                $encrypted_password.="W";
                break;
            case "Z":
                $encrypted_password.="Y";
                break;
            case " ":
                $encrypted_password.="%";
                break;
            case ".":
                $encrypted_password.="_";
                break;
            case "_":
                $encrypted_password.="-";
                break;
            case "!":
                $encrypted_password.=".";
                break;
            case "-":
                $encrypted_password.="!";
                break;
    
        };
    }
    return $encrypted_password;
}
function decrypt_password($password){
    $count=strlen($password);
    $new_password=str_split($password);
    $decrypted_password="";
    for($j=0; $j<$count; ++$j){
        switch($new_password[$j]){
            case "2":
                $decrypted_password.="0";
                break;
            case "4":
                $decrypted_password.="1";
                break;
            case "5":
                $decrypted_password.="2";
                break;
            case "7":
                $decrypted_password.="3";
                break;
            case "1":
                $decrypted_password.="4";
                break;
            case "6":
                $decrypted_password.="5";
                break;
            case "8":
                $decrypted_password.="6";
                break;
            case "9":
                $decrypted_password.="7";
                break;
            case "3":
                $decrypted_password.="8";
                break;
            case "0":
                $decrypted_password.="9";
                break;
            
            case "f":
                $decrypted_password.="a";
                break;
            case "g":
                $decrypted_password.="b";
                break;
            case "h":
                $decrypted_password.="c";
                break;
            case "i":
                $decrypted_password.="d";
                break;
            case "l":
                $decrypted_password.="e";
                break;
            case "k":
                $decrypted_password.="f";
                break;
            case "c":
                $decrypted_password.="g";
                break;
            case "a":
                $decrypted_password.="h";
                break;
            case "j":
                $decrypted_password.="i";
                break;
            case "m":
                $decrypted_password.="j";
                break;
            case "e":
                $decrypted_password.="k";
                break;
            case "d":
                $decrypted_password.="l";
                break;
            case "o":
                $decrypted_password.="m";
                break;
            case "q":
                $decrypted_password.="n";
                break;
            case "s":
                $decrypted_password.="o";
                break;
            case "b":
                $decrypted_password.="p";
                break;
            case "n":
                $decrypted_password.="q";
                break;
            case "p":
                $decrypted_password.="r";
                break;
            case "r":
                $decrypted_password.="s";
                break;
            case "u":
                $decrypted_password.="t";
                break;
            case "v":
                $decrypted_password.="u";
                break;
            case "t":
                $decrypted_password.="v";
                break;
            case "x":
                $decrypted_password.="w";
                break;
            case "z":
                $decrypted_password.="x";
                break;
            case "w":
                $decrypted_password.="y";
                break;
            case "y":
                $decrypted_password.="z";
                break;
            case "F":
                $decrypted_password.="A";
                break;
            case "G":
                $decrypted_password.="B";
                break;
            case "H":
                $decrypted_password.="C";
                break;
            case "I":
                $decrypted_password.="D";
                break;
            case "L":
                $decrypted_password.="E";
                break;
            case "K":
                $decrypted_password.="F";
                break;
            case "C":
                $decrypted_password.="G";
                break;
            case "A":
                $decrypted_password.="H";
                break;
            case "J":
                $decrypted_password.="I";
                break;
            case "M":
                $decrypted_password.="J";
                break;
            case "E":
                $decrypted_password.="K";
                break;
            case "D":
                $decrypted_password.="L";
                break;
            case "O":
                $decrypted_password.="M";
                break;
            case "Q":
                $decrypted_password.="N";
                break;
            case "S":
                $decrypted_password.="O";
                break;
            case "B":
                $decrypted_password.="P";
                break;
            case "N":
                $decrypted_password.="Q";
                break;
            case "P":
                $decrypted_password.="R";
                break;
            case "R":
                $decrypted_password.="S";
                break;
            case "U":
                $decrypted_password.="T";
                break;
            case "V":
                $decrypted_password.="U";
                break;
            case "T":
                $decrypted_password.="V";
                break;
            case "X":
                $decrypted_password.="W";
                break;
            case "Z":
                $decrypted_password.="X";
                break;
            case "W":
                $decrypted_password.="Y";
                break;
            case "Y":
                $decrypted_password.="Z";
                break;
            case "%":
                $decrypted_password.=" ";
                break;
            case "_":
                $decrypted_password.=".";
                break;
            case "-":
                $decrypted_password.="_";
                break;
            case ".":
                $decrypted_password.="!";
                break;
            case "!":
                $decrypted_password.="-";
                break;
        }
    }
}
?>
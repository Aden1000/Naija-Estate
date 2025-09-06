function getById(id){
    return document.getElementById(id);
}

function getByClass(className,index){
    if(index>=0){
        return document.getElementsByClassName(className).item(index);
    }
    else {
        return document.getElementsByClassName(className);
    }
}

function addClass(object,id,className){
    if(object!=null){
        if(!object.className.match(className)){
            if(!object.className==""){
                object.className+=" "+className;
            }
            else{
                object.className=className;
            }
        }
    }
    else{
        object=getById(id);
        if(!object.className.match(className)){
            if(!object.className==""){
                object.className+=" "+className;
            }
            else{
                object.className=className;
            }
        }
    }
}

function removeClass(object,id,className){
    if(object!=null){
        object.className=object.className.replace(" "+className,"");
        object.className=object.className.replace(className,"");
    }
    else{
        object=getById(id);
        object.className=object.className.replace(" "+className,"");
        object.className=object.className.replace(className,"");
    }
}
function hasClass(object,className){
    if(object.className.match(className)){
        return true;
    }
    else{
        return false;
    }
}

function addBookmark(button){
    var img=button.firstElementChild;
    button.setAttribute("onclick","");
    img.setAttribute("src","../Images/Loading.svg");
    img.onload=function(){
        addClass(img,null,"loadingImg");
        setTimeout(function(){
            img.setAttribute("src","../Images/Bookmark.svg");
            img.onload=function(){
                removeClass(img,null,"loadingImg");
                button.setAttribute("onclick","removeBookmark(this)");
            }
        },2000);
    }
}

function removeBookmark(button){
    var img=button.firstElementChild;
    button.setAttribute("onclick","");
    img.setAttribute("src","../Images/Loading.svg");
    img.onload=function(){
        addClass(img,null,"loadingImg");
        setTimeout(function(){
            img.setAttribute("src","../Images/Bookmark Add.svg");
            img.onload=function(){
                removeClass(img,null,"loadingImg");
                button.setAttribute("onclick","addBookmark(this)");
            }
        },1000);
    }
}

function showContact(){
    var contact=getById("sellerContact");
    var main=getByClass("mainContainer",0);
    addClass(main,null,"frozen");
    addClass(main,null,"shift");
    addClass(getById("showContact"),null,"shift");
    removeClass(contact,null,"hidden");
    contact.click();
}

function hideContact(){
    var contact=getById("sellerContact");
    var main=getByClass("mainContainer",0);
    contact.scrollTo(0,0);
    contact.click();
    removeClass(main,null,"hidden");
    removeClass(main,null,"shift");
    removeClass(getById("showContact"),null,"shift");
    addClass(contact,null,"hidden");
}

function saveContact(link){
    link.setAttribute("onclick","");
    link.innerHTML="<img src='../Images/Loading.svg'> Adding Contact...";
    var img=link.firstElementChild;        
    addClass(img,null,"loadingImg");
    setTimeout(function(){
            removeClass(img,null,"loadingImg");
            addClass(link,null,"saved");
            link.innerHTML="<img src='../Images/Account Checked.svg'>Contact saved";
            link.setAttribute("onclick","unsaveContact(this)");
    },2000)
}

function unsaveContact(link){
    link.setAttribute("onclick","");
    var button=link.firstElementChild;
    var img=link.firstElementChild.firstElementChild;
    img.setAttribute("src","../Images/Loading White.svg");
    img.onload=function(){
        addClass(img,null,"loadingImg");
        link.children.item(1).innerHTML="Removing<br>Contact...";
        setTimeout(function(){
            img.setAttribute("src","../Images/Account Add Green.svg");
            img.onload=function(){
                removeClass(img,null,"loadingImg");
                removeClass(button,null,"saved");
                link.children.item(1).innerHTML="Save<br>Contact";
                link.setAttribute("onclick","saveContact(this)");
            }
        },2000)
    }
}

function showReviewPoster(){
    var poster=getById("reviewPoster");
    var main=getByClass("mainContainer",0);
    addClass(main,null,"frozen");
    addClass(main,null,"shift");
    addClass(getById("showContact"),null,"shift");
    removeClass(poster,null,"hidden");
    resetReviewPoster();
}

function hideReviewPoster(){
    var poster=getById("reviewPoster");
    var main=getByClass("mainContainer",0);
    removeClass(main,null,"frozen");
    removeClass(main,null,"shift");
    removeClass(getById("showContact"),null,"shift");
    addClass(poster,null,"hidden"); 

}

function rateSeller(star){
    //this function selects the number of stars to rate a seller when giving a review
    getById("reviewRating").value=star;
    for(j=0;j<5;j++){
        getByClass("stars",j).setAttribute("src","../Images/Star.svg");
    }
    for(j=0;j<star;j++){
        getByClass("stars",j).setAttribute("src","../Images/Starred.svg");
    }

}

function resetReviewPoster(){
    getById("reviewTextArea").value="";
    getById("reviewRating").value=0;
    getById("reviewWordCount").innerHTML="0/1000";
    for(j=0;j<5;j++){
        getByClass("stars",j).setAttribute("src","../Images/Star.svg");
    }
}

function countWords(count){
    getById("reviewWordCount").innerHTML=count+"/1000";
}

this.onload=function(){
    if(this.location.hash!=""){
        switch(this.location.hash){
            case "#contact":
                history.back();
                break;
            case "#review":
                history.back();
                break;
            case "#productPic":
                history.back();
        }
    }
    this.onhashchange=function(){
        hashChange(this.location.hash);
    }
}

var lastHash="";

function hashChange(hash){
    if(hash!=""){
        this.location.hash=hash;
    }
    switch(hash){
        case "":
            hideReviewPoster();
            hideContact();
            unzoomPic();
            lastHash="";
            break;
                    
        case "#review":
            showReviewPoster();
            lastHash="#review";
            break;

        case "#contact":
            showContact();
            lastHash="#contact";
            break;

        case "#productPic":
            zoomPic()
            lastHash="#contact"
            break;

        case "#productView":
            showProductView(url);
            lastHash="#productView";
            break;
    
    }
}

function historyBack(){
    history.back();
}

function zoomPic(){
    addClass(getById("productView").getElementsByClassName("productPic").item(0),null,"zoom");
}

function unzoomPic(){
    removeClass(getById("productView").getElementsByClassName("productPic").item(0),null,"zoom");
}

function test(){
    alert("done");
}

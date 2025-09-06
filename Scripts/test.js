
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
            if(!object.className.match(" ")){
                object.className+=" "+className;
            }
            else{
                object.className+=className;
            }
        }
    }
    else{
        object=getById(id);
        if(!object.className.match(className)){
            if(!object.className.match(" ")){
                object.className+=" "+className;
            }
            else{
                object.className+=className;
            }
        }
    }
}

function removeClass(object,id,className){
    if(object!=null){
        object.className=object.className.replace(className,"");
    }
    else{
        object=getById(id);
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
    button.setAttribute("onclick","");
    button.setAttribute("src","../Images/Loading.svg");
    button.onload=function(){
        addClass(button,null,"loadingImg");
        setTimeout(function(){
            button.setAttribute("src","../Images/Bookmark.svg");
            button.onload=function(){
                removeClass(button,null,"loadingImg");
                button.parentElement.setAttribute("onclick","removeBookmark(this.firstElementChild)");
            }
        },1000);
    }
}

function removeBookmark(button){
    button.setAttribute("onclick","");
    button.setAttribute("src","../Images/Loading.svg");
    button.onload=function(){
        addClass(button,null,"loadingImg");
        setTimeout(function(){
            button.setAttribute("src","../Images/Bookmark Add.svg");
            button.onload=function(){
                removeClass(button,null,"loadingImg");
                button.parentElement.setAttribute("onclick","removeBookmark(this.firstElementChild)");
            }
        },1000);
    }
}

function hideFloat(){
    //this function hides every element floating above the screen, such as the product view element, filter element etc
    var floats=getByClass("float");
    for(j=0; j<floats.length;j++){
        addClass(floats.item(j),null,"hidden");
    }
    removeClass(this.document.body,null,"frozen");
}

function checkFloat(){
    //this function checks if there any element floating above the screen
    var floats=getByClass("float");
    for(j=0;j<floats.length;j++){
        if(!floats.item(j).className.match("hidden")){
            return true;
        }
    }
}

function showFilter(){
    var filter=getById("searchFilterForm");
    var body=this.document.body;
    var backBoard=getByClass("backBoard",0);
    removeClass(filter,null,"hidden");
    addClass(body,null,"frozen");
    removeClass(backBoard,null,"hidden");
}

function hideFilter(){
    var filter=getById("searchFilterForm");
    var body=this.document.body;
    var backBoard=getByClass("backBoard",0);
    addClass(filter,null,"hidden");
    removeClass(body,null,"frozen");
    addClass(backBoard,null,"hidden");
    body.click();
    getById("filterLocation").value=initial_filter["location"];
    getById("filterMinPrice").value=initial_filter["Min"];
    getById("filterMaxPrice").value=initial_filter["Max"];
    var star=initial_filter["stars"];
    if(star==null){
        for(j=0;j<5;j++){
            removeClass(getById("RatingSelector").children.item(j),null,"selected");
        }
    }
    else{
        for(j=0;j<5;j++){
            removeClass(getById("RatingSelector").children.item(j),null,"selected");
        }
        addClass(getById("RatingSelector").children.item(star),null,"selected");
    }
}

function clearFilter(){
    getById("filterLocation").value="";
    getById("filterMinPrice").value="";
    getById("filterMaxPrice").value="";
    for(j=0;j<5;j++){
        removeClass(getById("RatingSelector").children.item(j),null,"selected");
    }
}

//variables holding the initial values of the search filter

var initial_filter=new Array;
initial_filter["location"]="";
initial_filter["Min"]="";
initial_filter["Max"]="";
initial_filter["stars"]=null;
function applyFilter(){
    var filterCount=0;
    if(getById("filterLocation").value!=""){
        filterCount++;
    }
    if(getById("filterMinPrice").value!=""){
        filterCount++;
    }
    if(getById("filterMaxPrice").value!=""){
        filterCount++;
    }
    for(j=0;j<5;j++){
        if(hasClass(getById("RatingSelector").children.item(j),"selected")){
            filterCount++;
            initial_filter["stars"]=j;
            break;
        }
        else{
            initial_filter["stars"]=null;
        }
    }
    initial_filter["location"]=getById("filterLocation").value;
    initial_filter["Min"]=getById("filterMinPrice").value;
    initial_filter["Max"]=getById("filterMaxPrice").value;
    var filterCountElement=getById("FilterCount");
    if(filterCount>0){
        filterCountElement.innerHTML=filterCount;
        removeClass(filterCountElement,null,"hidden")
    }
    else{
        addClass(filterCountElement,null,"hidden")
    }
    history.back();
}

function selectRating(button){
    if(hasClass(button,"selected")){
        removeClass(button,null,"selected");
    }
    else{
        for(j=0;j<5;j++){
            removeClass(getById("RatingSelector").children.item(j),null,"selected");
        }
        addClass(button,null,"selected");
    }
}

function showProductView(){
    addClass(this.document.body,null,"frozen");
    removeClass(getById("productView"),"","hidden");
    if(lastHash==""){
        getByClass("mainContainer",1).scrollTo(0,0);
        getByClass("mainContainer",1).getElementsByClassName("productPic").item(0).scrollTo(0,0);
    }
}

function hideProductView(){
    removeClass(this.document.body,null,"frozen");
    addClass(getById("productView"),null,"hidden");
}

function showContact(){
    var contact=getById("sellerContact");
    var backBoard=getByClass("backBoard",1);
    var main=getByClass("mainContainer",1);
    backBoard.onclick=function(){
        history.back();
    }
    addClass(main,null,"frozen");
    removeClass(backBoard,null,"hidden");
    removeClass(contact,null,"hidden");
    contact.click();
}

function hideContact(){
    var contact=getById("sellerContact");
    var backBoard=getByClass("backBoard",1);
    var main=getByClass("mainContainer",1);
    contact.scrollTo(0,0);
    contact.click();
    removeClass(main,null,"hidden");
    addClass(contact,null,"hidden");
    addClass(backBoard,null,"hidden");
}

function saveContact(link){
    link.setAttribute("onclick","");
    var button=link.firstElementChild;
    var img=link.firstElementChild.firstElementChild;
    img.setAttribute("src","../Images/Loading.svg");
    img.onload=function(){
        addClass(img,null,"loadingImg");
        link.children.item(1).innerHTML="Saving<br>Contact...";
    }
    setTimeout(function(){
        img.setAttribute("src","../Images/Account Checked.svg");
        img.onload=function(){
            removeClass(img,null,"loadingImg");
            addClass(button,null,"saved");
            link.children.item(1).innerHTML="Contact<br>Saved";
            link.setAttribute("onclick","unsaveContact(this)");
        }
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
    var backBoard=getByClass("backBoard",1);
    var main=getByClass("mainContainer",1);
    addClass(main,null,"frozen");
    removeClass(backBoard,null,"hidden");
    removeClass(poster,null,"hidden");
    backBoard.onclick=function(){
        history.back();
    }
}

function hideReviewPoster(){
    var poster=getById("reviewPoster");
    var backBoard=getByClass("backBoard",1);
    var main=getByClass("mainContainer",1);
    poster.scrollTo(0,0);
    removeClass(main,null,"frozen");
    addClass(backBoard,null,"hidden");
    addClass(poster,null,"hidden"); 
    resetReviewPoster();

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
            case "#filter":
                history.back();
                break;
            case "#productView":
                history.back();
                break;
            case "#contact":
                history.back();
                history.back();
                break;
            case "#review":
                history.back();
                history.back();
                break;
            case "#productPic":
                history.back();
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
            hideProductView();
            hideFilter();
            lastHash="";
            break;

        case "#filter":
            showFilter();
            lastHash="#filter";
            break;
                
        case "#productView":
            hideReviewPoster();
            hideContact();
            unzoomPic();
            showProductView();
            lastHash="#productView";
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


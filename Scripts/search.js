var containers;
this.onload=function(){
    containers=[getById("searchContainer"),getById("bookmarksContainer"),getById("contactsContainer"),getById("notificationsContainer"),getById("menuContainer")];
    if(this.location.hash!=""){
        this.location.replace("file:///C:/Program%20Files/Ampps/www/Pages/search.html")
    }
    setTimeout(function(){
        addClass(getById("loadingContainer"),null,"hidden");
        this.onhashchange=function(){
            hashChange(this.location.hash);
        }
    },2000)

    //clear all textareas
    document.querySelectorAll("textarea").forEach(function(item){
        item.value="";
    })
}


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
    var filter=getById("searchContainer").getElementsByClassName("searchFilterForm").item(0);
    var menu=getById("menuBar");
    filter.scrollTo(0,0);
    removeClass(filter,null,"hidden");
    addClass(menu,null,"hidden");
}

function hideFilter(){
    var filter=getById("searchContainer").getElementsByClassName("searchFilterForm").item(0);
    var menu=getById("menuBar");   
    addClass(filter,null,"hidden");
    removeClass(menu,null,"hidden");
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

var productLoad;
function showProductView(){
    //display the loading container
    addClass(getById("searchContainer"),null,"shift");
    addClass(getById("bookmarksContainer"),null,"shift");
    addClass(getById("menuBar"),null,"shift");
    removeClass(getById("productView"),null,"hidden");
    // //only place the url if there's a url
    setTimeout(function(){
        //freeze the body
        addClass(getById("productLoading"),null,"hidden"); 
    },2000);
}

function hideProductView(){
    removeClass(getById("searchContainer"),null,"shift");
    removeClass(getById("bookmarksContainer"),null,"shift");
    removeClass(getById("menuBar"),null,"shift");
    addClass(getById("productView"),null,"hidden");
    //incase the user goes back before the product loads completely
    clearTimeout(productLoad);
    setTimeout(() => {
        removeClass(getById("productLoading"),null,"hidden");
    }, 1000);
}

function zoomPic(){
    addClass(getById("productView").getElementsByClassName("productPic").item(0),null,"zoom");
    getById("productView").getElementsByClassName("productPic").item(0).scroll(0,0);
}

function unzoomPic(){
    removeClass(getById("productView").getElementsByClassName("productPic").item(0),null,"zoom");
    getById("productView").getElementsByClassName("productPic").item(0).scroll(0,0);
}

function showContact(){
    var contact=getById("sellerContact");
    var main=getByClass("mainContainer",0);
    addClass(main,null,"frozen");
    addClass(main,null,"shift");
    addClass(getById("showContact"),null,"shift");
    addClass(getById("productView").getElementsByClassName("mainContainer").item(0),null,"shift")
    removeClass(contact,null,"hidden");
    contact.click();
}

function hideContact(){
    var contact=getById("sellerContact");
    var main=getByClass("mainContainer",0);
    contact.click();
    removeClass(main,null,"hidden");
    removeClass(main,null,"shift");
    removeClass(getById("showContact"),null,"shift");
    removeClass(getById("productView").getElementsByClassName("mainContainer").item(0),null,"shift")
    addClass(contact,null,"hidden");
    setTimeout(function(){
        contact.scrollTo(0,0);
    },1000)
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

function reviewFilter(filter){
    document.querySelectorAll("#reviewFilter>div").forEach(function(item){
        removeClass(item,null,"selected");
    });
    addClass(filter,null,"selected");
}

function showReviewPoster(){
    var poster=getById("reviewPoster");
    var main=getByClass("mainContainer",0);
    addClass(main,null,"frozen");
    addClass(main,null,"shift");
    addClass(getById("showContact"),null,"shift");
    addClass(getById("productView").getElementsByClassName("mainContainer").item(0),null,"shift")
    removeClass(poster,null,"hidden");
    resetReviewPoster();
}

function hideReviewPoster(){
    var poster=getById("reviewPoster");
    var main=getByClass("mainContainer",0);
    removeClass(main,null,"frozen");
    removeClass(main,null,"shift");
    removeClass(getById("showContact"),null,"shift");
    removeClass(getById("productView").getElementsByClassName("mainContainer").item(0),null,"shift")
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

function countWords(textarea,count){
    textarea.nextElementSibling.innerHTML=count+"/1000";
}

function resetReviewPoster(){
    var textarea=getById("reviewTextArea");
    textarea.value="";
    getById("reviewRating").value=0;
    textarea.nextElementSibling.innerHTML="0/1000";
    for(j=0;j<5;j++){
        getByClass("stars",j).setAttribute("src","../Images/Star.svg");
    }
}

function showContactSearch(){
    removeClass(null,"contactSearchBar","hidden");
}

function hideContactSearch(){
    addClass(null,"contactSearchBar","hidden");
}

function showBookmarkSearch(){
    removeClass(null,"bookmarkSearchBar","hidden");}

function hideBookmarkSearch(){
    addClass(null,"bookmarkSearchBar","hidden");
}

function showAccountSettings(){
    removeClass(getById("account_settings"),null,"hidden");
    addClass(getById("menuContainer"),null,"shift");
    addClass(getById("menuBar"),null,"shift");
}

function hideAccountSettings(){
    addClass(getById("account_settings"),null,"hidden");
    removeClass(getById("menuContainer"),null,"shift");
    removeClass(getById("menuBar"),null,"shift");

}

function showSendFeedback(){
    removeClass(getById("send_feedback"),null,"hidden");
    addClass(getById("menuContainer"),null,"shift");
    addClass(getById("menuBar"),null,"shift");
    getById("send_feedback").getElementsByTagName("textarea").item(0).value="";
}

function hideSendFeedback(){
    addClass(getById("send_feedback"),null,"hidden");
    removeClass(getById("menuContainer"),null,"shift");
    removeClass(getById("menuBar"),null,"shift");
}

function showMakeComplaint(){
    removeClass(getById("make_complaint"),null,"hidden");
    addClass(getById("menuContainer"),null,"shift");
    addClass(getById("menuBar"),null,"shift");
    getById("make_complaint").getElementsByTagName("textarea").item(0).value="";
}

function hideMakeComplaint(){
    addClass(getById("make_complaint"),null,"hidden");
    removeClass(getById("menuContainer"),null,"shift");
    removeClass(getById("menuBar"),null,"shift");

}

function showChangePassword(){
    removeClass(getById("change_password"),null,"hidden");
    addClass(getById("account_settings"),null,"shift");
    getById("change_password").getElementsByTagName("input").item(0).value="";
    getById("change_password").getElementsByTagName("input").item(1).value="";
    getById("change_password").getElementsByTagName("input").item(2).value="";
}

function hideChangePassword(){
    addClass(getById("change_password"),null,"hidden");
    removeClass(getById("account_settings"),null,"shift");
    
}

function showEditProfile(){
    removeClass(getById("edit_profile"),null,"hidden");
    addClass(getById("account_settings"),null,"shift");
}

function hideEditProfile(){
    addClass(getById("edit_profile"),null,"hidden");
    removeClass(getById("account_settings"),null,"shift");
}

var lastMenu="homeButton";
function changeMenu(menu){    
    removeClass(null,lastMenu,"selected");
    addClass(menu,null,"selected");
    lastMenu=menu.id;
    containers.forEach(function(item){
        removeClass(item,null,"selected");
    })
    switch(menu.id){
        case "homeButton":
            if(this.location.hash!=""){
                history.back();
            }
            addClass(containers[0],null,"selected");
        break;

        case "bookmarkButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }

            if(this.location.hash=="#bookmarkSearch" || this.location.hash=="#contactSearch"){
                history.back();
            }
            addClass(containers[1],null,"selected");
        break;

        case "contactButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }

            if(this.location.hash=="#bookmarkSearch" || this.location.hash=="#contactSearch"){
                history.back();
            }
            addClass(containers[2],null,"selected");
        break;

        case "notificationButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }

            if(this.location.hash=="#bookmarkSearch" || this.location.hash=="#contactSearch"){
                history.back();
            }
            addClass(containers[3],null,"selected");
        break;

        case "menuButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }

            if(this.location.hash=="#bookmarkSearch" || this.location.hash=="#contactSearch"){
                history.back();
            }
            addClass(containers[4],null,"selected");
        break;
    }
}

var lastHash="";
function hashChange(hash,url){
    if(hash!=""){
        this.location.hash=hash;
    }
    switch(hash){
        case "":
            hideProductView();
            hideFilter();
            hideContactSearch();
            hideBookmarkSearch();
            if(!hasClass(getById("homeButton"),"selected")){
                getById("homeButton").click();
            }
            break;

        case "#filter":
            showFilter();
            lastHash="#filter";
            break;
                
        case "#productView":
            showProductView(url);
            unzoomPic();
            hideReviewPoster();
            hideContact();
            lastHash="#productView";
            break;
        
        case "#otherTab":
            hideProductView();
            hideContactSearch();
            hideBookmarkSearch();
            hideAccountSettings();
            hideSendFeedback();
            hideMakeComplaint();
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

        case "#contactSearch":
            showContactSearch();
        break;

        case "#bookmarkSearch":
            showBookmarkSearch();
        break;

        case "#accountSettings":
            showAccountSettings();
            hideChangePassword();
            hideEditProfile();
        break;

        case "#sendFeedback":
            showSendFeedback();
        break;

        case "#makeComplaint":
            showMakeComplaint();
        break;

        case "#changePassword":
            showChangePassword();
        break;

        case "#editProfile":
            showEditProfile();
        break;


    }
}

ini_scroll=0;
function sideScroll(page){
    page.setAttribute("onscrollend","");
    var width=page.offsetWidth;
    page.scrollLeft=Math.trunc(page.scrollLeft);
    //scrolling forward
    if((page.scrollLeft-ini_scroll)>(width/2)){   
        addClass(page,null,"frozen");
        for(i=page.scrollLeft;i<ini_scroll+width+10;i++){    
            page.scrollLeft++;    
        }
        ini_scroll=page.scrollLeft;
        removeClass(page,null,"frozen");
    }
    // scrolling backwards
    else if((ini_scroll-page.scrollLeft)>(width/2)){
        addClass(page,null,"frozen");
        for(i=page.scrollLeft;i>ini_scroll-width-10;i--){    
            page.scrollLeft--;  
        } 
        ini_scroll=page.scrollLeft;
        removeClass(page,null,"frozen");
    }
    //return back to ini_scroll
    else if(page.scrollLeft>ini_scroll){
        addClass(page,null,"frozen");
        for(i=page.scrollLeft;i>ini_scroll;i--){
            page.scrollLeft--;
        }
        removeClass(page,null,"frozen");
    }
    else if(page.scrollLeft<ini_scroll){
        addClass(page,null,"frozen");
        for(i=page.scrollLeft;i<ini_scroll;i++){
            page.scrollLeft++;
        }
        removeClass(page,null,"frozen");
    }
    page.setAttribute("onscrollend","sideScroll(this)");
}
function fastSideScroll(page){
    page.setAttribute("onscrollend","");
    // page.setAttribute("onscroll","");
    var width=page.offsetWidth;
    // //scrolling forward
    if((page.scrollLeft-ini_scroll)>(width/2)){
        addClass(page,null,"frozen");
        for(i=page.scrollLeft;i<=ini_scroll+width;i++){    
            page.scrollLeft++;
        }
        ini_scroll=page.scrollLeft;
        removeClass(page,null,"frozen");
    }
    // // scrolling backwards
    else if((ini_scroll-page.scrollLeft)>(width/2)){  
        addClass(page,null,"frozen");
        for(i=page.scrollLeft;i>ini_scroll-width;i--){    
            page.scrollLeft--;    
        } 
        ini_scroll=page.scrollLeft;
        removeClass(page,null,"frozen");
    }
    page.setAttribute("onscrollend","sideScroll(this)");
    // page.setAttribute("onscroll","fastSideScroll(this)");
}

function historyBack(){
    history.back();
}
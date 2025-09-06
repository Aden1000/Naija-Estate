var containers;
this.onload=function(){
    containers=[getById("dashboard"),getById("profileContainer"),getById("notificationsContainer"),getById("menuContainer")];
    if(this.location.hash!=""){
        // this.location.replace("file:///C:/Program%20Files/Ampps/www/Pages/buyer.html")
        history.back();
        if(this.location.hash!=""){
            history.back();
            if(this.location.hash!=""){
                history.back();
            }
        }
    }
    setTimeout(function(){
        addClass(getById("loadingContainer"),null,"hidden");
        this.onhashchange=function(){
            hashChanged(this.location.hash);
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

function switchMode(){
    if(this.location.hash!=""){
        history.back();
    }
    this.location.replace("buyer.html")
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

function fitPic(pic){
    if(pic.naturalWidth>pic.naturalHeight){
        removeClass(pic,null,"portrait");
        addClass(pic,null,"landscape");   
    }
    else{
        removeClass(pic,null,"landscape");
        addClass(pic,null,"portrait");
    }
}

function showFilter(){
    var filter=getById("dashboard").getElementsByClassName("searchFilterForm").item(0);
    var menu=getById("menuBar");
    filter.scrollTo(0,0);
    removeClass(filter,null,"hidden");
    addClass(menu,null,"hidden");
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
    addClass(getById("dashboard"),null,"shift");
    addClass(getById("menuBar"),null,"shift");
    if(lastHash=="" || lastHash=="#otherTab")
    document.querySelector("#productView>.mainContainer").scroll(0,0);
    removeClass(getById("productView"),null,"hidden");
    // //only place the url if there's a url
    productLoad=setTimeout(function(){
        //freeze the body
        addClass(getById("productLoading"),null,"hidden"); 
    },2000);
}

function hideProductView(){
    removeClass(getById("dashboard"),null,"shift");
    removeClass(getById("menuBar"),null,"shift");
    addClass(getById("productView"),null,"hidden");
    //incase the user goes back before the product loads completely
    clearTimeout(productLoad);
    setTimeout(() => {
        removeClass(getById("productLoading"),null,"hidden");
    }, 1000);
}

var statsLoading;
function showMarketStats(url){
    addClass(getById("dashboard"),null,"shift");
    addClass(getById("menuBar"),null,"shift");
    document.querySelector("#marketStats>.mainContainer").scroll(0,0);
    fitPic(document.querySelector("#marketStats .productPic img"));
    removeClass(getById("marketStats"),null,"hidden");
    // //only place the url if there's a url
    statsLoading=setTimeout(function(){
        //freeze the body
        addClass(getById("statsLoading"),null,"hidden"); 
    },2000);
}

function hideMarketStats(){
    removeClass(getById("dashboard"),null,"shift");
    removeClass(getById("menuBar"),null,"shift");
    addClass(getById("marketStats"),null,"hidden");
    //incase the user goes back before the product loads completely
    clearTimeout(statsLoading);
    setTimeout(() => {
        removeClass(getById("statsLoading"),null,"hidden");
    }, 1000);
}


function zoomPic(){
    addClass(getById("productView").getElementsByClassName("productPic").item(0),null,"zoom");
    getById("productView").getElementsByClassName("productPic").item(0).scroll(0,0);
    document.querySelectorAll("#productView .productPic img").forEach(function(item){
        fitPic(item);
    })
    // if(lastHash!="#productPic"){
    // }
}

function unzoomPic(){
    removeClass(getById("productView").getElementsByClassName("productPic").item(0),null,"zoom");
    getById("productView").getElementsByClassName("productPic").item(0).scroll(0,0);
    document.querySelectorAll("#productView .productPic img").forEach(function(item){
        fitPic(item);
    })
}

function reviewFilter(filter){
    document.querySelectorAll("#reviewFilter>div").forEach(function(item){
        removeClass(item,null,"selected");
    });
    addClass(filter,null,"selected");
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

var lastMenu="dashboardButton";
function changeMenu(menu){    
    removeClass(null,lastMenu,"selected");
    addClass(menu,null,"selected");
    lastMenu=menu.id;
    containers.forEach(function(item){
        removeClass(item,null,"selected");
    })
    switch(menu.id){
        case "dashboardButton":
            if(this.location.hash!=""){
                history.back();
            }
            addClass(containers[0],null,"selected");
        break;


        case "profileButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }
            addClass(containers[1],null,"selected");
        break;

        case "notificationButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }
            addClass(containers[2],null,"selected");
        break;

        case "menuButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }
            addClass(containers[3],null,"selected");
        break;
    }
}

var lastHash="";
function hashChanged(hash,url){
    switch(hash){
        case "":
            hideProductView();
            hideMarketStats();
            if(!hasClass(getById("dashboardButton"),"selected")){
                getById("dashboardButton").click();
            }
            break;

        case "#filter":
            showFilter();
            lastHash="#filter";
            break;
                
        case "#productView":
            showProductView(url);
            unzoomPic();
            lastHash="#productView";
            break;

        case "#marketStats":
           showMarketStats(url);
        break;
        
        case "#otherTab":
            hideProductView();
            hideAccountSettings();
            hideSendFeedback();
            hideMakeComplaint();
            lastHash="#otherTab";
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
            lastHash="#productPic"
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

function changeHash(hash){
    this.location.hash=hash;
    // if(hash!=""){
    // }
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

var containers;
this.onload=function(){
    containers=[getById("searchContainer"),getById("bookmarksContainer"),getById("menuContainer")];
    if(this.location.hash!=""){
        this.location.replace("file:///C://Users//Adriel//Documents//Naija-Estate//index.html")
    }
    setTimeout(function(){
        addClass(document.querySelector("#searchContainer .resultLoading"),null,"hidden");
        document.body.querySelectorAll("#searchContainer .searchResult").forEach(function(item){
            removeClass(item,null,"hidden");
        });
        this.onhashchange=function(){
            hashChanged(this.location.hash);
        }
        observeVideos(getByQueryAll("#searchContainer .searchResult"));
        observeVideos(getByQueryAll("#bookmarksContainer .searchResult"));
    },2000)

    //clear all textareas
    document.querySelectorAll("textarea").forEach(function(item){
        item.value="";
    })

}

this.onresize=function(){
    document.querySelectorAll(".propertyPic img").forEach(function(item){
        fitPic(item);
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

function getByQuery(query){
    return document.body.querySelector(query)
}

function getByQueryAll(query,index){
    if(query!=null){
        return document.body.querySelectorAll(query)
    }
    else{
        return document.body.querySelectorAll(query).item(index)
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

function toggleClass(object,id,className){
    if(hasClass(object,className)){
        removeClass(object,null,className)
    }
    else{
        addClass(object,null,className)
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
    this.location.replace("seller.html")
}

function showContactMenu(){
    removeClass(null,"contactsMenu","hidden");
}

function hideContactMenu(){
    addClass(null,"contactsMenu","hidden");
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

function fitVideo(vid){
    if(vid.videoWidth>vid.videoHeight){
        removeClass(vid,null,"portrait");
        addClass(vid,null,"landscape");  
    }
    else{
        removeClass(vid,null,"landscape");
        addClass(vid,null,"portrait");
    }
}

function canPlay(vid){
    addClass(vid,null,"canPlay");
    addClass(vid.parentElement,null,"loaded");
    removeClass(vid.parentElement.querySelector(".watchButton"),null,"hidden");
    observeVideos(vid.parentElement.parentElement);
}

function reloadVideo(vid){
    setTimeout(function(){
        vid.load();
        removeClass(vid.parentElement,"loaded");
    },2000)
}

function isPlaying(vid){
    addClass(vid,null,"playing");
    addClass(vid,null,"loaded");
}

function waiting(vid){
    removeClass(vid,null,"loaded");
}

function downloadVideo(){
    var vid=getByQuery("#propertyView video");
    var url=new URL(vid.src);
    var link=getByQuery("#downloadLink");
    url=url.pathname.split("/").pop();
    link.download=url;
    link.href=vid.src;
    link.click();
}
var hideControl;
function pauseVideo(vid){
    if(hasClass(vid,"playing")){
        clearTimeout(hideControl);
        vid.pause();
        getByQuery("#propertyView .playBtn").src="Images/Play.svg";
        removeClass(vid.parentElement.querySelector(".controls"),null,"hidden");
        removeClass(vid,null,"playing");
    }
    else{
        try{
            vid.play().then(function(){
                getByQuery("#propertyView .playBtn").src="Images/Pause.svg";
                hideControl=setTimeout(function(){
                    addClass(vid.parentElement.querySelector(".controls"),null,"hidden");
                },5000);
            })
        }
        catch(e){
            console.log(e);
        }
    }
}

function watchVideo(vid){
    getByQuery("#propertyView video").src=vid.src;
    this.location.hash="#propertyView";
}

function seekVideo(action){
    var vid=getByQuery("#propertyView video");
    switch(action){
        case "back":
            vid.currentTime-=10;
            clearTimeout(hideControl);
            try{
                vid.play().then(function(){
                    getByQuery("#propertyView .playBtn").src="Images/Pause.svg";
                    hideControl=setTimeout(function(){
                        addClass(vid.parentElement.querySelector(".controls"),null,"hidden");
                    },5000);
                })
            }
            catch(e){
                console.log(e);
            }
        break;

        case "forward":
            vid.currentTime+=10;
            clearTimeout(hideControl);
            try{
                vid.play().then(function(){
                    getByQuery("#propertyView .playBtn").src="Images/Pause.svg";
                    hideControl=setTimeout(function(){
                        addClass(vid.parentElement.querySelector(".controls"),null,"hidden");
                    },5000);
                })
            }
            catch(e){
                console.log(e);
            }
        break;

    }
}

function dataLoaded(vid){
    vid.setAttribute("oncanplay","canPlay(this)");
    canPlay(vid);
    // if(vid.parentElement.querySelector(".background")==null){
    //     var vid2=document.createElement("video");
    //     vid2.src=vid.src;
    //     vid2.preload="metadata";
    //     vid2.muted=true;
    //     vid2.className="background";
    //     vid2.setAttribute("onerror","reloadVideo(this)");
    //     vid2.setAttribute("type","video/mp4");
    //     vid.parentElement.append(vid2);
    //     vid2.onloadeddata=setTimeout(function(){
    //         vid2.currentTime=2;
    //         vid.setAttribute("oncanplay","canPlay(this)");
    //         canPlay(vid);
    //     },1000);
    // }
}

var lastVideo=null;
function observeVideos(vid){
    var root;
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        root=entry.target.parentElement.parentElement;
        if(entry.isIntersecting){
            entry.target.querySelector("video").setAttribute("preload","metadata");
            if(entry.target.querySelector("video").src==""){
                entry.target.querySelector("video").src=entry.target.querySelector("video").dataset.src; 
            }
            // if(hasClass(entry.target.querySelector("video"),"canPlay")){
            //     entry.target.querySelector("video").play().then(function(){
            //         addClass(entry.target.querySelector("video"),null,"playing");
            //         if(lastVideo!=null && lastVideo!=entry.target.querySelector("video")){
            //             try{
            //                 lastVideo.parentElement.querySelector(".background").remove();
            //             }
            //             catch(e){
            //                 console.log(e);
            //             }
            //             lastVideo.setAttribute("preload","none");
            //             removeClass(lastVideo,null,"canPlay");
            //             removeClass(lastVideo,null,"playing");
            //             removeClass(lastVideo.parentElement,null,"loaded");
            //             lastVideo.src="";
            //             lastVideo.removeAttribute("src");
            //         }
            //     });
            // }
            // else{
            //     entry.target.querySelector("video").setAttribute("preload","metadata");
            //     if(entry.target.querySelector("video").src==""){
            //         entry.target.querySelector("video").src=entry.target.querySelector("video").dataset.src; 
            //     }
            // }
        }
        // else{
        //     if(hasClass(entry.target.querySelector("video"),"playing")){
        //         entry.target.querySelector("video").pause();
        //     }
        //     lastVideo=entry.target.querySelector("video");
        // }
      })
    }, { threshold: 1, root: root}); // Play when 70% visible
    try{
      vid.forEach(function(vid){
        observer.observe(vid);
      });
    }
    catch(e){
      try{
        observer.observe(vid);
      }
      catch(e){
        console.log(e);
      }
    }  
}

function showDetails(){
    removeClass(getByQuery("#propertyView .propertyDetails"),null,"hidden")
}

function hideDetails(){
    addClass(getByQuery("#propertyView .propertyDetails"),null,"hidden")
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
    //this function hides every element floating above the screen, such as the property view element, filter element etc
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

//variables holding the initial values of the search filter

var initial_filter=new Array;
initial_filter["location"]="";
initial_filter["Min"]="";
initial_filter["Max"]="";
initial_filter["stars"]=null;

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
    // var star=initial_filter["stars"];
    // if(star==null){
    //     for(j=0;j<5;j++){
    //         removeClass(getById("RatingSelector").children.item(j),null,"selected");
    //     }
    // }
    // else{
    //     for(j=0;j<5;j++){
    //         removeClass(getById("RatingSelector").children.item(j),null,"selected");
    //     }
    //     addClass(getById("RatingSelector").children.item(star),null,"selected");
    // }
}

function clearFilter(){
    initial_filter["location"]="";
    initial_filter["Min"]="";
    initial_filter["Max"]="";
    initial_filter["stars"]=null;
    hideFilter();
    applyFilter();
    getByQueryAll("#searchContainer .mainContainer a").forEach(function(item){
            addClass(item,null,"hidden");
        });
    removeClass(getByQuery("#searchContainer .resultLoading"),null,"hidden")
    setTimeout(function(){
        addClass(getByQuery("#searchContainer .resultLoading"),null,"hidden");
        getByQueryAll("#searchContainer .mainContainer a").forEach(function(item){
            removeClass(item,null,"hidden");
        });
    },5000)
}


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
    // for(j=0;j<5;j++){
    //     if(hasClass(getById("RatingSelector").children.item(j),"selected")){
    //         filterCount++;
    //         initial_filter["stars"]=j;
    //         break;
    //     }
    //     else{
    //         initial_filter["stars"]=null;
    //     }
    // }
    initial_filter["location"]=getById("filterLocation").value;
    initial_filter["Min"]=getById("filterMinPrice").value;
    initial_filter["Max"]=getById("filterMaxPrice").value;
    var filterCountElement=getById("FilterCount");
    if(filterCount>0){
        filterCountElement.innerHTML=filterCount;
        removeClass(filterCountElement,null,"hidden")
       getByQueryAll("#searchContainer .mainContainer a").forEach(function(item){
            addClass(item,null,"hidden");
        });
        removeClass(document.querySelector("#searchContainer .resultLoading"),null,"hidden")
        
        
        setTimeout(function(){
            addClass(document.querySelector("#searchContainer .resultLoading"),null,"hidden");
            getByQueryAll("#searchContainer .mainContainer a").forEach(function(item){
                removeClass(item,null,"hidden");
                });
            
            },5000)
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

var propertyLoad;
function showpropertyView(){
    //display the loading container
    addClass(getById("searchContainer"),null,"shift");
    addClass(getById("bookmarksContainer"),null,"shift");
    addClass(getById("menuBar"),null,"shift");
    removeClass(getById("propertyView"),null,"hidden");
    // // //only place the url if there's a url
    // setTimeout(function(){
    //     //freeze the body
    //     addClass(getById("propertyLoading"),null,"hidden"); 
    //     document.body.querySelectorAll("#propertyView>.mainContainer>*:not(#propertyLoading,.banner)").forEach(function(item){
    //     removeClass(item,null,"hidden");
    // });
    // },3000);
}

function hidepropertyView(){
    removeClass(getById("searchContainer"),null,"shift");
    removeClass(getById("bookmarksContainer"),null,"shift");
    removeClass(getById("menuBar"),null,"shift");
    addClass(getById("propertyView"),null,"hidden");
    addClass(getByQuery("#propertyView .controls"),null,"hidden");
    //incase the user goes back before the property loads completely
    clearTimeout(propertyLoad);
}

function zoomPic(pic){
    addClass(pic,null,"zoom");
    pic.scroll(0,0);
}

function unzoomPic(){
    removeClass(getById("propertyView").getElementsByClassName("propertyPic").item(0),null,"zoom");
    getById("propertyView").getElementsByClassName("propertyPic").item(0).scroll(0,0);
}

var loadContact;
function showContact(){
    var contact=getById("sellerContact");
    var main=getByClass("mainContainer",0);
    var property=getByQuery("#propertyView");
    addClass(main,null,"frozen");
    addClass(property,null,"shift");
    addClass(getById("showContact"),null,"shift");
    removeClass(contact,null,"hidden");
    contact.click();
    if(lastHash!="#contactPic"){
        loadContact=setTimeout(function(){
            addClass(getByQuery("#profileLoading"),null,"hidden");
            removeClass(getByQuery("#sellerContact .mainContainer"),null,"hidden")
            addClass(getByQuery("#propertyView>.mainContainer"),null,"shift")
        },2000);
    }
    else{
        removeClass(getByQuery("#profilePic>div"),null,"zoom")
    }
}

function hideContact(){
    clearTimeout(loadContact);
    var contact=getById("sellerContact");
    var main=getByClass("mainContainer",0);
    var property=getByQuery("#propertyView");
    contact.click();
    removeClass(main,null,"frozen");
    removeClass(property,null,"shift");
    removeClass(getById("showContact"),null,"shift");
    removeClass(getByQuery("#propertyView>.mainContainer"),null,"shift")
    addClass(contact,null,"hidden");
    removeClass(getByQuery("#profileLoading"),null,"hidden");
    contact.scrollTo(0,0);
    addClass(getByQuery("#sellerContact .mainContainer"),null,"hidden")
}

function saveContact(link){
    link.setAttribute("onclick","");
    link.innerHTML="<img src='../Images/Loading.svg'> Adding Contact";
    var img=link.firstElementChild;        
    addClass(img,null,"loadingImg");
    setTimeout(function(){
            removeClass(img,null,"loadingImg");
            addClass(link,null,"saved");
            link.innerHTML="Contact saved";
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
    addClass(getById("propertyView").getElementsByClassName("mainContainer").item(0),null,"shift")
    removeClass(poster,null,"hidden");
    resetReviewPoster();
}

function hideReviewPoster(){
    var poster=getById("reviewPoster");
    var main=getByClass("mainContainer",0);
    removeClass(main,null,"frozen");
    removeClass(main,null,"shift");
    removeClass(getById("showContact"),null,"shift");
    removeClass(getById("propertyView").getElementsByClassName("mainContainer").item(0),null,"shift")
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
                if(this.location.hash=="#otherTab"){
                    history.back();
                }
                else{
                    history.back();
                    history.back();
                }
            }            
            addClass(containers[0],null,"selected");
        break;

        case "bookmarkButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }

            if(this.location.hash=="#bookmarkSearch"){
                history.back();
            }
            document.querySelectorAll("#bookmarksContainer .searchResult").forEach(function(item){
                addClass(item,null,"hidden");
            });
            removeClass(document.querySelector("#bookmarksContainer .resultLoading"),null,"hidden");
            setTimeout(function(){
                document.querySelectorAll("#bookmarksContainer .searchResult").forEach(function(item){
                    removeClass(item,null,"hidden");
                });
                addClass(document.querySelector("#bookmarksContainer .resultLoading"),null,"hidden");
            },2000)
            addClass(containers[1],null,"selected");
        break;

        case "menuButton":
            if(this.location.hash==""){
                this.location.hash="otherTab";
            }

            if(this.location.hash=="#bookmarkSearch" || this.location.hash=="#contactSearch"){
                history.back();
            }
            addClass(containers[2],null,"selected");
        break;
    }
}

var lastHash="";
function hashChanged(hash,url){
    switch(hash){
        case "":
            hidepropertyView();
            hideFilter();
            hideBookmarkSearch();
            hideContactMenu();
            if(!hasClass(getById("homeButton"),"selected")){
                getById("homeButton").click();
            }
            lastHash="";
            break;

        case "#filter":
            showFilter();
            lastHash="#filter";
            break;
                
        case "#propertyView":
            showpropertyView(url);
            hideDetails();
            lastHash="#propertyView";
            break;

        case "#details":
            showDetails();
            lastHash="#details";
            break;
        
        case "#otherTab":
            hidepropertyView();
            hideBookmarkSearch();
            hideAccountSettings();
            hideSendFeedback();
            hideMakeComplaint();
            lastHash="#otherTab";
        break;

        case "#contactsMenu":
            showContactMenu();    
        break;

        case "#review":
            showReviewPoster();
            lastHash="#review";
            break;

        case "#contact":
            showContact();
            lastHash="#contact";
            break;

        case "#contactPic":
            zoomPic(getByQuery("#profilePic>div"));
            lastHash="#contactPic";
            break;

        case "#propertyPic":
            zoomPic(getByQuery("#propertyView .propertyPic"));
            lastHash="#contact";
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
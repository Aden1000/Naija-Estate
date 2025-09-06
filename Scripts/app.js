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
// this.onload=function(){
//     if(history.length>2){
//         history.back();
//     }
// }

var lastMenu="home"
function changeMenu(menu){
    for(j=0;j<5;j++){
        removeClass(getById("menuBar").children.item(j),null,"selected");
    }
    addClass(menu,null,"selected");
}

function zoomFrame(frame){
    addClass(frame,null,"zoom");
}

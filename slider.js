function Slider(thisSlider, sliderCallback){
    
    function makeMarkers(){
        var markers = document.createElement("table");
        var row = document.createElement("tr");
        for (var i = 0; i < data.length; i++){
            var cell = document.createElement("td");
            cell.style.width = (100 / data.length)+ "%";
            row.appendChild(cell);
        }
        markers.appendChild(row);
        var clone = row.cloneNode(true);
        markers.appendChild(clone);
        slider.appendChild(markers);
    }

    function thumbAndTip(){
        thumb = document.createElement("div");
        thumb.classList.add("thumb");
        slider.appendChild(thumb);
        tip = document.createElement("div");
        tip.classList.add("tip");
        slider.appendChild(tip);
    }

    function update(val){
        // find nearest stop where thumb should rest
        var stopSize = 200 / (data.length);
        index = (val ? data.indexOf(val) : Math.floor(left / stopSize));
        stopLeft = (index * stopSize) + (stopSize / 2);
        value = data[index];
        if (val) {
            // initialization
            left = stopLeft;
        }
        //console.log(val,index,left);
        thumb.style.left = (left - 10) + "px";
        tip.style.left = (left - 30) + "px";
        tip.textContent = value;
    }

    function startMove(ev){
        // store offset of thumb
        dragOffset = ev.clientX - left;
        // setup events on slider (not on thumb - to avoid dropping out when cursor moves fast)
        slider.addEventListener("mousemove", trackMove);
        slider.addEventListener("mouseup", endMove);
        slider.addEventListener("mouseleave", endMove);
    }
    
    function trackMove(ev){
        // find the 'left' requried for thumb to follow cursor
        left = Math.max(Math.min(ev.clientX - dragOffset, 199), 0);
        update();
    }
    
    function endMove(ev){
        // remove the event handlers on slider
        ev.currentTarget.removeEventListener("mousemove", trackMove);
        ev.currentTarget.removeEventListener("mouseup", endMove);
        ev.currentTarget.removeEventListener("mouseleave", endMove);

        // jump to stop
        left = stopLeft;
        update();
        slider.setAttribute("value", value);
        callback(slider, value);
    }

    function clear(){
        thumb.removeEventListener("mousedown", startMove);
    }

    var slider = thisSlider;
    var thumb; // to hold thumb element
    var tip; // to hold tip element
    var callback = sliderCallback;

    // members
    var data = slider.getAttribute("data").split(","); // list of stops
    var dragOffset; // to hold left-offset when drag starts
    var left; // to hold thumb.left while moving
    var index; // current index
    var value; // current value
    var stopLeft; // left value for current stop

    // setup elements
    slider.classList.add( "slider" );
    makeMarkers();
    thumbAndTip();
    // set initial thumb position
    update( slider.getAttribute( "value" ) );
    // set event to start dragging thumb
    thumb.addEventListener("mousedown", startMove);
}

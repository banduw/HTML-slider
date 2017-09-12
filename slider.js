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
        slider.appendChild(markers);
    }

    function thumbAndTip(){
        input = document.createElement("input");
        input.max = 200 - 1;
        input.min = 0;
        input.type = "range";
        slider.appendChild(input);
        tip = document.createElement("div");
        tip.classList.add("tip");
        tipHolder = document.createElement("div");
        tipHolder.classList.add("tip-holder");
        tipHolder.appendChild(tip);
        slider.appendChild(tipHolder);
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
        tipHolder.style.left = (left - 50) + "px";
        tip.textContent = value;
    }

    function trackMove(ev){
        // find the 'left' requried for tip to follow cursor
        left = Number(input.value);
        update();
    }
    
    function endMove(ev){
        // jump to stop
        left = Number(input.value);
        update();
        input.value = stopLeft;
        slider.setAttribute("value", value);
        callback(slider, value);
    }

    function clear(){
        thumb.removeEventListener("mousedown", startMove);
    }

    var slider = thisSlider;
    var input; // to hold input range element
    var tip; // to hold tip element
    var tipHolder; // to hold and center the tip
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
    input.addEventListener("input", trackMove);
    input.addEventListener("change", endMove);
}

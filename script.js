// get a reference to all of the divs with the class 'frame' - like an array
const frames = document.getElementsByClassName("frame");
// get a ref to the modal div - a single element
const modal = document.getElementById("modal");
// used to track animation interval
let startTime = -1;
// interval in milliseconds
const animationInterval = 200;
// all the snowflakes
const flakes = [];
// today's date
const currentDay = new Date().getDate();
// add on click event listener to close text of modal and hide modal
// [0] refers to the first child in the div
modal.children[0].onclick = (event) => {
    modal.style.display = "none";
}


// loop through all of the frames
for (let i = 0; i < frames.length; i++) {
    // create a <p> element
    let p = document.createElement("p");
    // add the corresponding date number
    p.innerHTML = i + 1;
    // attach the <p> to the corresponding frame
    frames[i].append(p);

    // add onclick event listener to each frame 
    frames[i].onclick = (event) => {
        modal.style.display = "block";
        if (i < currentDay) {
            // change CSS display property of modal

            modal.children[1].innerHTML = messages[i].title;
            modal.children[2].innerHTML = messages[i].text;
        } else {
            modal.children[1].innerHTML = "Intrusion!";
            modal.children[2].innerHTML = "Wait for the day to come..."
        }
    }
}
    function snowFall(timeStamp) {
        // set the initial start time 
        if (startTime == -1) {
            startTime = timeStamp;
        }
        // calculate time elapsed since start time
        let elapsedTime = timeStamp - startTime;
        // if elapsed time is greated than specified interval (500)
        if (elapsedTime > animationInterval && flakes.length < 100) {
            let flake = document.createElement("div");
            flake.classList.add("flake");
            document.body.appendChild(flake);
            flake.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
            flake.style.top = "0px"
            flakes.push(flake)
            startTime = timeStamp;
        }
        for (let f = 0; f < flakes.length; f++) {
            // get the current top CSS value
            let topString = flakes[f].style.top;
            // extract the number part eg 10 from 10px
            let y = Number(topString.substr(0, topString.length - 2))
            // add 2 to the current y position to send the flake downwards
            y += 2;
            if (y > window.innerHeight) {
                flakes[f].style.top = "0px"
            } else {
                flakes[f].style.top = y + "px"
            }

        }
        requestAnimationFrame(snowFall)
    }
    requestAnimationFrame(snowFall)
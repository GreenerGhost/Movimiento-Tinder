let isAnimating = false;
let pullDeltaX = 0; // distance from the card being dragged

function startDrag (event) {
    if (isAnimating) return

    // get the first article element
    const actualCard = event.target.closest("article");
    if (!actualCard) return

    // get initial position of mouse or finger
    const startX = event.pageX ?? event.touches[0].pageX;

    // listen the mouse and touch movements
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);

    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });

    function onMove (event) {
        // current position of mouse or finger
        const currentX = event.pageX ?? event.touches[0].pageX;
    
        // the distance between the initial and current position
        pullDeltaX = currentX - startX;

        // no distance
        if (pullDeltaX === 0) return

        // change the flag to indicate we are animating
        isAnimating = true;

        // calculate the rotation of the card using the distance
        const deg = pullDeltaX / 14;

        // apply the transformation to the card
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;
        // change the cursor to grabbing
        actualCard.style.cursor = "grabbing";
    
    };
    
    function onEnd (event) {
        // remove the event listeners
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onEnd);

        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onEnd);

        // TODO: TO REMOVE AS WE'RE DOING THIS OTHER WAY

        // reset the flag
        isAnimating = false;
        // reset the distance
        pullDeltaX = 0;
        // reset the transformation
        actualCard.style.transform = "none";
        // reset the cursor
        actualCard.style.cursor = "grab";
    };
};

document.addEventListener("mousedown", startDrag);
document.addEventListener("touchstart", startDrag, { passive: true });
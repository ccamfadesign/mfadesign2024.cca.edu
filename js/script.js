var leading = 72;
var wheel = 0;
var offset = 0;
var lastOffset = 0;
var lastY = 0;
var title = document.title + " ";
var pos = 0;
var displayVideos = true; // Global flag to control video display

function tickTitle() {
  document.title = title.substring(pos, title.length) + title.substring(0, pos);
  pos++;
  if (pos > title.length) pos = 0;
}

var x = (y = z = lastX = lastY = lastZ = 0);

window.addEventListener("devicemotion", function (event) {
  x = event.accelerationIncludingGravity.x;
  y = event.accelerationIncludingGravity.y;
  z = event.accelerationIncludingGravity.z;

  var deltaX = lastX - x;
  var deltaY = lastY - y;
  var deltaZ = lastZ - z;

  var deltaA = Math.max(deltaX, deltaY, deltaZ);

  if (Math.abs(deltaA) > 0.2) onOffset();

  lastX = x;
  lastY = y;
  lastZ = z;
});

window.addEventListener("touchstart", function (event) {
  event.preventDefault();
  if (event.touches[0].clientX < window.innerWidth / 2) {
    lastY = event.touches[0].clientY;
  }
});

window.addEventListener("touchmove", function (event) {
  event.preventDefault();
  if (event.touches[0].clientX < window.innerWidth / 2) {
    var currentY = event.touches[0].clientY;
    var delta = currentY - lastY;

    wheel += delta;
    offset = Math.floor(wheel / leading) * leading;

    if (lastOffset !== offset) onOffset(delta > 0);

    lastOffset = offset;
    lastY = currentY;
  }
});

window.addEventListener("mousewheel", function (event) {
  event.preventDefault();
  if (event.clientX < window.innerWidth / 2) {
    wheel += event.deltaY;

    offset = Math.floor(wheel / leading) * leading;

    if (lastOffset !== offset) onOffset(event.deltaY > 0);

    lastOffset = offset;
  }
});

function onOffset(up) {
  tickTitle();

  Array.from(document.querySelectorAll(".col")).forEach(function (el, i) {
    var lines = el.innerHTML.trim().split("\n");

    if (i % 2 === (up ? 0 : 1)) {
      lines.push(lines.shift());
    } else {
      lines.unshift(lines.pop());
    }

    el.innerHTML = lines.join("\n");
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const randomIndex = Math.floor(Math.random() * 4) + 1; // Generate a random number between 1 and 4
  const activeVideo = "video" + randomIndex;

  // Pause and hide all videos
  ["video1", "video2", "video3", "video4"].forEach((id) => {
    const video = document.getElementById(id);
    video.pause();
    video.style.display = "none";
  });

  // Show and play the active video
  const active = document.getElementById(activeVideo);
  active.style.display = "block";
  active.play();
});

document.addEventListener("mousemove", function (e) {
  if (!displayVideos) return; // Check global flag before showing videos

  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = e.clientX;
  const y = e.clientY;

  let activeVideo = null;

  if (x < width / 2 && y < height / 2) {
    activeVideo = "video1";
  } else if (x >= width / 2 && y < height / 2) {
    activeVideo = "video2";
  } else if (x < width / 2 && y >= height / 2) {
    activeVideo = "video3";
  } else if (x >= width / 2 && y >= height / 2) {
    activeVideo = "video4";
  }

  // Pause and hide all videos
  ["video1", "video2", "video3", "video4"].forEach((id) => {
    const video = document.getElementById(id);
    video.pause();
    video.style.display = "none";
  });

  // Show and play the active video
  const active = document.getElementById(activeVideo);
  active.style.display = "block";
  active.play();
});

document.addEventListener("DOMContentLoaded", (event) => {
  var links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.target = "_blank"; // Sets target attribute to '_blank' for each link
  });
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only prevent default if it's a js-link
      if (link.classList.contains("name-link")) {
        e.preventDefault(); // Prevent default action for links
        displayVideos = false; // Set flag to false on link click

        // // Pause and hide all videos
        // ["video1", "video2", "video3", "video4"].forEach((id) => {
        //   const video = document.getElementById(id);
        //   if (video) {
        //     video.pause();
        //     video.style.display = "none";
        //   }
        // });
      }
    });
  });
});

const imageContainer = document.getElementById("imageContainer");

function showImage(imageName) {
  const imageContainer = document.getElementById("imageContainer");
  if (!imageContainer) {
    console.log("Image container not found!");
    return;
  }
  imageContainer.style.display = "block";
  imageContainer.src = imageName; // Ensure the path to images is correct
  imageContainer.alt = "Image of " + imageName.replace("images/", "").replace(".png", "");
  
}

function showAndFilterTable(name) {
  const table = document.querySelector(".tableScrollable");
  if (table) {
    table.style.display = "block"; // Ensure this is here to show the table
    const rows = table.querySelectorAll("tr");
    rows.forEach((row) => {
      if (row.dataset.name === name) {
        row.style.display = "table-row";
      } else {
        row.style.display = "none";
      }
    });
  }
}

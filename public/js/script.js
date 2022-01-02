setTimeout(function () {
  $("#loader").addClass("d-none");
}, 5000);
AOS.init();
// VANTA JS
VANTA.NET({
  el: "#hero",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0xffffff,
  backgroundColor: 0x4948bb,
  maxDistance: 12.0,
});
VANTA.NET({
  el: "#airdrop-header",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0xffffff,
  backgroundColor: 0x4948bb,
  maxDistance: 12.0,
});

// COUNTDOWN
var countDownDate = new Date("Jan 14, 2022 00:00:00").getTime();

var x = setInterval(function () {
  var now = new Date().getTime();

  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("time").innerHTML =
    days + " : " + hours + " : " + minutes + " : " + seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("time").innerHTML = "EXPIRED";
  }
}, 1000);

// COPY REFFERAL LINK
var text_to_copy = document.getElementById("text_to_copy").innerHTML;
var copy_button = document.getElementById("copy_button");

copy_button.addEventListener("click", function () {
  var temp = document.createElement("INPUT");
  temp.value = text_to_copy;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
  copy_button.innerHTML = "copied";
});

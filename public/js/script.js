// COUNTDOWN
var countDownDate = new Date("Sep 4, 2022 00:00:00").getTime();

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
var copy_button = document.getElementById("copy_button");

copy_button.addEventListener("click", function () {
  var text_to_copy = document.getElementById("text_to_copy").innerHTML;
  var temp = document.createElement("INPUT");
  temp.value = text_to_copy;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  temp.remove();
  copy_button.innerHTML = "copied";
});

function participate() {
  $(".participate-submit").html("Submitting...");
  const wallet = $(".wallet").val();
  const email = $("#email").val();
  const twitter = $("#twitter").val();
  const telegram = $("#telegram").val();
  const referre = $("#referre").val();
  $.ajax({
    type: "POST",
    url: "/",
    timeout: 5000,
    data: {
      wallet: wallet,
      email: email,
      twitter: twitter,
      telegram: telegram,
      referre: referre,
    },
    dataType: "json",
    success: function (data) {
      $(".participate-submit").html("Submit");
      $(".airdrop-success-msg").html("<p>" + data.message + "</p>");
    },
  });
}

$(".participate-submit").on("click", function (event) {
  event.preventDefault();
  validateForm();
});








function checkDetails() {
  $(".participant-search").html("Searching...")
  const wallet = $(".wallet-details").val();
  if(wallet == ""){
    $(".participant-search").html("Search");
  }else{
  $.ajax({
    type: "GET",
    url: "/data",
    timeout: 5000,
    data: {
      wallet: wallet
    },
    dataType: "json",
    success: function (data) {
      $(".participant-search").html("Search")
      $(".search-success-msg").html("<p>" + data.message + "</p>");
      let link = 
      $(".the-ref").html( `https://airdrop.kiwanoswap.io/${data.refLink}`);
      $(".referred").html(data.referred);
      let theBalance = data.referred * 10 + data.balance;
      $(".balance").html("" + theBalance + "");
    },
  });
}}

$(".participant-search").on("click", function (event) {
  event.preventDefault();
  checkDetails();
});


function validateForm(){
  const wallet = $(".wallet").val();
  const email = $("#email").val();
  const twitter = $("#twitter").val();
  const telegram = $("#telegram").val();
  let emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  let twitterReg = new RegExp('@+[A-Z, a-z, 0-9, _, -]{1,20}');
  let telegramReg = new RegExp('@+[A-Z, a-z, 0-9, _, -]{1,20}');
  let walletReg = new RegExp('0x+[A-F, a-f, 0-9]{40}');
  if( wallet == "" || email == "" || twitter == "" || telegram == ""){
    $(".participate-submit").html("Submit");
    $(".airdrop-success-msg").html("<p> Form Information Invalid! </p>");
  }else if(emailReg.test(email) == true && walletReg.test(wallet) == true && twitterReg.test(twitter) == true && telegramReg.test(telegram) == true){
    participate();
  }else{
    $(".participate-submit").html("Submit");
    $(".airdrop-success-msg").html("<p> Form Information Invalid! </p>");
  }
 
}
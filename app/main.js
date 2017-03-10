import style from "./styles.css";
import canvasElem from "./canvas";

canvasElem.c();
const canvas = document.getElementById("canvas-element");
const main_content = document.querySelector(".main-content");
const day_display = document.getElementById("day-display");
const form = document.getElementById("registration-form");
const form_wrap = document.querySelector(".form-wrapper");
const post_result = document.querySelector(".post-result");

main_content.onmouseover = () => {
  canvas.style.filter = "blur(5px)";
}

main_content.onmouseout = () => {
  canvas.style.filter = "blur(0)";
}

var cdDate = new Date("Mar 24, 2017 00:00:00").getTime();

var timer = setInterval(() => {
  let now = new Date().getTime();
  let timelength = cdDate - now;
  let days = Math.floor(timelength / (1000 * 60 * 60 * 24));

  day_display.innerHTML = `${days} days to go`;

  if (timelength < 0) {
    day_display.innerHTML = `The game is currently open.`;
  }

  if ((timelength + 3) < 0) {
    day_display.innerHTML = `The game is closed.`;
  }

}, 1000);

function post(url, data) {
  console.log("D", data);
  return fetch(url, {
      method: 'post',
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }),
      body: data
    })
    .then(function(data) {
      //console.log(data);
      //console.log('Request succeeded with JSON response', data);
    })
    .catch(function(error) {
      console.log('Request failed', error);
    });
}

form.onsubmit = (event) => {
  event.preventDefault();
  event.stopPropagation();
  var mail_val = form.mail.value;
  form_wrap.style.visibility = "hidden";
  form_wrap.style.opacity = "0";
  post_result.style.visibility = "visible";
  post_result.style.opacity = "1";

  var res = post("/form", mail_val);
}

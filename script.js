// ================= MUSIC =================
function playMusic() {
  const music = document.getElementById("background-music");
  music.play().catch(() => {});
}

window.addEventListener("DOMContentLoaded", function () {
  playMusic();

  // 🔒 Hide heart initially
  const heartWrap = document.querySelector(".hrt");
  if (heartWrap) heartWrap.style.display = "none";
});

document.body.addEventListener("click", playMusic, { once: true });

// ================= COUNTDOWN =================
const content = document.getElementById("content");
const timer = document.getElementById("timer");

const second = 1000,
  minute = second * 60,
  hour = minute * 60;

let countDown = new Date("Oct 22, 2023 00:00:00").getTime();

let x = setInterval(function () {
  let now = new Date().getTime();
  let distance = countDown - now;

  document.getElementById("hours").innerText = Math.floor(distance / hour);
  document.getElementById("minutes").innerText = Math.floor(
    (distance % hour) / minute
  );
  document.getElementById("seconds").innerText = Math.floor(
    (distance % minute) / second
  );

  if (distance < 0) {
    timer.classList.add("d-none");
    confetti();
    clearInterval(x);
    _slideSatu();
  }
}, second);

// ================= SLIDES =================
function _slideSatu() {
  const tap = document.getElementById("tap");
  const slide = document.getElementById("slideSatu");

  slide.classList.remove("d-none");

  setTimeout(() => {
    tap.classList.remove("d-none");
    document.body.onclick = () => _slideDua();
  }, 7000);
}

function _slideDua() {
  const slide1 = document.getElementById("slideSatu");
  const slide2 = document.getElementById("slideDua");
  const tap = document.getElementById("tap");

  slide1.classList.replace("animate__slideInDown", "animate__backOutDown");
  tap.classList.add("d-none");

  setTimeout(() => slide1.remove(), 1000);

  slide2.classList.remove("d-none");

  setTimeout(() => {
    tap.classList.remove("d-none");
    document.body.onclick = () => {
      slide2.classList.replace("animate__zoomInDown", "animate__fadeOutLeft");
      tap.classList.add("d-none");
      setTimeout(() => {
        slide2.remove();
        _slideTiga();
      }, 1000);
    };
  }, 32000);
}

function _slideTiga() {
  const slide = document.getElementById("slideTiga");
  const tap = document.getElementById("tap");

  slide.classList.remove("d-none");

  setTimeout(() => {
    tap.classList.remove("d-none");
    document.body.onclick = () => {
      slide.classList.replace("animate__fadeInRight", "animate__fadeOut");
      tap.remove();
      setTimeout(() => {
        slide.remove();
        _slideEmpat();
      }, 1000);
    };
  }, 35000);
}

function getRandomPosition(el) {
  return [Math.random() * 400, Math.random() * 400];
}

function _slideEmpat() {
  const slide = document.getElementById("slideEmpat");
  const btns = slide.getElementsByTagName("button");

  slide.classList.remove("d-none");

  btns[0].onclick = () => {
    const [x] = getRandomPosition(slide);
    slide.style.top = x + "px";
  };

  btns[1].onclick = () => {
    slide.classList.replace("animate__fadeInDown", "animate__bounceOut");
    setTimeout(() => {
      slide.remove();
      _slideLima();
    }, 1000);
  };
}

function _slideLima() {
  const slide = document.getElementById("slideLima");
  const trims = document.getElementById("trims");

  slide.classList.remove("d-none");

  setTimeout(() => trims.classList.remove("d-none"), 1000);

  slide.addEventListener("animationend", () => {
    slide.classList.replace("animate__bounceIn", "animate__fadeOut");
    trims.classList.add("animate__fadeOut");

    setTimeout(() => {
      slide.remove();
      trims.remove();

      // ❤️ FINAL SURPRISE — SHOW HEART
      const heartWrap = document.querySelector(".hrt");
      if (heartWrap) {
        heartWrap.style.display = "flex";
        heartWrap.classList.add(
          "animate__animated",
          "animate__fadeInUp",
          "animate__slow"
        );
        enableHeartRedirect();
      }
    }, 3000);
  });
}

// ================= TYPEIT =================
new TypeIt("#teks1", {
  strings: [
    "Today, I send all my best prayers to you.",
    "May the things that make you fall also become the reason for you to continue growing.",
    "May the world always protect you wherever you are.",
    "May your days always be filled with boundless love.",
    "May every step you take be made easy until you achieve what you desire.",
  ],
  startDelay: 4000,
  speed: 75,
  waitUntilVisible: true,
}).go();

new TypeIt("#teks2", {
  strings: [
    "With or without me, may the universe always make you happy in whatever way it takes.",
    " ",
    "I will support you through all your joys and sorrows and everything else. ",
    " ",
    "You just move forward I will stand by you through everything.",
    " ",
    "- Wish you all the best.",
    "And also",
    "- Wishing you the Happiest Birthday Ever!",
  ],
  startDelay: 2000,
  speed: 75,
  waitUntilVisible: true,
}).go();

new TypeIt("#trims", {
  strings: ["Thank You..."],
  startDelay: 2000,
  speed: 150,
}).go();

("use strict");

var onlyOnKonami = false;

function confetti() {
  // Globals
  var $window = $(window),
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,
    PI = Math.PI,
    PI2 = PI * 2,
    timer = undefined,
    frame = undefined,
    confetti = [];

  var runFor = 2000;
  var isRunning = true;

  setTimeout(() => {
    isRunning = false;
  }, runFor);

  // Settings
  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    pointer = 0;

  var particles = 150,
    spread = 20,
    sizeMin = 5,
    sizeMax = 12 - sizeMin,
    eccentricity = 10,
    deviation = 100,
    dxThetaMin = -0.1,
    dxThetaMax = -dxThetaMin - dxThetaMin,
    dyMin = 0.13,
    dyMax = 0.18,
    dThetaMin = 0.4,
    dThetaMax = 0.7 - dThetaMin;

  var colorThemes = [
    function () {
      return color(
        (200 * random()) | 0,
        (200 * random()) | 0,
        (200 * random()) | 0
      );
    },
    function () {
      var black = (200 * random()) | 0;
      return color(200, black, black);
    },
    function () {
      var black = (200 * random()) | 0;
      return color(black, 200, black);
    },
    function () {
      var black = (200 * random()) | 0;
      return color(black, black, 200);
    },
    function () {
      return color(200, 100, (200 * random()) | 0);
    },
    function () {
      return color((200 * random()) | 0, 200, 200);
    },
    function () {
      var black = (256 * random()) | 0;
      return color(black, black, black);
    },
    function () {
      return colorThemes[random() < 0.5 ? 1 : 2]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 3 : 5]();
    },
    function () {
      return colorThemes[random() < 0.5 ? 2 : 4]();
    },
  ];

  function color(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
    return ((1 - cos(PI * t)) / 2) * (b - a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1 / eccentricity,
    radius2 = radius + radius;

  function createPoisson() {
    // domain is the set of points which are still available to pick from
    // D = union{ [d_i, d_i+1] | i is even }
    var domain = [radius, 1 - radius],
      measure = 1 - radius2,
      spline = [0, 1];
    while (measure) {
      var dart = measure * random(),
        i,
        l,
        interval,
        a,
        b,
        c,
        d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        (a = domain[i]), (b = domain[i + 1]), (interval = b - a);
        if (dart < measure + interval) {
          spline.push((dart += a - measure));
          break;
        }
        measure += interval;
      }
      (c = dart - radius), (d = dart + radius);

      for (i = domain.length - 1; i > 0; i -= 2) {
        (l = i - 1), (a = domain[l]), (b = domain[i]);
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2);
        // Delete interval
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  var container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "0";
  container.style.overflow = "visible";
  container.style.zIndex = "9999";

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement("div");
    this.inner = document.createElement("div");
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = "absolute";
    outerStyle.width = sizeMin + sizeMax * random() + "px";
    outerStyle.height = sizeMin + sizeMax * random() + "px";
    innerStyle.width = "100%";
    innerStyle.height = "100%";
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = "50px";
    outerStyle.transform = "rotate(" + 360 * random() + "deg)";
    this.axis =
      "rotate3D(" + cos(360 * random()) + "," + cos(360 * random()) + ",0,";
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + "deg)";

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + "px";
    outerStyle.top = this.y + "px";

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function (height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = (this.frame % 7777) / 7777,
        i = 0,
        j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + "px";
      outerStyle.top = this.y + rho * sin(phi) + "px";
      innerStyle.transform = this.axis + this.theta + "deg)";
      return this.y > height + deviation;
    };
  }

  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti

      var theme =
          colorThemes[onlyOnKonami ? (colorThemes.length * random()) | 0 : 0],
        count = 0;

      (function addConfetto() {
        if (onlyOnKonami && ++count > particles) return (timer = undefined);

        if (isRunning) {
          var confetto = new Confetto(theme);
          confetti.push(confetto);

          container.appendChild(confetto.outer);
          timer = setTimeout(addConfetto, spread * random());
        }
      })(0);

      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length - 1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return (frame = requestAnimationFrame(loop));

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

  $window.keydown(function (event) {
    pointer =
      konami[pointer] === event.which
        ? pointer + 1
        : +(event.which === konami[0]);
    if (pointer === konami.length) {
      pointer = 0;
      poof();
    }
  });

  if (!onlyOnKonami) poof();
}

// ================= HEART CLICK REDIRECT =================
const redirectURL = "./surprise.html"; // change to your page

function enableHeartRedirect() {
  const heart = document.querySelector('.heart');
  if (!heart) return;

  heart.style.cursor = 'pointer';

  heart.addEventListener('click', function () {
    window.location.href = redirectURL;
  });
}



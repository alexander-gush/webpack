import LocomotiveScroll from 'locomotive-scroll';

let map = '';

const $earth = document.getElementById('earth');

let scrollingUp = false;
let scrollingDown = false;

function handleMouseWheel (e) {
  scrollingUp = e.deltaY < 0;
  scrollingDown = e.deltaY > 0;
}

window.addEventListener('mousewheel', handleMouseWheel, {passive: false});



function initMap() {
  const options = {
    center: [10, -20],
    zoom: 2,
    dragging: false,
    scrollWheelZoom: false,
    tilting: false,
    zooming: false,
    // sky: true,
  };
  map  = new WE.map('earth', options);
  WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
    tms: true
  }).addTo(map);


}

function initScroll() {
  const scroll = new LocomotiveScroll({
    el: document.getElementById('js-scroll'),
    smooth: true,
    repeat: true,
  });

  scroll.stop();

  setTimeout(()=> scroll.start(), 1000);

  const markerJapan = WE.marker([35,139], './img/sushi.png', 186 ,174);
  const markerJapan2 = WE.marker([25,119], './img/sushi.png', 186 ,174);

  const firstScene =  document.querySelector('.first-scene');


  function firstAnimationIn() {
    map.panInsideBounds([[-30, -120], [40, 60]],
        {heading: 4, tilt: 0, duration: 1});
    firstScene.classList.add('active');
    $earth.classList.add('initial');
    $earth.classList.add('black');
  }
  firstAnimationIn();
  function firstAnimationOut() {

  }

  function secondAnimationIn() {
    map.panInsideBounds([[-40, 90], [60, 190]],
        {heading: 2, tilt: 25, duration: 2});
    $earth.classList.add('yellow');
    $earth.classList.remove('initial');
    $earth.classList.remove('black');
    firstScene.classList.remove('active');
    markerJapan.addTo(map);
    markerJapan2.addTo(map);
    setTimeout(()=> {
      document.querySelectorAll('.we-pm-icon').forEach((marker) => marker.classList.add('active'));
    }, 1500);
  }
  function secondAnimationOut() {
    $earth.classList.remove('yellow');
  }

  function thirdAnimationIn() {
    map.panInsideBounds([[-85, -180], [85, 180]],
        {heading: 0, tilt: 25, duration: 1,});
    $earth.classList.add('blue');
    markerTokio.removeFrom(map);
  }
  function thirdAnimationOut() {
    $earth.classList.remove('blue');
  }


  function fourthAnimationIn() {
    map.panInsideBounds([[-80, -170], [80, 190]],
        {heading: 0, tilt: 25, duration: 1,});
    $earth.classList.add('plum');
  }
  function fourthAnimationOut() {
    $earth.classList.remove('plum');
  }

  function fifthAnimationIn() {
    map.panInsideBounds([[-80, -170], [80, 190]],
        {heading: 0, tilt: 0, duration: 1,});
    $earth.classList.add('black');
    scroll.stop();
    setTimeout(()=> {
      $earth.classList.add('small');
      scroll.start();
    }, 1000)
  }
  function fifthAnimationOut() {
    scroll.stop();
    $earth.classList.remove('small');
    setTimeout(()=> {
      $earth.classList.remove('black');
      scroll.start();
    }, 1200)
  }
  let direction;
  function scrollOnCalling(func, d, e) {
    if (func === 'first' && d === 'exit') {
      firstAnimationOut()
    }
    if (func === 'second' && d === 'enter') {
      secondAnimationIn();
    }
    if (func === 'second' && d === 'exit') {
      secondAnimationOut();
    }
    if (func === 'second' && d === 'exit' && scrollingUp) {
      secondAnimationOut();
      firstAnimationIn();
      console.log('2out top');
    }
    if (func === 'third' && d === 'enter') {
      thirdAnimationIn();
    }
    if (func === 'third' && d === 'exit') {
      thirdAnimationOut();
    }
    if (func === 'fourth' && d === 'enter') {
      fourthAnimationIn();
    }
    if (func === 'fourth' && d === 'exit') {
      fourthAnimationOut();
    }
    if (func === 'fifth' && d === 'enter') {
      fifthAnimationIn();
    }
    if (func === 'fifth' && d === 'exit') {
      fifthAnimationOut();
    }
  }

  scroll.on("call", scrollOnCalling);
}


window.onload = () => {
  initMap();
  initScroll();
};



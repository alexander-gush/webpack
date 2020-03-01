import {MakeSmth, MakeSmth2} from './includes/test';
var map = ''

const block = document.querySelector('#earth_div');

var myReq;

function initialize() {
  var options = {
    center: [10, -20],
    zoom: 2,
    dragging: false,
    scrollWheelZoom: false,
    tilting: false,
    zooming: false,
    // sky: true,
  };
  map  = new WE.map('earth_div', options);
  var baselayer = WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
    // tileSize: 256,
    // bounds: [[-85, -180], [85, 180]],
    // minZoom: 0,
    // maxZoom: 16,
    // attribution: 'WebGLEarth example',
    tms: true
  }).addTo(map);

  var before = null;
  function animate(now) {
    var c = map.getPosition();
    var elapsed = before? now - before: 0;
    before = now;
    map.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
    requestAnimationFrame(animate);
  }

  // myReq  = requestAnimationFrame(animate)

}

import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  repeat: true,
});
var marker = WE.marker([53,9], './img/test.png', 32 ,32);

function first() {
  // map.panInsideBounds([[10, -20], [10, -20]],
  //     {heading: 2, tilt: 0, duration: 1,});
  // map.setView([10, -20],2);
  map.panTo([64.710824, -22.148438], {duration: 100, zoom: 10});
}

function flyToJapan() {
  map.panInsideBounds([[-40, -70], [60, 30]],
      {heading: 2, tilt: 25, duration: 1,});
  // cancelAnimationFrame(myReq);
  block.classList.add('test');
}
function flyToJapan2() {
  // map.fitBounds([[22, 122], [48, 154]]);
  map.panInsideBounds([[0, -31], [70, 59]],
      {heading: 0, tilt: 25, duration: 1,});

  marker.addTo(map);
  block.classList.add('test2');
}
function flyToJapan3() {
  map.panInsideBounds([[-85, -180], [85, 180]],
      {heading: 0, tilt: 25, duration: 1,});
  marker.removeFrom(map);
}
function flyToJapan4() {
  map.panInsideBounds([[-1000, -1000], [1000, 1000]],
      {heading: 0, tilt: 0, duration: 1,});
}

var showInfo = function(e) {
 e.preventDefault();
}

function scrollOnCalling(func, d, e) {
  if (!e) {
    return;
  }
  if (func === 'test0') {
    // scroll.stop();
    first();
  }
  if (func === 'test') {
    // scroll.stop();
    flyToJapan();
  }
  if (func === 'test2') {
    // scroll.stop();
    flyToJapan2();
  }
  if (func === 'test3') {
    // scroll.stop();
    flyToJapan3();
  }
  if (func === 'test4') {
    // scroll.stop();
    flyToJapan4();

  }
}

scroll.on("call", scrollOnCalling);

window.onload = () => initialize();
// MakeSmth();
// MakeSmth2();


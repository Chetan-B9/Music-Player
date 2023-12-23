// function for audio visualizer
function visualizer_function() {
  const BarConatainer1 = document.querySelector(".barContainer1");
  const BarConatainer2 = document.querySelector(".barContainer2");

  // creating audio context
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  let audioSource = null;
  let analyser = null;

  audioSource = audioCtx.createMediaElementSource(Audio);
  analyser = audioCtx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioCtx.destination);

  // Calculating the visualizer's bar dimensions
  analyser.fftSize = 128;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  // creating dynamic bars
  for (let i = 0; i < 9; i++) {
    const left_bars = document.createElement("DIV");
    const right_bars = document.createElement("DIV");

    left_bars.setAttribute("class", "left_bars");
    left_bars.setAttribute("id", `bar${i}`);

    right_bars.setAttribute("class", "right_bars");
    right_bars.setAttribute("id", `Bar${i}`);

    BarConatainer1.appendChild(left_bars);
    BarConatainer2.appendChild(right_bars);
  }

  // animating dynamic bars
  function Animation() {
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < 9; i++) {
      let index = (i + 1 + 13) * 2;
      const barHeight = dataArray[index];

      const leftBar = document.querySelector(`#bar${i}`);
      const rightBar = document.querySelector(`#Bar${i}`);

      const height = Math.max(3, barHeight || 0);
      leftBar.style.height = rightBar.style.height = height / 5 + "px";

      if ((leftBar.style.height && rightBar.style.height) > `${250}px`) {
        leftBar.style.backgroundColor = "#27005D";
        rightBar.style.backgroundColor = "#27005D";
      } else {
        leftBar.style.backgroundColor = "#9400FF";
        rightBar.style.backgroundColor = "#9400FF";
      }
    }

    requestAnimationFrame(Animation);
  }
  Animation();
}

// bass code
//     import p5 from 'p5';

// let audioCtx;
// let analyser;
// let filter;

// function setup() {
//   createCanvas(400, 400);
//   audioCtx = new AudioContext();
//   // ... (load audio source and create analyser)
//   filter = audioCtx.createBiquadFilter();
//   filter.type = 'lowpass';
//   filter.frequency.value = 250; // Adjust as needed for bass frequencies
//   analyser.connect(filter);
//   filter.connect(audioCtx.destination);
// }

// function draw() {
//   // ... (visualize or process separated bass frequencies)
// }

const textAreaEl = document.querySelector(".text-area");
const rateEl = document.querySelector(".rate-value");
const rateSliderEl = document.querySelector(".rate-slider");
const pichEl = document.querySelector(".pich-value");
const pichSliderEl = document.querySelector(".pich-slider");
const optionsEl = document.querySelector(".options");
const speakBtn = document.querySelector(".speak-btn");
const initBtn = document.querySelector(".init");
const bodyEl = document.querySelector("body");



const synth = speechSynthesis;
let voices = [];
let selectedVoice = optionsEl.value;
optionsEl.addEventListener("change", () => {
  selectedVoice = +optionsEl.value;
});


function init(msg) {
  const talk = new SpeechSynthesisUtterance(msg)
  talk.onend = e => {
    bodyEl.classList.remove("talking");
}

talk.onerror = (e) => {
  console.log("somting worng")
  
}
talk.voice = voices[1]
talk.rate = 0.6;
talk.onstart = () => {
  bodyEl.classList.add("talking");
}
synth.speak(talk)
}

initBtn.addEventListener("click", () => {
  init("initalize the system. yah now we can communite each other. Welcome. welcome to the new technology. and I am created by ubeyid. you can write anything and i read it. don't worry.");
  
});



initBtn.click();

const getVoices = () => {
  voices = synth.getVoices();
  
  let HTML = '';
  voices.forEach((voice, index) => {
    HTML += `<option value="${index}">${voice.name}(${voice.lang})</option>`;
  })

  optionsEl.innerHTML = HTML;
}


if(synth.onvoiceschanged !== undefined){
  synth.onvoiceschanged = getVoices;
}

getVoices();


const speak = () => {
  if(synth.speaking){
    console.log('Alrady speaking....');
    return;
  }
  if(textAreaEl.value){
    

    const speak = new SpeechSynthesisUtterance(textAreaEl.value)

    speak.onend = e => {
      bodyEl.classList.remove("talking");
    }

    speak.onerror = () => {
      console.log("somting worng")
    }

    speak.onstart = () => {
      bodyEl.classList.add("talking");
    }

    voices.forEach((voice, i) => {
      if(selectedVoice == i){
        speak.voice = voice;
        console.log(selectedVoice, i);
      }
    });


    speak.rate = +rateSliderEl.value;
    speak.pitch = +pichSliderEl.value;

    synth.speak(speak);
  }
}

speak()

speakBtn.addEventListener('click' ,( ) => {
  speak();
});

rateSliderEl.addEventListener("click" , () => {
  rateEl.textContent = rateSliderEl.value;
})
pichSliderEl.addEventListener("change" , () => {
  pichEl.textContent = pichSliderEl.value;
})
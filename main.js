const keys = document.querySelectorAll('.key');

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.code}"]`);
    const key = document.querySelector(`div[data-key="${e.code}"]`);
    if (!audio) return;

    key.classList.toggle('playing');
    audio.currentTime = 0;  
    audio.play();
  }

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

keys.forEach(i => i.addEventListener('click', () => {
  const sound = i.dataset.key;
  const audio = document.querySelector(`audio[data-key="${sound}"]`);
  const key = document.querySelector(`div[data-key="${sound}"]`);

  key.classList.add('playing');
  audio.currentTime = 0;  
  audio.play();
}));

keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

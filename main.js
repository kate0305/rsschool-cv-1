const time = document.getElementById('time'),
      date = document.getElementById('date'),
      greeting = document.getElementById('greeting'),
      name = document.getElementById('name'),
      focus = document.getElementById('focus');

const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
      hour = today.getHours(),
      min = today.getMinutes();

  const amPm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  time.innerHTML = `${hour}<span>:</span>${addZero(min)} ${showAmPm ? amPm : ''}`;
  setTimeout(showTime, 1000);
}

//Show Date
function showDate() {
  let today = new Date(),
    dateNow = today.toDateString();
  date.innerHTML = `${dateNow.slice(0, -4)}`;
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBackgroundGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    document.body.style.backgroundImage = "url('./img/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    document.body.style.backgroundImage = "url('./img/day.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    document.body.style.backgroundImage = "url('./img/evening.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName() {
  name.addEventListener('click', ()  => {
    localStorage.setItem('name', name.textContent);
    if (name.textContentt !== null) {
      name.textContent = '';
      localStorage.setItem('name', name.textContent);
    }
  }); 
  name.addEventListener ('keypress', (e) => {
    localStorage.setItem('name', name.textContent);
    if (e.code === 'Enter') {
      name.blur();
    }
  });
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus() {
  focus.addEventListener('click', () => {
    if (focus.textContent !== null) {
      focus.textContent = '';
      localStorage.setItem('focus', focus.textContent);
    }
  });
  focus.addEventListener ('keypress', (e) => {
    localStorage.setItem('focus', focus.textContent);
    if (e.code === 'Enter') {
      focus.blur();
    }
  });
}

showTime();
showDate();
setBackgroundGreet();
getName();
setName();
getFocus();
setFocus();

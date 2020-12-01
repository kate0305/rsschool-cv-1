/*Navigation*/

const header = document.querySelector('.navigation');
header.addEventListener('click', (event) => {
    header.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

document.addEventListener('scroll', onScroll);
function onScroll(event) {
    const curPos = window.scrollY;
  
    const divs = document.querySelectorAll('body>section');
    
    const links = document.querySelectorAll('.navigation a');

    divs.forEach((el) => {
        if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
            links.forEach((a) => {
                a.classList.remove('active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            })
        }
    }); 
}


	/*Sliders*/			
'use strict';
    var multiItemSlider = (function () {
      return function (selector) {
        var
          _mainElement = document.querySelector(selector), 
          _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), 
          _sliderItems = _mainElement.querySelectorAll('.slider__item'), 
          _sliderControls = _mainElement.querySelectorAll('.slider__control'), 
          _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), 
          _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),   
          _positionLeftItem = 0, 
          _transform = 0, 
          _step = _itemWidth / _wrapperWidth * 100, 
          _items = []; 

        _sliderItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
          getItemMin: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position < _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getItemMax: function () {
            var indexItem = 0;
            _items.forEach(function (item, index) {
              if (item.position > _items[indexItem].position) {
                indexItem = index;
              }
            });
            return indexItem;
          },
          getMin: function () {
            return _items[position.getItemMin()].position;
          },
          getMax: function () {
            return _items[position.getItemMax()].position;
          }
        }

        var _transformItem = function (direction) {
          var nextItem;
          if (direction === 'right') {
            _positionLeftItem++;
            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
              nextItem = position.getItemMin();
              _items[nextItem].position = position.getMax() + 1;
              _items[nextItem].transform += _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform -= _step;
          }
          if (direction === 'left') {
            _positionLeftItem--;
            if (_positionLeftItem < position.getMin()) {
              nextItem = position.getItemMax();
              _items[nextItem].position = position.getMin() - 1;
              _items[nextItem].transform -= _items.length * 100;
              _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
            }
            _transform += _step;
          }
          _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        var _controlClick = function (e) {
          if (e.target.classList.contains('slider__control')) {
            e.preventDefault();
            var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
            _transformItem(direction);
          }
        };

        var _setUpListeners = function () {
          _sliderControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
          });
        }

        _setUpListeners();

        return {
          right: function () { 
            _transformItem('right');
          },
          left: function () { 
            _transformItem('left');
          }
        }
      }
    }());

	var slider = multiItemSlider('.slider')
	console.log(slider)
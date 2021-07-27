import './touch-style.scss'

/* eslint-disable new-cap */
/* eslint-disable prefer-rest-params */
function jScroll() {
  this.id = arguments[0];
  this.type = arguments[1] == 'h' ? 'h' : 'v';
  this.width = typeof arguments[2] == 'number' ? arguments[2] : null;
  this.height = typeof arguments[3] == 'number' ? arguments[3] : null;
  this.$obj = null;
  this.is_scroll = false;
  this.start_pos = null;
  this.init();
}

jScroll.prototype.init = function() {
  this.$obj = $(this.id);
  if (this.$obj.length == 1) {
    this.$obj.addClass('jScroll');
    if (this.width != null) this.$obj.css('width', this.width);
    if (this.height != null) this.$obj.css('height', this.height);

    this.$prev = this.$obj.closest('.t-rec').prev().find('a[href="#sh-sliderprev"]')
    this.$next = this.$obj.closest('.t-rec').prev().find('a[href="#sh-slidernext"]')

    this.bindEvent();
  }
};

jScroll.prototype.bindEvent = function() {
  const _this = this;

  this.$prev.on('click', function(e) {
    e.preventDefault()

    _this.$obj.animate({
      scrollLeft: _this.$obj.scrollLeft() + -300,
    }, 300)

    console.log('prev');
  })
  this.$next.on('click', function(e) {
    e.preventDefault()

    _this.$obj.animate({
      scrollLeft: _this.$obj.scrollLeft() + 300,
    }, 300)

    console.log('next');
  })
  this.$obj.on('scroll', function() {
    const obj = _this.$obj.get(0)

    const isStart = obj.scrollLeft <= 0
    const isEnd = obj.offsetWidth + obj.scrollLeft >= obj.scrollWidth

    _this.$prev.css('opacity', isStart ? '0.4' : '1')
    _this.$next.css('opacity', isEnd ? '0.4' : '1')
  })

  if (window.outerWidth <= 640) return _this.$obj.attr('style', 'overflow: auto !important;');

  this.$obj.on('mousedown', function(event) {
    if (event.target.tagName == 'A') return

    _this.is_scroll = true;
    _this.start_pos = {
      base_x: _this.$obj.scrollLeft(),
      base_y: _this.$obj.scrollTop(),
      x: event.pageX,
      y: event.pageY,
    };
    console.log(_this.start_pos);
    _this.$obj.css('cursor', 'move');
  });
  $(document).on('mouseup', function() {
    _this.is_scroll = false;
    _this.$obj.css('cursor', 'default');
  });
  $(document).on('mousemove', function(event) {
    if (_this.is_scroll) {
      let dist = undefined;
      const x = event.pageX;
      dist = _this.start_pos.base_x - x + _this.start_pos.x;
      if (_this.type == 'h') {
        const x = event.pageX;
        dist = _this.start_pos.base_x - x + _this.start_pos.x;
        _this.$obj.scrollLeft(dist);
      } else {
        const y = event.pageY;
        dist = _this.start_pos.base_y - y + _this.start_pos.y;
        _this.$obj.scrollTop(dist);
      }
    }
  });
  this.$obj.get(0).addEventListener('touchstart', function(event) {
    if (event.targetTouches.length == 1) {
      event.preventDefault();
      _this.is_scroll = true;
      _this.start_pos = {
        base_x: _this.$obj.scrollLeft(),
        base_y: _this.$obj.scrollTop(),
        x: event.targetTouches[0].pageX,
        y: event.targetTouches[0].pageY,
      };
      _this.$obj.css('cursor', 'move');
    }
  });
  this.$obj.get(0).addEventListener('touchend', function(event) {
    _this.is_scroll = false;
    _this.$obj.css('cursor', 'default');
  });
  this.$obj.get(0).addEventListener('touchmove', function(event) {
    if (_this.is_scroll) {
      if (event.targetTouches.length == 1) {
        event.preventDefault();
        let dist = undefined;
        const x = event.targetTouches[0].pageX;
        dist = _this.start_pos.base_x - x + _this.start_pos.x;
        _this.$obj.scrollLeft(dist);
        // if (_this.type == 'h') {
        //   const x = event.targetTouches[0].pageX;
        //   dist = _this.start_pos.base_x - x + _this.start_pos.x;
        //   _this.$obj.scrollLeft(dist);
        // } else {
        //   const y = event.targetTouches[0].pageY;
        //   dist = _this.start_pos.base_y - y + _this.start_pos.y;
        //   _this.$obj.scrollTop(dist);
        // }
      }
    }
  });
};

(function($) {
  $.fn.extend({
    jScroll: function(options) {
      const defaults = {
        type: 'h',
        width: null,
        height: null,
      };
      const opts = $.extend(defaults, options);
      return this.each(function() {
        new jScroll(this, opts.type, opts.width, opts.height);
        return false;
      });
    },
  });
})(jQuery);

// Code

const config = {
  recId: ['rec311461311'],
  ...(window.shSlider || {}),
}


$(function() {
  config.recId.forEach(function(recId) {
    $(`#${recId} .t396__artboard`).jScroll({
      type: 'h',
    })
  })
})

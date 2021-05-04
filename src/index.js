import {arrowLeft, arrowRight} from './icons'
import './style.scss'

const config = {
  recId: ['rec311461311'],
  btnColors: ['#614F51', '#F7A561', '#9DBF67', '#D85041'],
  ...(window.shSlider || {}),
}


$(function() {
  config.recId.forEach(function(recId) {
    const $rec = $('#' + recId).addClass('sh-sliderWrap')
    const $container = $rec.find('[class="t-container"]')
    const $slides = $rec.find('.t902__col')
    const $slider = $(`<div class="sh-slider"></div>`)
    const $title = $rec.find('.t-section__title')

    $slides.each(function(idx, el) {
      const $sl = $(this)
      const $text = $sl.find('.t-descr')
      const text = $text.html()
      const textArr = text.split('<br><br>')
      const age = textArr.pop()
      const date = textArr.pop()

      $text.html(textArr.join('<br><br>'))

      const $title = $sl.find('.t-name')

      $title.html(`
        <div class="sh-title">
          <div>
            ${$title.html()}
          </div>
          <span class="sh-age">
            ${age}
          </span>
        </div>
      `)

      const $btnWrap = $sl.find('.t902__btn-container')

      $btnWrap.prepend(`
        <span class="t-descr t-descr_xs">
          <span class="sh-date">${date}</span>
        </span>
      `)
    });

    $slides.appendTo($slider)
    $slides.wrap('<div></div>')

    $container.empty()
    $container.append($slider)

    $slider.slick({
      arrows: false,
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    })

    const $prevArrow = $(arrowLeft)
    const $nextArrow = $(arrowRight)

    $prevArrow.on('click', () => {
      $slider.slick('slickPrev')
    }).css('opacity', '0.4')

    $nextArrow.on('click', () => {
      $slider.slick('slickNext')
    })

    const $arrows = $('<div class="sh-arrows"></div>')

    $arrows.append($prevArrow)
    $arrows.append($nextArrow)

    $title.append($arrows);

    $slider.on('afterChange', function(_, slick, cur) {
      window.scrollTo(0, window.pageYOffset - 1)
      window.scrollTo(0, window.pageYOffset + 1)

      const isEnd = slick.currentSlide >= slick.slideCount - slick.options.slidesToShow
      const isStart = slick.currentSlide === 0

      $prevArrow.css('opacity', isStart ? '0.4' : '1')
      $nextArrow.css('opacity', isEnd ? '0.4' : '1')
    })
  })
})

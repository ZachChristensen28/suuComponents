function myFunction() {
  var x = document.getElementById('site-menu');
  if (x.style.width != '80%') {
    document.getElementById('site-menu').style.width = '80%';
  } else {
    document.getElementById('site-menu').style.width = '0';
  }
}

$(function() {
  var searchIsActive;
  var menuIsActive;

  $('#menu').on('click', function() {
    $.fn.isActive('menu');
    $.fn.menu(this);
  });

  $('#search').on('click', function() {
    $.fn.isActive('search');
    $.fn.search(this);
  });

  /**
   * Checks to see if toggle is active
   * @param  {String} active takes the active variable
   */
  $.fn.isActive = function(active) {
    var active = active;
    if (active == 'menu') {
      if (searchIsActive) {
        $.fn.search('#search');
      }
    } else {
      if (menuIsActive) {
        $.fn.menu('#menu');
      }
    }
  };

  /**
   * Search Navigation Toggle
   * @param  {String} search Selector
   */
  $.fn.search = function(search) {
    var search = search;

    if ($(search).hasClass('active') != true) {
      $(search).addClass('active');
      $('.search-navigation').css('width', '80%');
      searchIsActive = true;
    } else {
      $('.search-navigation').css('width', '0');
      $(search).removeClass('active');
      searchIsActive = false;
    }
  }
  /**
   * Menu Navigation Toggle
   * @param  {String} menu Selector
   */
  $.fn.menu = function(menu) {
    var menu = menu;
    if ($(menu).hasClass('active') != true) {
      $(menu).addClass('active');
      $('#border').css('border-right-color', '#e6e7e8');
      $('.mobile-navigation').css('width', '80%');
      menuIsActive = true;
    } else {
      $('.mobile-navigation').css('width', '0');
      $('#border').css('border-right-color', '#777777');
      $(menu).removeClass('active');
      menuIsActive = false;
    }
  };
});
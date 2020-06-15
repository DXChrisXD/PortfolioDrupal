/**
 * @file
 * Accessible Submenu.
 *
 * @see https://www.w3.org/WAI/tutorials/menus/flyout/#flyoutnavmousefixed
 * @see https://codepen.io/grayghostvisuals/pen/ltjDa
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.submenu = {
    attach: function (context, settings) {

      var $navigation = $(context).find('.has-submenu').closest('.menu');

      // Setup the a11y nav.
      $navigation.setup_navigation();
    }
  };

  var keyCodeMap = {
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9', 59: ';',
    65: 'a', 66: 'b', 67: 'c', 68: 'd', 69: 'e', 70: 'f', 71: 'g', 72: 'h', 73: 'i', 74: 'j', 75: 'k', 76: 'l',
    77: 'm', 78: 'n', 79: 'o', 80: 'p', 81: 'q', 82: 'r', 83: 's', 84: 't', 85: 'u', 86: 'v', 87: 'w', 88: 'x', 89: 'y', 90: 'z',
    96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7', 104: '8', 105: '9'
  };

  $.fn.setup_navigation = function (settings) {

    settings = jQuery.extend({
      menuHoverClass: 'js-visible',
      subMenuToggleClass: 'submenu-toggle',
      // @todo detect touch screen instead.
      // @see _grid-settings.scss.
      minWidthValue: '769px'
    }, settings);

    var $this = $(this);

    // Add ARIA role to menubar and menu items.
    $this.attr('role', 'menubar').find('li').attr('role', 'menuitem');

    var top_level_links = $this.find('> li > a');

    // Set tabIndex to -1 so that top_level_links can't receive focus until menu is open.
    $(top_level_links).next('ul')
      .attr({'aria-hidden': 'true', 'role': 'menu'})
      .find('a')
      .attr('tabIndex', -1);

    //
    // Set mobile submenu toggle button.
    //
    // Set tabIndex to -1 because we don't want a focus on it.
    // keyboard navigation uses tabs only
    //
    var $subMenuToggle = $('<button aria-expanded="false" tabIndex="-1"></button>');
    $subMenuToggle.addClass(settings.subMenuToggleClass);
    $(top_level_links).next('ul').before($subMenuToggle);

    //
    // Adding aria-haspopup for appropriate items.
    //
    $(top_level_links).each(function () {
      if ($(this).nextAll('ul').length > 0) {
        $(this).parent('li').attr('aria-haspopup', 'true');
      }
    });

    //
    // Display submenu.
    //
    var displaySubmenu = function () {
      $('.' + settings.menuHoverClass).not( $(this).parents('ul') )
        // Close all other submenus except its parent.
        .attr('aria-hidden', 'true')
        .removeClass(settings.menuHoverClass)
        .parent('li')
        .find('.' + settings.subMenuToggleClass)
        .attr('aria-expanded', 'false')
        .removeClass('toggled');
      $(this).nextAll('.' + settings.subMenuToggleClass)
        // Set active state for the mobile toggle button.
        .attr('aria-expanded', 'true')
        .addClass('toggled');
      $(this).closest('ul')
        // Remove active state for the children submenu.
        .find('.' + settings.menuHoverClass)
        .attr('aria-hidden', 'true')
        .removeClass(settings.menuHoverClass)
        .find('a')
        .attr('tabIndex', -1);
      $(this).nextAll('ul')
        // Set open state for the current submenu.
        .attr('aria-hidden', 'false')
        .addClass(settings.menuHoverClass)
        .find('a').attr('tabIndex', 0);
      $(this).nextAll('ul')
        // Remove active state for the children mobile toggle buttons
        .find('.' + settings.subMenuToggleClass)
        .attr('aria-expanded', 'false')
        .removeClass('toggled');
    }

    //
    // Open current submenu.
    //
    var openSubmenu = function (toggleButton) {
      $('.' + settings.menuHoverClass).not(toggleButton.parents('ul'))
        // Close all other submenus except its parent
        .attr('aria-hidden', 'true')
        .removeClass(settings.menuHoverClass)
        .parent('li')
        .find('.' + settings.subMenuToggleClass)
        .attr('aria-expanded', 'false')
        .removeClass('toggled');
      toggleButton
        // Set active state for the mobile toggle button
        .attr('aria-expanded', 'true')
        .addClass('toggled')
        .next('ul')
        .attr('aria-hidden', 'false')
        .addClass(settings.menuHoverClass)
        .find('a').attr('tabIndex', 0);
    }

    //
    // Close current menu.
    //
    var closeSubmenu = function (toggleButton) {
      toggleButton
        .attr('aria-expanded', 'false')
        .removeClass('toggled')
        .next('ul')
        .attr('aria-hidden', 'true')
        .addClass(settings.menuHoverClass)
        .find('a').attr('tabIndex', 0);
    }

    // Bind focus on both desktop & mobile.
    $(top_level_links).focus(displaySubmenu);

    // Bind submenu toggle button on mobile.
    $("." + settings.subMenuToggleClass).click(function(e) {
      e.stopPropagation();

      if ( $(this).attr('aria-expanded') == 'false' ) {
        openSubmenu($(this));
      } else {
        closeSubmenu($(this));
      }
    });

    // Bind arrow keys for navigation.
    $(top_level_links).keydown(function (e) {
      if (e.keyCode === 37) {
        e.preventDefault();
        // This is the first item.
        if ($(this).parent('li').prev('li').length === 0) {
          $(this).parents('ul').find('> li').last().find('a').first().focus();
        }
        else {
          $(this).parent('li').prev('li').find('a').first().focus();
        }
      }
      else if (e.keyCode === 38) {
        e.preventDefault();
        if ($(this).parent('li').find('ul').length > 0) {
          $(this).parent('li').find('ul')
            .attr('aria-hidden', 'false')
            .addClass(settings.menuHoverClass)
            .find('a').attr('tabIndex', 0)
            .last().focus();
        }
      }
      else if (e.keyCode === 39) {
        e.preventDefault();
        // This is the last item.
        if ($(this).parent('li').next('li').length === 0) {
          $(this).parents('ul').find('> li').first().find('a').first().focus();
        }
        else {
          $(this).parent('li').next('li').find('a').first().focus();
        }
      }
      else if (e.keyCode === 40) {
        e.preventDefault();
        if ($(this).parent('li').find('ul').length > 0) {
          $(this).parent('li').find('ul')
            .attr('aria-hidden', 'false')
            .addClass(settings.menuHoverClass)
            .find('a').attr('tabIndex', 0)
            .first().focus();
        }
      }
      else if (e.keyCode === 27) {
        e.preventDefault();
        $('.' + settings.menuHoverClass)
          .attr('aria-hidden', 'true')
          .removeClass(settings.menuHoverClass)
          .find('a')
          .attr('tabIndex', -1);
      }
      else {
        $(this).parent('li').find('ul[aria-hidden=false] a').each(function () {
          if ($(this).text().substring(0, 1).toLowerCase() === keyCodeMap[e.keyCode]) {
            $(this).focus();
            return false;
          }
        });
      }
    });

    var links = $(top_level_links).parent('li').find('ul').find('a');
    $(links).keydown(function (e) {
      if (e.keyCode === 38) {
        e.preventDefault();
        // This is the first item.
        if ($(this).parent('li').prev('li').length === 0) {
          $(this).parents('ul').parents('li').find('a').first().focus();
        }
        else {
          $(this).parent('li').prev('li').find('a').first().focus();
        }
      }
      else if (e.keyCode === 40) {
        e.preventDefault();
        if ($(this).parent('li').next('li').length === 0) {
          $(this).parents('ul').parents('li').find('a').first().focus();
        }
        else {
          $(this).parent('li').next('li').find('a').first().focus();
        }
      }
      else if (e.keyCode === 27 || e.keyCode === 37) {
        e.preventDefault();
        $(this)
          .parents('ul').first()
          .prev('a').focus()
          .parents('ul').first().find('.' + settings.menuHoverClass)
          .attr('aria-hidden', 'true')
          .removeClass(settings.menuHoverClass)
          .find('a')
          .attr('tabIndex', -1);
      }
      else if (e.keyCode === 32) {
        e.preventDefault();
        window.location = $(this).attr('href');
      }
      else {
        var found = false;
        $(this).parent('li').nextAll('li').find('a').each(function () {
          if ($(this).text().substring(0, 1).toLowerCase() === keyCodeMap[e.keyCode]) {
            $(this).focus();
            found = true;
            return false;
          }
        });

        if (!found) {
          $(this).parent('li').prevAll('li').find('a').each(function () {
            if ($(this).text().substring(0, 1).toLowerCase() === keyCodeMap[e.keyCode]) {
              $(this).focus();
              return false;
            }
          });
        }
      }
    });

    // Hide menu if click or focus occurs outside of navigation.
    $this.find('a').last().keydown(function (e) {
      if (e.keyCode === 9) {
        // If the user tabs out of the navigation hide all menus.
        $('.' + settings.menuHoverClass)
          .attr('aria-hidden', 'true')
          .removeClass(settings.menuHoverClass)
          .find('a')
          .attr('tabIndex', -1);
      }
    });

    //
    // Hide all submenus
    //
    var hideMenus = function () {
      $('.' + settings.menuHoverClass)
        .attr('aria-hidden', 'true')
        .removeClass(settings.menuHoverClass)
        .find('a')
        .attr('tabIndex', -1);
      $('.' + settings.subMenuToggleClass)
        .attr('aria-expanded', 'false')
        .removeClass('toggled');
    }

    $(document).click(hideMenus);

    // Define touch / screen behaviors on load or resize.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener
    // Initialize the media query.
    var mediaQuery = window.matchMedia('(min-width: '+ settings.minWidthValue +')');

    function screenTest(e) {
      if (e.matches) {
        // Role menubar should be the highest level menu.
        $this.filter("[role='menubar']").mouseleave(hideMenus);
        $(top_level_links).hover(displaySubmenu);
      } else {
        $this.filter("[role='menubar']").unbind("mouseleave");
        $(top_level_links).unbind('mouseenter mouseleave');
      }
    }

    // Add a listen event.
    mediaQuery.addListener(screenTest);
    // Run on page load.
    screenTest(mediaQuery);

    $this.click(function (e) {
      e.stopPropagation();
    });

  };

})(jQuery, Drupal);

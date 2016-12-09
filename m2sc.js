// Interactions with the SoundCloud HTML5 widget.
// Depends on https://w.soundcloud.com/player/api.js ('SC')
// Depends on jQuery ('$')
// Depends on Font Awesome style classes ('fa-')
// Depends on local style classes ('sc-')
// Load after the widget and SoundCloud API
// M2 April, 2015

var M2SC = (function ($, SC) {
  'use strict';

  var my = {
    scWidget: SC.Widget($('#sc-widget').get(0)),
    scLoadedTrackName: null,
    scLoadedTrackIcon: null,
    scIsMobile: navigator.userAgent.match(/Mobi/) ? true : false, // mobile users must click widget directly

    // Caches the jQuery reference to the loaded track's play/pause icon
    scSetLoadedTrackIcon: function (track) {
       my.scLoadedTrackIcon = $('#play-' + track);
    },

    // Events maintain state between track links and the widget
    scBindWidgetEvents: function() {
      // After playback starts, show pause icon
      my.scWidget.bind(SC.Widget.Events.PLAY, function () {
        my.scLoadedTrackIcon.removeClass('sc-play fa-play').addClass('sc-pause fa-pause');
        $('body').removeClass('busy');
      });

      // After playback pauses, show play icon
      my.scWidget.bind(SC.Widget.Events.PAUSE, function () {
        my.scLoadedTrackIcon.removeClass('sc-pause fa-pause').addClass('sc-play fa-play');
        $('body').removeClass('busy');
      });

      // After playback finishes, show play icon
      my.scWidget.bind(SC.Widget.Events.FINISH, function () {
        my.scLoadedTrackIcon.removeClass('sc-pause fa-pause').addClass('sc-play fa-play');
      });
    },

    // Initialization function called from the loading page, pass in the track name
    scInitialize: function(track) {
      my.scLoadedTrackName = track;
      my.scSetLoadedTrackIcon(track);
      my.scBindWidgetEvents();
    },

    // Compose and load the track's URL
    // Will look something like 'https://soundcloud.com/deepgraysea/chanty'
    loadSCWidget: function (element) {
      var scPrefix = 'https://soundcloud.com/',
          bandName = element.getAttribute('data-band'),
          trackName = element.getAttribute('data-track'),
          url = scPrefix + bandName + '/' + trackName;

      // If this sound is already loaded into the player, toggle playback.
      // Mobiles, drop through & refocus on widget via return statement.
      if (M2SC.scLoadedTrackName === trackName) {
        if (M2SC.scIsMobile === false) {
          M2SC.scWidget.toggle();
        }

      // Loading a new sound, automatically play it, show a progress cursor, reinitialize
      } else {

        // Look busy, stop looking like we're playing any previous track
        $('body').addClass('busy');
        my.scLoadedTrackIcon.removeClass('sc-pause fa-pause').addClass('sc-play fa-play');

        // Load the widget from SoundCloud. Object initializers vs URL params a bit flaky, so duplicated.
        my.scWidget.load(url, {
          show_artwork: true,
          auto_play: M2SC.scIsMobile ? false : true, // no auto-play on mobiles
          download: false,
          sharing: true,
          show_comments: false,
          show_playcount: true,
          show_user: true,
          start_track: 0,
          hide_related: true,
          buying: false,
          visual: false
        });

        my.scLoadedTrackName = trackName;

        // Reset the event handling only after the widget is reloaded
        my.scWidget.bind(SC.Widget.Events.READY, function () {
          my.scBindWidgetEvents();
          $('body').removeClass('busy');
          my.scSetLoadedTrackIcon(M2SC.scLoadedTrackName);
        });
      } // end loading new

      return my.scIsMobile; // allow navigation to the widget for mobiles, who must click manually
    }
  };
  return my;
}($, SC));
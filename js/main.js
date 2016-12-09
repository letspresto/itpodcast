//Preloader for materialize
document.addEventListener("DOMContentLoaded", function(){
  $('.preloader-background').delay(5500).fadeOut('slow');
  
  $('.preloader-wrapper')
    .delay(5500)
    .fadeOut();
});

// Init ScrollMagic
var ctrl = new ScrollMagic.Controller({
  globalSceneOptions: {
    triggerHook: 'onLeave'
  }
});

// Create scene
$("section").each(function() {

  var name = $(this).attr('id');
  
  new ScrollMagic.Scene({
    triggerElement: this
  })
  .setPin(this)
  // .addIndicators({
  //   colorStart: "rgba(255,255,255,0.5)",
  //   colorEnd: "rgba(255,255,255,0.5)", 
  //   colorTrigger : "rgba(255,255,255,1)",
  //   name:name
  //   })
  .loglevel(3)
  .addTo(ctrl);
 
});


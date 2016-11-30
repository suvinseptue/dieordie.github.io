/**
 * Created by suvin on 2016/11/29.
 */
$(document).ready(function() {
    $('#photoList').fullpage({
        afterLoad: function(anchorLink, index){
            //section 2
            if(index == 2){
                //moving the image
                $('#section1').find('img').delay(500).animate({
                    left: '0%'
                }, 1500, 'easeOutExpo');

                $('#section1').find('p').first().fadeIn(1800, function(){
                    $('#section1').find('p').last().fadeIn(1800);
                });
                

            }

        }
    });

});
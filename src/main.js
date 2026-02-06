import './style.css'

$(document).ready(function() {
		$('.scroll-anim').on('click', function() { 
			var page = $(this).attr('href'); 
			var speed = 750; 
			$('html, body').animate( { scrollTop: $(page).offset().top }, speed ); // Go
			return false;
		});
	});


const link = document.getElementById("tristesse");
const sound = document.getElementById("sadness-effect");

link.addEventListener("click", () => {
  sound.volume = 0.3; 
  sound.play();
});

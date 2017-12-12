$(document).ready(function(){	
	$('.portfolio').slick({
		responsive: [{
			breakpoint: 3000,
			settings: "unslick"
			},
			{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed: 2000,
				arrows: false,
			}
			}
	]})});

$(document).ready(function(){
    $(".comments").submit(function(){
    	var name = $("#name-mail__name").val();
        alert("Thank you " + name);
    });
});

function setCountForElement(element){
	$(element).CountUpCircle({
		duration: 1,
		opacity_anim: false,
		step_divider: 1
	});
};
$(document).ready(function(){
    setCountForElement('#first-counter');
    setCountForElement('#second-counter');
    setCountForElement('#third-counter');
    setCountForElement('#fourth-counter');
});
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
    $(".comments").submit(function(e){
    	e.preventDefault()
    	$(".name-mail").css("display","none")
    	$(".inputs").css("display","none")
    	$(".thanx").css("display","block")
    	var name = $("#name-mail__name").val();
    	$(".thanx").html("<span>Thank you </span>" + name)
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
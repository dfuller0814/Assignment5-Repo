$(document).ready(function(){
    $("#sectionDropdown").change(function(){
        // Get id of select option dynamically and show the appropriate section
        var optionId = $("#sectionDropdown option:selected").prop("id");
        if (optionId != "") {
            var sectionElements = document.querySelectorAll("section.sectionClass");
            for (var i=0; i < sectionElements.length; i++){
                if (sectionElements[i].id == optionId) {
                    $(sectionElements[i]).show();
                }
                else{
                    $(sectionElements[i]).hide();
                }
            }
        }
        
    })
});
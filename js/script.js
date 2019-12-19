/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

// ADD THIS LATER!
// document.addEventListener('DOMContentLoaded', () => {});

// Other section
// focus 'name' input on page load
$('#name').focus();

// hide the 'other-title' job role input field
$('#other-title').hide();
// show input field once 'Other' is selected from dropdown menu
$('select').on('change', function() {
    // if we select anything but 'other', hide it
    $(this).val() === 'other' ? $('#other-title').show() : $('#other-title').hide();
});

// T-Shirt section
// $('#design').hide();
// $('#size').hide()
// $('#color').text('');
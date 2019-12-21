/** ****************************************

Treehouse Techdegree:

FSJS project 3 - Interactive Form

***************************************** */

// ADD THIS LATER!
// document.addEventListener('DOMContentLoaded', () => {});

// Other section
// focus 'name' input on page load
$('#name').focus();

// hide the 'other-title' job role input field
$('#other-title').hide();

// // show input field once 'Other' is selected from dropdown menu
$('#title').on('change', function() {
  // if we select anything but 'other', hide it
  $(event.target).val() === 'other'
    ? $('#other-title').show()
    : $('#other-title').hide();
});

// T-Shirt section
$('#design option')
  .eq(0)
  .attr('hidden', true);

$('#design option')
  .eq(1)
  .attr('selected', true);

// update the 'color' field to read "Please select a T-shirt theme"
const $warning = $('<option>Please select a T-shirt theme</option>');
$('#color').prepend($warning.attr('selected', true).attr('disabled', true));
// hide the colors in the 'color' drop down menu
$('#color option').hide();
// use 'change' event listener on 'design' menu 'select' element
$('#design').on('change', function(event) {
  // if 'js puns' is selected hide all 'heart js' option in 'color'
  // if 'heart js' is selected hide all 'js puns' option in 'color'
  // update the 'color' field to the first available color
  if ($(event.target).val() === 'js puns') {
    $('#color option').each(function(i) {
      if (
        $(this)
          .text()
          .includes('Puns')
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  if ($(event.target).val() === 'heart js') {
    $('#color option').each(function(i) {
      if (
        $(this)
          .text()
          .includes('♥')
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
});

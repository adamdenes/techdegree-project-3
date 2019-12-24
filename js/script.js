/* *****************************************

Treehouse Techdegree:

FSJS project 3 - Interactive Form

***************************************** */

document.addEventListener('DOMContentLoaded', () => {
  /* *****************************************
  Helper Functions
  ***************************************** */
  function handleOptions(eventTarget, value, object, text) {
    if ($(eventTarget).val() === value) {
      $(object).each(function() {
        if (
          $(this)
            .text()
            .includes(text)
        ) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  }

  function hideSelected(element, index) {
    $(element)
      .eq(index)
      .attr('hidden', true);
  }
  function addSelected(color, index) {
    return $(color)
      .eq(index)
      .attr('selected', true);
  }

  function removeSelected(color, index) {
    return $(color)
      .eq(index)
      .removeAttr('selected', false);
  }

  function handlePayment(eventTarget, value) {
    $('#payment')
      .siblings('div')
      .each(function() {
        if (
          $(eventTarget)
            .val()
            .includes(value) &&
          $(this)
            .attr('id')
            .includes(value)
        ) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
  }
  /* *****************************************
  ”Job Role” section
  ***************************************** */
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

  /* *****************************************
  ”T-Shirt Info” section
  ***************************************** */

  hideSelected('#design option', 0);
  addSelected('#design option', 1);

  // update the 'color' field to read "Please select a T-shirt theme"
  const $warning = $('<option>Please select a T-shirt theme</option>');
  $('#color').prepend($warning.attr('selected', true).attr('disabled', true));

  // hide the colors in the 'color' drop down menu
  $('#color option').hide();

  // use 'change' event listener on 'design' menu 'select' element
  $('#design').on('change', function(event) {
    // if 'js puns' is selected hide all 'heart js' option in 'color'
    if ($(event.target).val() === 'js puns') {
      handleOptions(event.target, 'js puns', '#color option', 'Puns');
      // update the 'color' field to the first available color
      addSelected('#color option', 1);
      removeSelected('#color option', 4);
      // if 'heart js' is selected hide all 'js puns' option in 'color'
    } else {
      handleOptions(event.target, 'heart js', '#color option', '♥');
      // update the 'color' field to the first available color
      addSelected('#color option', 4);
      removeSelected('#color option', 1);
    }
  });

  /* *****************************************
  ”Register for Activities” section
  ***************************************** */

  // create an element to display the total activity cost
  let cost = 0;
  const $costHTML = $('<span></span>');
  $('.activities').append($costHTML);

  // listen for changes in the Activity section
  $('.activities').on('change', function(event) {
    const $checkbox = $(event.target);
    const $dataCost = parseInt($(event.target).attr('data-cost'));
    const $dataDate = $(event.target).attr('data-day-and-time');

    // if the checkbox is checked, add the cost declared in the 'data-cost' to 'cost' variable
    // otherwise subtract it
    $checkbox.prop('checked') ? (cost += $dataCost) : (cost -= $dataCost);

    // printing out the total cost to the page dynamically
    $costHTML.text(`Total: $${cost}`);

    // looping over the input fields and set the date to a variable
    $('.activities input').each(function() {
      const $inputDate = $(this).attr('data-day-and-time');

      if (
        $dataDate === $inputDate && // if the date attributes are the same
        $checkbox !== $(this) && // but they are not the same activity
        $dataDate !== undefined // and there is an actual date attribute
      ) {
        // plus the checkbox is checked
        if ($checkbox.prop('checked')) {
          // disable the conflicting input tag
          $(this).attr('disabled', true);
          // otherwise let it be enabled
        } else {
          $(this).attr('disabled', false);
        }
        // remove disabled attribute from the clicked element so it can be modified later
        $checkbox.removeAttr('disabled', false);
      }
    });
  });

  /* *****************************************
  "Payment Info" section
  ***************************************** */

  // show only 'credit card' option initially
  hideSelected('#payment option', 0);
  addSelected('#payment option', 1);
  $('#paypal').hide();
  $('#bitcoin').hide();

  $('#payment').on('change', function(event) {
    switch ($(event.target).val()) {
      case 'credit card':
        handlePayment(event.target, 'credit');
        break;
      case 'paypal':
        handlePayment(event.target, 'paypal');
        break;
      case 'bitcoin':
        handlePayment(event.target, 'bitcoin');
        break;
      default:
        break;
    }
  });

  /* *****************************************
  Form validation
  ***************************************** */
});

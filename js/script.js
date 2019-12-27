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
    $(color)
      .eq(index)
      .attr('selected', true);
  }

  function removeSelected(color, index) {
    $(color)
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
  // hide the color menu until theme is selected
  $('#colors-js-puns').hide();

  // update the 'color' field to read "Please select a T-shirt theme"
  const $warning = $('<option>Please select a T-shirt theme</option>');
  $('#color').prepend($warning.attr('selected', true).attr('disabled', true));

  // hide the colors in the 'color' drop down menu
  $('#color option').hide();

  // use 'change' event listener on 'design' menu 'select' element
  $('#design').on('change', function(event) {
    // bring the color menu back upon change
    $('#colors-js-puns').show();
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

  function validateName(name) {
    const regex = /^\s*$/;

    // return true if the input is not blank
    if (!regex.test($(name).val())) {
      $(name).css('border', '2px solid green');
      return true;
    }
    $(name)
      .css('border', '2px solid red')
      .attr('placeholder', 'Please type in your name');
    return false;
  }

  function validateEmail(mail) {
    // [a-zA-Z0-9] : ensures that the first character is not special character
    // [a-zA-Z0-9._]+ : can only contain charachters and '.' and '_' at least 1 time
    // @[a-zA-Z0-9] : can only contain characters after '@', at least 1 character
    // \.[a-zA-Z0-9]+ : can only contain characters after '.', at least 1 character
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/i;

    // if the input field is empty, ask for compliance
    if ($(mail).val() === '') {
      $(mail)
        .css('border', '2px solid red')
        .attr('placeholder', 'Please type in your email address');
      return false;
    }
    // if the given email is OK, the border will be green
    if (regex.test($(mail).val())) {
      $(mail).css('border', '2px solid green');
      return true;
    }
    // otherwise turn it to red
    $(mail).css('border', '2px solid red');
    return false;
  }

  function validateActivity(checkbox) {
    const $h2 = $('<h2>At least one option must be selected!</h2>');
    $('.activities').prepend($h2.css('color', 'red').attr('hidden', true));
    let counter = 0;

    $(checkbox).each(function() {
      if ($(this).prop('checked')) {
        counter += $(this).length;
      }
    });

    // if at least 1 tag returns true (greater than or equals 1), return true
    if (counter >= 1) {
      return true;
    } // else show the alert and return false
    $h2.show().fadeOut(3000);
    return false;
  }

  function validatePayment(paymentType, number, zip, cvv) {
    const $emptyCardField = $('<h3>Please enter a credit card number.</h3>');
    const $onlyTenNumbers = $(
      '<h3>Please enter a number that is between 13 and 16 digits long.</h3>'
    );
    $('fieldset')
      .eq(3)
      .prepend($emptyCardField.css('color', 'red').attr('hidden', true));
    $('fieldset')
      .eq(3)
      .prepend($onlyTenNumbers.css('color', 'red').attr('hidden', true));

    const regexCard = /^\d{13,16}$/; // 13-16 long number
    const regexZip = /^\d{5}$/; // exactly 5 characters long number
    const regexCvv = /^\d{3}$/; // exactly 3 characters long number

    if ($(paymentType).val() === 'credit card') {
      // and if the inputs of $('#cc-num'); $('#zip'); $('#cvv') are all true after regex validation
      if (
        regexCard.test(parseInt($(number).val())) &&
        regexZip.test(parseInt($(zip).val())) &&
        regexCvv.test(parseInt($(cvv).val()))
      ) {
        // return true and make borders green
        $('#credit-card input').css('border', '2px solid green');
        return true;
      }
      // if the credit card field is not empty
      if ($(number).val() === '') {
        $emptyCardField.show().fadeOut(3000);
      } else if ($(number).val().length > 0 <= 10) {
        $onlyTenNumbers.show().fadeOut(3000);
      }
      // else, return false and display borders as red
      $('#credit-card input').css('border', '2px solid red');
      $('#credit-card input').val('');
      return false;
    }
    return true;
  }

  // validating the email address real time
  $('#mail').on('keyup', function() {
    validateEmail(this);
  });

  $('form').on('submit', function(event) {
    event.preventDefault();

    // check if all the functions return true
    if (
      validateName($('#name')) &&
      validateActivity($('.activities input')) &&
      validatePayment($('#payment'), $('#cc-num'), $('#zip'), $('#cvv'))
    ) {
      // if so, show the user that his form has been successfuly validated
      $('form')
        .eq(-1)
        .append(
          $('<h1>Validation successful!</h1>')
            .css('color', 'green')
            .fadeOut(3000)
        );
      return true;
    }
    // otherwise show that some reuqired fields fail the validation process
    $('form')
      .eq(-1)
      .append(
        $('<h1>Validation failed!</h1>')
          .css('color', 'red')
          .fadeOut(3000)
      );
    return false;
  });
});

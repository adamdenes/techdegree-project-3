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

  function removeHTML(field, removeable) {
    $(field).each(function() {
      $(this)
        .hide()
        .remove($(removeable));
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
    // once theme is selected, hide 'Select theme'
    hideSelected($('#design option'), 0);
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
    const $emptyName = $('<h3>Please type in your name</h3>');
    $('fieldset')
      .eq(0)
      .prepend($emptyName.css('color', 'red').attr('hidden', true));

    // return true if the input is not blank
    if (!regex.test($(name).val())) {
      $(name).css('border', '2px solid green');
      return true;
    }
    $emptyName.show().fadeOut(3000);
    $(name).css('border', '2px solid red');
    return false;
  }

  function validateEmail(mail) {
    // [a-zA-Z0-9] : ensures that the first character is not special character
    // [a-zA-Z0-9._]+ : can only contain charachters and '.' and '_' at least 1 time
    // @[a-zA-Z0-9] : can only contain characters after '@', at least 1 character
    // \.[a-zA-Z0-9]+ : can only contain characters after '.', at least 1 character
    const regex = /^[a-zA-Z0-9][a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/i;
    const $emptyMail = $('<h3>Please type in your email address</h3>');
    $('fieldset')
      .eq(0)
      .prepend($emptyMail.css('color', 'red').attr('hidden', true));

    if ($(mail).val().length === 0) {
      $emptyMail.show().fadeOut(3000);
      $(mail).css('border', '2px solid red');
      return false;
    }
    if (regex.test($(mail).val())) {
      $(mail).css('border', '2px solid green');
      return true;
    }
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
    const $emptyCardField = $('<h2>Please enter a credit card number.</h>');
    const $onlyTenNumbers = $(
      '<h2>Please enter a number that is between 13 and 16 digits long.</h2>'
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
      // if the credit card field is not empty
      if ($(number).val().length === 0) {
        $emptyCardField.show().fadeOut(3000);
        $('#cc-num').css('border', '2px solid red');
      } else if ($(number).val().length <= 10) {
        $('#cc-num').css('border', '2px solid red');
        $onlyTenNumbers.show().fadeOut(3000);
      } else {
        $('#cc-num').css('border', '2px solid green');
      }
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
      // else, return false and display borders as red
      $('#credit-card input').css('border', '2px solid red');
      // $('#credit-card input').val('');
      return false;
    }
    return true;
  }

  // validating the name input field real time
  $('#name').on('keyup', function() {
    validateName(this);
  });

  // validating the email address real time
  $('#mail').on('keyup', function() {
    validateEmail(this);
  });

  // validating the credit card number real time
  $('#cc-num').on('keyup', function() {
    const $emptyCardField = $(
      '<h2 id="empty">Please enter a credit card number.</h>'
    );
    const $onlyTenNumbers = $(
      '<h2 id="between">Please enter a number that is between 13 and 16 digits long.</h2>'
    );
    $('fieldset')
      .eq(3)
      .prepend($emptyCardField.css('color', 'red').attr('hidden', true));
    $('fieldset')
      .eq(3)
      .prepend($onlyTenNumbers.css('color', 'red').attr('hidden', true));

    if ($('#cc-num').val().length === 0) {
      $('#cc-num')
        .css('border', '2px solid red')
        .one();
      $emptyCardField.show();
    } else if ($('#cc-num').val().length === 10) {
      $('#cc-num').css('border', '2px solid red');
      $onlyTenNumbers.show();
    } else if (
      $('#cc-num').val().length > 12 &&
      $('#cc-num').val().length < 17
    ) {
      $('#cc-num').css('border', '2px solid green');
      // remove every extra dynamic warning if input is between 13-16 number
      removeHTML($('fieldset h2'), $('#empty'));
      removeHTML($('fieldset h2'), $('#between'));
      return true;
    } else {
      $('#cc-num').css('border', '2px solid red');
    }
  });

  function jumpToInvalid(field) {}

  $('form').on('submit', function(event) {
    // submit form only if every validation returns true
    // jump to the invalid field
    if (!validateName($('#name'))) {
      event.preventDefault();
      $('#name').focus();
    }
    if (!validateEmail($('#mail'))) {
      event.preventDefault();
      $('#mail').focus();
    }
    if (!validateActivity($('.activities input'))) {
      event.preventDefault();
      $('.activities input').focus();
    }
    if (!validatePayment($('#payment'), $('#cc-num'), $('#zip'), $('#cvv'))) {
      event.preventDefault();
      $('#payment').focus();
    }
    // if the form is empty, jump to name field
    $('#name').focus();
  });
});

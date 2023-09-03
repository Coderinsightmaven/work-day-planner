// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  $(".content").each(function () {
    var $content = $(this); // Select the current element
    var id = $content.attr("id"); // Get the 'id' attribute

    // Split the 'id' by the '-' character and get the last part as the hour
    var parts = id.split("-");
    var hour = parseInt(parts[parts.length - 1], 10); // Parse the hour as an integer

    // Remove all classes from the current element
    $content.removeClass("past present future");

    // // Get the current hour using Day.js
    const currentHour = dayjs().format("H");

    // Determine the class based on the extracted hour

    if (currentHour < hour) {
      $content.addClass("future");
    } else if (currentHour == hour) {
      $content.addClass("present");
    } else {
      $content.addClass("past");
    }
  });

  // Get the current date using DayJS and format it
  const currentDate = dayjs().format("dddd, MMMM D, YYYY");

  // Find the #currentDay element and update its text
  $("#currentDay").text(currentDate);
});

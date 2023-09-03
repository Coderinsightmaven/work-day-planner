$(function () {
  // Function to save event to local storage
  function saveEvent(hour, eventText) {
    localStorage.setItem(`event-${hour}`, eventText);
  }

  //Function to load events from local storage and display them
  function loadEvents() {
    $(".time-block").each(function () {
      var $timeBlock = $(this);
      var hour = $timeBlock.attr("id").split("-")[1];
      var eventText = localStorage.getItem(`event-${hour}`);
      if (eventText) {
        $timeBlock.find(".description").val(eventText);
      }
    });
  }

  //click event listener to save buttons
  $(".saveBtn").on("click", function () {
    var $timeBlock = $(this).closest(".time-block");
    var hour = $timeBlock.attr("id").split("-")[1];
    var eventText = $timeBlock.find(".description").val();
    saveEvent(hour, eventText);
  });

  // Load events from local storage when the page loads
  loadEvents();

  // Update time-block classes based on the current time
  $(".content").each(function () {
    var $content = $(this);
    var id = $content.attr("id");
    var parts = id.split("-");
    var hour = parseInt(parts[parts.length - 1], 10);
    $content.removeClass("past present future");
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

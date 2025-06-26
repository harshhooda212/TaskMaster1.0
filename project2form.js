$(document).ready(function () {
  function loadTasks() {
    $.get('http://localhost:3000/users', function (data) {
      const container = $('#card-container');
      const messageBox = $('#status-message');
      const progressBar = $('#task-progress-bar');
      container.empty();

    
      if (data.length === 10) {
        messageBox
          .text('Congratulations! You completed 10 tasks.')
          .removeClass()
          .addClass('alert alert-success text-center fw-bold fs-5');
      } else if (data.length > 7) {
        messageBox
          .text('Good! You have more than 7 tasks.')
          .removeClass()
          .addClass('alert alert-primary text-center fw-bold fs-5');
      } else {
        messageBox
          .text('Bad! Less than 7 tasks completed.')
          .removeClass()
          .addClass('alert alert-warning text-center fw-bold fs-5');
      }

      
      const totalTasks = data.length;
      const percentage = Math.min((totalTasks / 10) * 100, 100);
      progressBar
        .css('width', `${percentage}%`)
        .text(`${Math.round(percentage)}%`);

      if (totalTasks === 10) {
        progressBar
  .removeClass()
  .addClass('progress-bar progress-bar-black progress-bar-striped progress-bar-animated');

      } else if (totalTasks > 7) {
        progressBar
  .removeClass()
  .addClass('progress-bar progress-bar-black progress-bar-striped progress-bar-animated');

      } else {
        progressBar
  .removeClass()
  .addClass('progress-bar progress-bar-black progress-bar-striped progress-bar-animated');

      }

      for(i=0;i<=data.length;i+=3){
        const row = $('<div class="row mb-4"></div>');

        const chunk=data.slice(i,i+3);
      
 
      data.forEach((user, index) => {
        const departments = user.departments.map(dept =>
          `<span class="badge bg-secondary me-1">${dept}</span>`
        ).join(" ");

        const card = `
          <div class="col-md-4" data-aos="fade-up" style="padding-top:24px;">
            <div class="card shadow h-100">
              <div class="card-body" style="padding:10px; top:10px;">
                <h5 class="card-title">Task ${index + 1}</h5>
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Review:</strong> ${user.review}</p>
                <p><strong>Departments:</strong> ${departments}</p>
                <p><strong>Start Date:</strong> ${user.startDate}</p>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span class="delete-btn" data-id="${user.id}" style="cursor: pointer;"><img src="delete.png" style="width:20px; height:20px;" /></span>
                <span class="edit-btn" style="cursor: pointer;"><img src="edit.png" style="width:20px; height:20px;" /></span>
              </div>
            </div>
          </div>`;
        row.append(card);
      });
      container.append(row);
    }

      
      $('.delete-btn').on('click', function () {
        const userId = $(this).data('id');

        if (confirm('Are you sure you want to delete this task?')) {
          $.ajax({
            url: `http://localhost:3000/users/${userId}`,
            method: 'DELETE',
            success: function () {
              alert('Task deleted!');
              loadTasks(); 
            },
            error: function () {
              alert('Failed to delete task.');
            }
          });
        }
      });
    });
  }

  // Load tasks on page load
  loadTasks();

  // Submit new task
  $('#agent-form').on('submit', function (e) {
    e.preventDefault();

    const departments = [];
    $('input[name="department"]:checked').each(function () {
      departments.push($(this).val());
    });

    const startDate = `${$('#day').val()}/${$('#month').val()}/${$('#year').val()}`;

    const user = {
      name: $('#name').val(),
      review: $('input[name="review"]:checked').val(),
      departments: departments,
      startDate: startDate,
      notes: $('#notes').val()
    };

     if (
    !name ||
    !review ||
    departments.length === 0 ||
    !day || !month || !year ||
    !notes
  ) {
    alert('Please fill all fields before submitting.');
    return; 
  }

 

    $.ajax({
      url: 'http://localhost:3000/users',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(user),
      success: function () {
        alert('Task added!');
        $('#agent-form')[0].reset();
        loadTasks(); 
      },
      error: function () {
        alert('Failed to add task.');
      }
    });
  });
});

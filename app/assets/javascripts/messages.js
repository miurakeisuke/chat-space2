$(function(){
  function buildHTML(message){
    var html = `<div class="chat-main__content">
                <div class="chat-main__content__name">${message.user.name}</div>
                <div class="chat-main__content__date">${message.created_at}</div>
                <div class="chat-main__content__message">
                <p class="chat-main__content__message__word">${message.body}</p>
                </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log("ok");
      var html = buildHTML(data);
      console.log(html)
      $('').append(html)
      $('.textbox').val('')
    })
    .fail(function(){
      alert('error');
    })
  })
});

$(function(){
  function buildHTML(message){
  var insertImage = '';
    if (message.image) {
    insertImage = `<img src="${message.image}" width="80px" height="80px">`;
    }

    var html = `
      <div class="chat-main__content">
        <div class="chat-main__content__name">${message.name}</div>
        <div class="chat-main__content__date">${message.date}</div>
        <div class="chat-main__content__message">
          <p class="chat-main__content__message__word">${message.body}</p>
          <div class="message__image">${message.image}</div>
        </div>
      </div>`;

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main').append(html)
      $('#new_message')[0].reset();
      $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 500);
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })
});

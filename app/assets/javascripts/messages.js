$(function(){
  function scroll () {
    $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 500);
  }
  function buildHTML(message){
  var insertImage = '';
    if (message.image) {
    insertImage = `<img src="${message.image}" width="80px" height="80px">`;
    }

    var html = `
      <div class="chat-main__content" data-message-id="${message.id}">
        <div class="chat-main__content__name">${message.name}</div>
        <div class="chat-main__content__date">${message.date}</div>
        <div class="chat-main__content__message">
          <p class="chat-main__content__message__word">${message.body}</p>
          <div class="message__image">${insertImage}</div>
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
      $('.chat-main').append(html);
      $('#new_message')[0].reset();
      scroll();
    })
    .fail(function(){
      alert('error');
    })
    return false;
  })

  function buildMESSAGE(new_message) {
    var insertImage = '';
    if (new_message.image) {
    insertImage = `<img src="${new_message.image}" width="80px" height="80px">`;
    }

    var html = `
      <div class="chat-main__content" data-message-id="${new_message.id}">
        <div class="chat-main__content__name">${new_message.name}</div>
        <div class="chat-main__content__date">${new_message.date}</div>
        <div class="chat-main__content__message">
          <p class="chat-main__content__message__word">${new_message.body}</p>
          <div class="message__image">${insertImage}</div>
        </div>
      </div>`;

    return html;
  }

  $(function(){
    setInterval(update, 5000);
  });
  function update(){
    var message_id = $('.chat-main__content:last').data('message-id');
    $.ajax({
      type: 'GET',
      url: location.href,
      data: { id: message_id },
      dataType: 'json',
    })
    .done(function(new_messages){
      var insertHTML = '';
      new_messages.forEach(function(message) {
        insertHTML += buildMESSAGE(message);
      });
      $('.chat-main').append(insertHTML);
      scroll();
    })
    .fail(function(message) {
      alert('自動更新に失敗しました');
    });
  }
});

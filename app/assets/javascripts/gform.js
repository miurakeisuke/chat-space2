$(function() {

  var search_list = $("#user-search-result");

  var member_list = $(".chat-group-user__name");

  function appendUser(user) {
  var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>`;
    search_list.append(html);
  }

  function appendNouser(user) {
    var html = `<li>
                  <p class="chat-group-user__name">${ user }</p>
                </li>`
      search_list.append(html);
  }

  function memberUser(id,name) {
    var html = `
      <div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
        <input name='group[user_ids][]' type='hidden' value='${id}'>
        <p class='chat-group-user__name'>${name}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
      member_list.append(html);

  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
      contentType: false
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNouser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
  $(document).on('click','.user-search-add',function(){
    var name = $(this).data('user-name')
    var id = $(this).data('user-id')
    memberUser(id, name);
    var choice = $(this).closest('div')
    choice.remove();
  });
  $(document).on('click', '.user-search-remove', function(){
     var choice = $(this).closest('div')
     choice.remove();
  });
});

json.array! @new_messages.each do |new_message|
  json.name     new_message.user.name
  json.date     new_message.created_at.strftime("%Y年%m月%d日 %H時%M分")
  json.body     new_message.body
  json.image    new_message.image.url
  json.id       new_message.id
end



class MessagesController < ApplicationController
  def index
  end

  def create
    @message = Message.new(messages.params)
  end

end

class GroupsController < ApplicationController

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to group_messages_path(@group.id), notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
  end
end

  private
  def group_params
    params.require(:group).permit(:id, :name, :user_ids => [])
  end


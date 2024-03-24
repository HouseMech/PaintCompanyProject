class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :check_admin, only: [:index]

  def index
    @users = User.all
    render json: @users
  end

  def show
    user = user_from_token
    render json: {
      message: "test",
      user: user
    }
  end

  private
  def user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], Rails.application.credentials.devise[:jwt_secret_key]).first
    user_id = jwt_payload['sub']
    user = User.find(user_id.to_s)
  end
end

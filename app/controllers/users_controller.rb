class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :check_admin, only: [:index, :update]

  def index
    @users = User.all
    render json: @users
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)

      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # Used to keep the user signed in via token in localstorage
  def show
    user = user_from_token
    render json: {
      message: "Token still valid",
      user: user
    }
  end

  private

  def user_params
    params.require(:user).permit(:role, :is_active)
  end

  def user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], Rails.application.credentials.devise[:jwt_secret_key]).first
    user_id = jwt_payload['sub']
    user = User.find(user_id.to_s)
  end
end

# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      message: 'You are logged in',
      user: current_user
    }, status: :ok
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: {message: "Logged out"}, status: :ok
  end

  def log_out_failure
    render json: {message: "Failed to logout"}, status: :unauthorized
  end
end

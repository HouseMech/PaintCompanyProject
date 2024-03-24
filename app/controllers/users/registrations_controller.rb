# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: {
      message: 'Sign up successful',
      user: current_user
    }, status: :ok
  end

  def register_failed
    render json: {
      message: 'Failed to register user',
    }, status: :unprocessable_entity
  end
end

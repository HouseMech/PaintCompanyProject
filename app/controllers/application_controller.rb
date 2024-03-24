class ApplicationController < ActionController::API

  private
  def check_admin
    render json: { error: "Not authorized" }, status: :forbidden unless current_user.admin?
  end

  def check_painter
    render json: { error: "Not authorized" }, status: :forbidden unless current_user.painter? || current_user.admin?
  end
end

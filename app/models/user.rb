class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  enum role: {default: 0, painter: 1, admin: 2}
  # Users can view the paints and their statuses, but not make any changes
  # Painters can modify the paint stock, as they consume it during work
  # Managers can
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  def active_for_authentication?
    # Super is necessary per the devise documents
    # is_active is what we'll look at to see if a user account should be allowed to sign in or not.
    super and self.is_active?
  end

  def inactive_message
    "Your account is deactivated."
  end
end

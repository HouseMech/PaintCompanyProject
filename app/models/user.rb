class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  enum role: {user: 0, painter: 1, admin: 2}
  # Users can view the paints and their statuses, but not make any changes
  # Painters can modify the paint stock, as they consume it during work
  # Managers can
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist
end

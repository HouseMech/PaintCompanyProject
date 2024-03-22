class AddStatusToPaint < ActiveRecord::Migration[7.1]
  def change
    add_column :paints, :status, :string
  end
end

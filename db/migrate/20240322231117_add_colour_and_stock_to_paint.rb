class AddColourAndStockToPaint < ActiveRecord::Migration[7.1]
  def change
    add_column :paints, :colour, :string
    add_column :paints, :stock, :integer
  end
end

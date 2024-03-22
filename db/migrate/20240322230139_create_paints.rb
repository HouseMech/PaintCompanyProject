class CreatePaints < ActiveRecord::Migration[7.1]
  def change
    create_table :paints do |t|

      t.timestamps
    end
  end
end

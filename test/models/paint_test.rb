require "test_helper"

class PaintTest < ActiveSupport::TestCase
  test 'validations' do
    def it_has_a_colour
      paint = Paint.new([:colour] => 'black')
      assert paint.colour == 'black'
    end

    def it_has_a_stock
      paint = Paint.new([:stock] => 7)
      assert paint.stock == 7
    end
  end
end

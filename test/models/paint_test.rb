require "test_helper"

class PaintTest < ActiveSupport::TestCase
  test 'should have a colour' do
    paint = Paint.new(:colour => 'black')
    assert paint.colour == 'black'
  end

  test 'should have a stock' do
    paint = Paint.new(:stock => 7)
    assert paint.stock == 7
  end

  test 'it should have a status' do
    paint = Paint.new(:status => 'available')
    assert paint.status == 'available'
  end
end

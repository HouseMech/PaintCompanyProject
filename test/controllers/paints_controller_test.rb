require "test_helper"

class PaintsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @paint = paints(:one)
  end

  test "should get index" do
    get paints_url, as: :json
    assert_response :success
  end

  test "should create paint" do
    assert_difference("Paint.count") do
      post paints_url, params: { paint: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show paint" do
    get paint_url(@paint), as: :json
    assert_response :success
  end

  test "should update paint" do
    patch paint_url(@paint), params: { paint: {  } }, as: :json
    assert_response :success
  end

  test "should destroy paint" do
    assert_difference("Paint.count", -1) do
      delete paint_url(@paint), as: :json
    end

    assert_response :no_content
  end
end

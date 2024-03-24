require "test_helper"

class PaintsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @paint = paints(:one)
  end

  test "should get unauthorized without sign in" do
    get paints_url, as: :json
    assert_response :unauthorized
  end

  test "should get index" do
    sign_in users(:default_user)
    get paints_url, as: :json
    assert_response :success
  end

  test "should create paint" do
    sign_in users(:admin)
    assert_difference("Paint.count") do
      post paints_url, params: { paint: { colour: 'red', status: 'available', stock: 44 } }, as: :json
    end

    assert_response :created
  end

  test "should show paint" do
    sign_in users(:default_user)
    get paint_url(@paint), as: :json
    assert_response :success
  end

  test "should update paint" do
    sign_in users(:painter)
    patch paint_url(@paint), params: { paint: { colour: 'red', status: 'available', stock: 44 } }, as: :json
    assert_response :success
  end

  test "should destroy paint" do
    sign_in users(:admin)
    assert_difference("Paint.count", -1) do
      delete paint_url(@paint), as: :json
    end

    assert_response :no_content
  end
end

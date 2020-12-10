require 'test_plugin_helper'

class Api::V2::Compliance::ContentStreamsControllerTest < ActionController::TestCase
  test "should get index" do
    FactoryBot.create(:content_stream)
    get :index, :session => set_session_user
    response = ActiveSupport::JSON.decode(@response.body)
    assert response['results'].any?
    assert_response :success
  end

  test "should create content stream" do
    post :create, :params => { :content_stream => { :name => 'Test content stream', :url => 'http://foo.com' } }, :session => set_session_user
    assert_response :success
  end

  test "should update content stream" do
    new_name = 'Updated content stream'
    content_stream = FactoryBot.create(:content_stream)
    put :update, :params => { :id => content_stream.id, :content_stream => { :name => new_name } }, :session => set_session_user
    assert_response :success
    assert content_stream.name, new_name
  end

  test "should destory content stream" do
    content_stream = FactoryBot.create(:content_stream)
    delete :destroy, :params => { :id => content_stream.id }, :session => set_session_user
    assert_response :ok
    refute ForemanOpenscap::OvalContent.exists?(content_stream.id)
  end

  test "should list files in a stream" do
    content_stream = FactoryBot.create(:content_stream)
    ForemanOpenscap::ContentStreamSync.any_instance.stubs(:fetch).returns(OpenStruct.new(:code => 200, :body => read_stream_index))
    get :list, :params => { :id => content_stream.id }, :session => set_session_user
    response = ActiveSupport::JSON.decode(@response.body)
    assert response['results'].any?
    assert_response :success
  end

  test "should check for content changes from a stream" do
    content_stream = FactoryBot.create(:content_stream)
    ForemanOpenscap::ContentStreamSync.any_instance.stubs(:fetch).returns(OpenStruct.new(:code => 200, :body => read_stream_index))
    post :check, :params => { :id => content_stream.id }, :session => set_session_user
    response = ActiveSupport::JSON.decode(@response.body)
    assert response['results']['create'].any?
    assert_response :success
  end

  test "should sync contents from a stream" do
    content_stream = FactoryBot.create(:content_stream)
    ForemanOpenscap::ContentStreamSync.any_instance.stubs(:fetch).returns(OpenStruct.new(:code => 200, :body => read_stream_index))
    ForemanOpenscap::ContentStreamSync.any_instance.stubs(:fetch_content_blob).returns("oval content blob for tests")
    post :sync, :params => { :id => content_stream.id }, :session => set_session_user
    response = ActiveSupport::JSON.decode(@response.body)
    assert response['results'].any?
    assert_response :success
  end

  def read_stream_index
    File.read("#{ForemanOpenscap::Engine.root}/test/files/content_streams/index.html")
  end
end

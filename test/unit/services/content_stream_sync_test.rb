require 'test_plugin_helper'

class ContentStreamSyncTest < ActiveSupport::TestCase
  setup do
    @stream = FactoryBot.create(:content_stream)
  end

  test 'should list contents of a stream' do
    stream_sync = ForemanOpenscap::ContentStreamSync.new
    stream_sync.stubs(:fetch).returns(OpenStruct.new(:code => 200, :body => read_stream_index))

    results = stream_sync.list @stream
    assert results[:results].count > 0
  end

  test 'should check stream for changes' do
    stream_sync = ForemanOpenscap::ContentStreamSync.new
    to_update = FactoryBot.create(:oval_content, :changed_at => DateTime.new(2020, 10, 20), :content_stream_id => @stream.id)
    to_delete = FactoryBot.create(:oval_content, :content_stream_id => @stream.id)
    to_skip = FactoryBot.create(:oval_content, :content_stream_id => @stream.id, :changed_at => DateTime.new(2020, 11, 12))
    to_create = { :filename => 'foo.oval.xml.bz2', :changed_at => DateTime.new(2020, 12, 24) }
    content_list = [
      to_create,
      { :filename => to_skip.original_filename, :changed_at => to_skip.changed_at },
      { :filename => to_update.original_filename, :changed_at => DateTime.new(2020, 10, 21) }
    ]
    stream_sync.stubs(:fetch_content_list).returns(content_list)
    existing_names = ForemanOpenscap::OvalContent.pluck(:name)

    result = stream_sync.check @stream
    assert_equal to_update.id, result[:results][:update].first[:id]
    assert_equal to_create[:filename], result[:results][:create].first[:name]
    assert_equal to_delete.id, result[:results][:delete].first[:id]
    assert_equal to_skip.id, result[:results][:skip].first[:id]
    assert_equal existing_names, ForemanOpenscap::OvalContent.pluck(:name)
  end

  test 'should sync stream' do
    stream_sync = ForemanOpenscap::ContentStreamSync.new
    to_update = FactoryBot.create(:oval_content, :changed_at => DateTime.new(2020, 10, 20), :content_stream_id => @stream.id)
    to_delete = FactoryBot.create(:oval_content, :content_stream_id => @stream.id)
    to_skip = FactoryBot.create(:oval_content, :content_stream_id => @stream.id, :changed_at => DateTime.new(2020, 11, 12))
    to_create = { :filename => 'foo.oval.xml.bz2', :changed_at => DateTime.new(2020, 12, 24) }
    content_list = [
      to_create,
      { :filename => to_skip.original_filename, :changed_at => to_skip.changed_at },
      { :filename => to_update.original_filename, :changed_at => DateTime.new(2020, 10, 21) }
    ]
    stream_sync.stubs(:fetch_content_list).returns(content_list)
    stream_sync.stubs(:fetch_content_blob).returns("oval content blob for tests")

    result = stream_sync.sync(@stream)[:results]
    created = result.find { |res| res[:status] == :created }
    updated = result.find { |res| res[:status] == :updated }
    deleted = result.find { |res| res[:status] == :deleted }
    skipped = result.find { |res| res[:status] == :skipped }
    assert created[:resource][:id]
    assert_equal to_create[:filename], created[:resource][:name]
    assert_equal to_update.id, updated[:resource][:id]
    assert_equal to_delete.id, deleted[:resource][:id]
    assert_equal to_skip.id, skipped[:resource][:id]
  end

  test 'should not modify contents that do not belong to stream' do
    stream_sync = ForemanOpenscap::ContentStreamSync.new
    second_stream = FactoryBot.create(:content_stream)
    oval_other_content = FactoryBot.create(
      :oval_content,
      :original_filename => 'file-from-stream.xml.bz2',
      :content_stream_id => second_stream.id,
      :changed_at => DateTime.new(2020, 11, 12)
    )

    to_create = { :filename => oval_other_content.original_filename, :changed_at => DateTime.new(2020, 11, 13) }
    stream_sync.stubs(:fetch_content_list).returns([to_create])
    stream_sync.stubs(:fetch_content_blob).returns("oval content blob for tests")

    result = stream_sync.sync(@stream)[:results]
    created = result.find { |res| res[:status] == :created }
    assert_not_equal created[:id], oval_other_content
    assert_equal ForemanOpenscap::OvalContent.find(created[:resource][:id]).content_stream, @stream
    assert_equal oval_other_content.reload.content_stream, second_stream
  end

  def read_stream_index
    File.read("#{ForemanOpenscap::Engine.root}/test/files/content_streams/index.html")
  end
end

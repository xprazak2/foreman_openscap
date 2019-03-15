require 'test_plugin_helper'

class BulkUploadTest < ActiveSupport::TestCase
  setup do
    ForemanOpenscap::ScapContent.any_instance.stubs(:fetch_profiles).returns({ "xccdf.test.profile" => "Profile title" })
  end

  test 'upload_from_files should create only one scap content' do
    scap_files = ["#{ForemanOpenscap::Engine.root}/test/files/scap_contents/ssg-fedora-ds.xml"]
    assert_difference('ForemanOpenscap::ScapContent.count', 1) do
      2.times do
        ForemanOpenscap::BulkUpload.new.upload_from_files(scap_files)
      end
    end
  end

  test 'upload from directory should upload all files' do
    assert_difference('ForemanOpenscap::ScapContent.count', 2) do
      ForemanOpenscap::BulkUpload.new.upload_from_directory "#{ForemanOpenscap::Engine.root}/test/files/scap_contents"
    end
  end

  test 'upload from directory with invalid path should provide meaningful error' do
    dir = "#{ForemanOpenscap::Engine.root}/test/files/scap_contents/invalid"
    res = ForemanOpenscap::BulkUpload.new.upload_from_directory dir
    assert_equal "No such directory #{dir}, please check the path you have provided", res.errors.first
  end

  test 'upload from files with invalid file path should skip those files' do
    path = "#{ForemanOpenscap::Engine.root}/test/files/scap_contents/foo-ds.xml"
    res = ForemanOpenscap::BulkUpload.new.upload_from_files [path]
    assert_equal "File not found", res.skipped[path]
  end

  test 'should provide errors when scap-security-guide is not detected' do
    upload = ForemanOpenscap::BulkUpload.new
    upload.stubs(:scap_security_guide_absent?).returns(true)
    res = upload.upload_default
    assert_equal "Can't find scap-security-guide RPM", res.errors.first
  end

  test 'should provide errors when no ds files from scap-security-guide detected' do
    upload = ForemanOpenscap::BulkUpload.new
    upload.stubs(:scap_security_guide_files).returns([])
    upload.stubs(:scap_security_guide_absent?).returns(false)
    res = upload.upload_default
    assert_equal 'No ds files from scap-security-guide found!', res.errors.first
  end

  test 'should upload files from scap-security-guide' do
    upload = ForemanOpenscap::BulkUpload.new
    path = "#{ForemanOpenscap::Engine.root}/test/files/scap_contents"
    files = ["#{path}/ssg-fedora-ds.xml", "#{path}/ssg-firefox-ds.xml"]
    upload.stubs(:scap_security_guide_files).returns(files)
    upload.stubs(:scap_security_guide_absent?).returns(false)
    assert_difference('ForemanOpenscap::ScapContent.count', 2) do
      upload.upload_default
    end
  end
end

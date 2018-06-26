class DataScapContentProfilesController < ::Api::V2::BaseController
  def resource_name
    '::ForemanOpenscap::ScapContentProfile'
  end

  def index
    @scap_content_profiles = resource_scope_for_index(:permission => :view_scap_content_profiles).includes(:tailoring_file, :scap_content)
  end
end

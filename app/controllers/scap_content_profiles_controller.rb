class ScapContentProfilesController < ApplicationController
  def model_of_controller
    ::ForemanOpenscap::ScapContentProfile
  end

  def index
  end

  def list
    @scap_content_profiles = resource_base
  end
end

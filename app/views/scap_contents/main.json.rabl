object @scap_content

extends "api/v2/compliance/scap_contents/base"

attributes :created_at, :updated_at

node :permissions do |scap_content|
  scap_content.ui_permissions if scap_content
end

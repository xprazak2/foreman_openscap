object @tailoring_file

extends "api/v2/compliance/tailoring_files/base"

attributes :created_at, :updated_at

node :permissions do |tailoring_file|
  tailoring_file.ui_permissions if tailoring_file
end

object @scap_content_profile

extends "api/v2/compliance/scap_content_profiles/base"

child :scap_content do
  extends "api/v2/compliance/scap_contents/main"
end

child :tailoring_file do
  extends "api/v2/compliance/tailoring_files/main"
end
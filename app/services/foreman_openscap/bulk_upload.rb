require 'digest/sha2'
module ForemanOpenscap
  class BulkUpload
    attr_reader :errors, :skipped

    def initialize
      @errors = []
      @skipped = {}
      @created = []
    end

    def upload_default
      if scap_security_guide_absent?
        @errors << "Can't find scap-security-guide RPM"
        return results
      end

      files_array = scap_security_guide_files
      @errors << 'No ds files from scap-security-guide found!' if files_array.empty?
      upload_from_files files_array, true
    end

    def upload_from_directory(directory_path)
      unless directory_path.blank? || Dir.exist?(directory_path)
        @errors << "No such directory #{directory_path}, please check the path you have provided"
        return results
      end

      upload_from_files Dir["#{directory_path}/*.xml"]
    end

    def upload_from_files(files_array, from_scap_security_guide = false)
      files_array.each do |datastream|
        unless File.file? datastream
          @skipped[datastream] = "File not found"
          next
        end
        file = File.open(datastream, 'rb').read
        digest = Digest::SHA2.hexdigest(datastream)
        title = content_name(datastream, from_scap_security_guide)
        filename = original_filename(datastream)
        scap_content = ScapContent.where(:title => title, :digest => digest).first_or_initialize
        next if scap_content.persisted?
        scap_content.scap_file = file
        scap_content.original_filename = filename
        scap_content.location_ids = Location.all.map(&:id) if SETTINGS[:locations_enabled]
        scap_content.organization_ids = Organization.all.map(&:id) if SETTINGS[:organizations_enabled]

        if scap_content.save
          @created << datastream
        else
          @skipped[datastream] = scap_content.errors.full_messages.uniq.join(', ')
        end
      end
      results
    end

    private

    def scap_security_guide_absent?
      `rpm -qa | grep scap-security-guide`.empty?
    end

    def scap_security_guide_files
      `rpm -ql scap-security-guide | grep ds.xml`.split
    end

    def extract_name_from_file(file)
      # SCAP datastream files are in format of ssg-<OS>-ds.xml
      # We wish to extract the <OS> and use it to create a name
      original_filename(file).gsub('ssg-', '').gsub('-ds.xml', '')
    end

    def original_filename(file)
      file.split('/').last
    end

    def content_name(datastream, from_scap_security_guide)
      os_name = extract_name_from_file(datastream)
      from_scap_security_guide ? "Red Hat #{os_name} default content" : "#{os_name} content"
    end

    def results
      OpenStruct.new(:errors => @errors, :skipped => @skipped, :created => @created)
    end
  end
end

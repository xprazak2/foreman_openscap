module ForemanOpenscap
  module OvalConfig
    class SetupCheck
      attr_reader :result, :id, :fail_msg_data

      def initialize(id, title, fail_msg)
        @id = id
        @title = title
        @fail_msg = fail_msg
        @result = :not_checked
      end

      def fail_with!(fail_data)
        @fail_msg_data = fail_data
        @result = :fail
      end

      def pass!
        @result = :pass
      end

      def failed?
        @result == :fail
      end

      def fail_msg
        binding.pry
        @fail_msg.call @fail_msg_data
      end

      def to_h
        {
          :title => @title,
          :result => readable_result,
          :fail_message => failed? ? fail_msg : nil
        }
      end

      def readable_result
        {
          :pass => "OK",
          :fail => "Failed",
          :not_checked => "Not Checked"
        }[@result]
      end
    end
  end
end

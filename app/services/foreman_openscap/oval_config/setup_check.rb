module ForemanOpenscap
  module OvalConfig
    class SetupCheck
      attr_reader :result, :id

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

      def passed?
        @result == :pass
      end

      def not_checked?
        @result == :not_checked
      end

      def fail_msg
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
          :pass => _("OK"),
          :fail => _("Failed"),
          :not_checked => _("Not Checked")
        }[@result]
      end
    end
  end
end

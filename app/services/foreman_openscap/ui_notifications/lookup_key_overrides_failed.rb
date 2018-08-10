module ForemanOpenscap
  module UINotifications
    class LookupKeyOverridesFailed < ::UINotifications::Base
      def create
        Notification.create!(
          subject: 'Foreman Scap Client',
          initiator: initiator,
          audience: audience,
          notification_blueprint: blueprint,
          actions: actions
        )
      end

      def audience
        ::Notification::AUDIENCE_SUBJECT
      end

      def blueprint
        @blueprint ||= NotificationBlueprint.find_by(name: 'scap_lookup_key_override_failed')
      end
    end
  end
end

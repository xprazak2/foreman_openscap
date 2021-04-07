module Types
  class OvalPolicy < BaseObject
    description 'An OVAL Policy'
    model_class ::ForemanOpenscap::OvalPolicy

    global_id_field :id
    timestamps
    field :name, String
    field :description, String
    field :period, String
    field :weekday, String
    field :day_of_month, String
    field :cron_line, String
    has_many :hostgroups, Types::Hostgroup
    field :all_hosts, Types::Host.connection_type, null: false, resolve: (proc { |object| object.all_hosts })

    def self.graphql_definition
      super.tap { |type| type.instance_variable_set(:@name, 'ForemanOpenscap::OvalPolicy') }
    end
  end
end

Rails.application.routes.draw do
  scope '/compliance' do
    resources :arf_reports, :only => %i[index show destroy] do
      member do
        get 'show_html'
        get 'parse_html'
        get 'parse_bzip'
        get 'download_html'
      end
      collection do
        get 'auto_complete_search'
        get 'delete_multiple'
        post 'submit_delete_multiple'
      end
    end

    get 'dashboard', :to => 'compliance_dashboard#index', :as => "compliance_dashboard"

    resources :policies, :only => %i[index new show create edit update destroy] do
      member do
        get 'parse', :to => 'policies#parse'
        get 'dashboard', :to => 'policy_dashboard#index', :as => 'policy_dashboard'
      end
      collection do
        get 'auto_complete_search'
        post 'scap_content_selected'
        post 'tailoring_file_selected'
        post 'select_multiple_hosts'
        post 'update_multiple_hosts'
        post 'disassociate_multiple_hosts'
        post 'remove_policy_from_multiple_hosts'
      end
    end

    resources :scap_contents do
      collection do
        get 'auto_complete_search'
      end
    end

    resources :tailoring_files, :except => [:show] do
      member do
        get 'xml'
      end
      collection do
        get 'auto_complete_search'
      end
    end

    resources :openscap_proxies, :only => [] do
      member do
        get 'openscap_spool'
      end
    end

    resources :hosts, :only => [:show], :as => :compliance_hosts, :controller => :compliance_hosts

    match 'oval_policies/*page' => 'react#index', :via => :get
    match 'oval_policies' => 'react#index', :via => :get
  end


  namespace :api, :defaults => { :format => 'json' } do
    scope "(:apiv)", :module => :v2, :defaults => { :apiv => 'v2' },
                     :apiv => /v1|v2/, :constraints => ApiConstraints.new(:version => 2, :default => true) do
      namespace :compliance do
        resources :scap_contents, :except => %i[new edit] do
          member do
            get 'xml'
          end
          collection do
            post 'bulk_upload'
          end
        end
        resources :scap_content_profiles, :only => %i[index]

        resources :tailoring_files, :except => %i[new edit] do
          member do
            get 'xml'
          end
        end
        resources :policies, :except => %i[new edit] do
          member do
            get 'content'
            get 'tailoring'
          end
        end
        resources :arf_reports, :only => %i[index show destroy] do
          member do
            get 'download'
            get 'download_html'
          end
        end

        post 'arf_reports/:cname/:policy_id/:date', \
             :constraints => { :cname => /[^\/]+/ }, :to => 'arf_reports#create'

        resources :oval_contents, :except => %i[new edit] do
          collection do
            post 'sync'
          end
        end

        resources :oval_policies, :except => %i[new edit] do
          member do
            post 'assign_hostgroups'
            post 'assign_hosts'
            get 'oval_content'
          end
        end

        post 'oval_reports/:cname/:oval_policy_id/:date', :constraints => { :cname => /[^\/]+/ }, :to => 'oval_reports#create'

        resources :content_streams, :except => %i[new edit] do
          member do
            post 'sync'
            get 'list'
            get 'check'
          end
        end
      end
    end
  end
end

Foreman::Application.routes.draw do
  resources :hosts do
    collection do
      post 'openscap_proxy_changed'
      post 'select_multiple_openscap_proxy'
      post 'update_multiple_openscap_proxy'
    end
  end

  resources :hostgroups do
    collection do
      post 'openscap_proxy_changed'
    end
  end

  namespace :api do
    scope "(:api_version)", :module => :v2,
                            :defaults => { :api_version => 'v2' },
                            :api_version => /v2/,
                            :constraints => ApiConstraints.new(:version => 2, :default => true) do
      constraints(:id => %r{[^\/]+}) do
        resources :hosts, :only => [] do
          member do
            get :policies_enc
          end
        end
      end
    end
  end
end

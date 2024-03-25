server '5.78.115.181', user: 'deploy', roles: %w{app db web worker}
set :branch, "main"

set :rvm_type, :user
set :rvm_ruby_version, '3.3.0'

set :ssh_options, { forward_agent: true }

set :passenger_restart_with_touch, true

require 'pusher'

Pusher.app_id = 'YOUR_APP_ID'
Pusher.key = 'YOUR_APP_KEY'
Pusher.secret = 'YOUR_APP_SECRET'
Pusher.cluster = 'YOUR_APP_CLUSTER'
Pusher.logger = Rails.logger
Pusher.encrypted = true

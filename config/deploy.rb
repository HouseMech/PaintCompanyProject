lock "~> 3.18.1"
set :application, "paint_company_project"
set :repo_url, "git@github.com:HouseMech/PaintCompanyProject.git"
set :deploy_to, "/data/paint_company_project"
append :linked_files, 'config/master.key', "frontend/.env.production.local"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "vendor", "storage", "db/production.sqlite3"

namespace :deploy do
  desc 'Build frontend and move dist files to public'
  task :build_vuejs do
    on roles(:app) do
      within release_path.join('frontend') do
        # Run yarn build
        execute :yarn, 'install'
        execute :yarn, 'run build'
      end

      # Move frontend/dist/index.html to public/index.html
      execute :mv, "#{release_path.join('frontend/dist/index.html')} #{release_path.join('public/index.html')}"

      # Move frontend/dist/assets to public/assets
      # Ensure the public/assets directory is removed if it exists to prevent mv errors
      execute :rm, "-rf #{release_path.join('public/assets')}"
      execute :mv, "#{release_path.join('frontend/dist/assets')} #{release_path.join('public/assets')}"
    end
  end
end

after 'deploy:published', 'deploy:build_vuejs'

lock "~> 3.18.1"
set :application, "paint_company_project"
set :repo_url, "git@github.com:HouseMech/PaintCompanyProject.git"
set :deploy_to, "/data/paint_company_project"
append :linked_files, 'config/master.key'
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "vendor", "storage", "db/production.sqlite3"

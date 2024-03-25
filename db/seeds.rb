# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Paint.create!([
  {
    colour: "black",
    status: "running low",
    stock: 10
  },
  {
    colour: "white",
    status: "out of stock",
    stock: 0
  },
  {
    colour: "purple",
    status: "available",
    stock: 33
  },
  {
    colour: "blue",
    status: "available",
    stock: 30
  },
  {
    colour: "gray",
    status: "running low",
    stock: 4
  }
])

User.create([
  {
    email: 'john@example.com',
    password: '123456789',
    password_confirmation: '123456789',
    role: 0,
    is_active: true
  },
  {
    email: 'jane@example.com',
    password: '123456789',
    password_confirmation: '123456789',
    role: 1,
    is_active: true
  },
  {
    email: 'adam@example.com',
    password: '123456789',
    password_confirmation: '123456789',
    role: 2,
    is_active: true
  },
  {
    email: 'painter@example.com',
    password: '123456789',
    password_confirmation: '123456789',
    role: 1,
    is_active: true
  }
])

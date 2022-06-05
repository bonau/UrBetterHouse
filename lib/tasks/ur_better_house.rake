namespace :ur_better_house do
  desc "install demo_accounts"
  task demo_accounts: :environment do
    STDERR.puts "generating users..."
    User.create(email: "zeus@somemail.com", password: "isthat2022", password_confirmation: "isthat2022", role: "admin")
    User.create(email: "meme@somemail.com", password: "isthat2022", password_confirmation: "isthat2022", role: "user")
    STDERR.puts "done"
  end
end

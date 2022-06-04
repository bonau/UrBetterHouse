class Residential < ApplicationRecord
    validates :title, presence: true
    validates :thumb_pic, format: { with: /(https?:\/\/.*\.(?:png|jpg))/i, message: "only allow url with png/jpg extension" }
    validates :price_per_month, numericality:{ in: 30000..100000 }
    validates :address, presence: true # TODO address format
    validates :total_room, presence: true
    validates :livingroom, presence: true

    has_many :favorites
end

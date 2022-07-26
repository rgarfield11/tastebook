class Recipe < ApplicationRecord
    has_many :ingredients, dependent: :destroy
    belongs_to :user

    validates :title, :description, :image_url, presence: true
end

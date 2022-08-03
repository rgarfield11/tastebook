class Recipe < ApplicationRecord
    belongs_to :user

    has_many :ingredients, dependent: :destroy
    has_many :instructions, dependent: :destroy
    
    accepts_nested_attributes_for :ingredients, allow_destroy: true
    accepts_nested_attributes_for :instructions, allow_destroy: true

    validates :title, :description, :image_url, presence: true
end

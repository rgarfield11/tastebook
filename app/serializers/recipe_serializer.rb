class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image_url, :user_id

  has_many :ingredients
  has_many :instructions
  belongs_to :user

end

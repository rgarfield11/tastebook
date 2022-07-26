class RecipeSerializer < ActiveModel::Serializer
  has_many :ingredients
  attributes :id, :title, :description, :image_url
end

class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :title
      t.text :description
      t.string :image_url
      t.belongs_to :user

      t.timestamps
    end
  end
end

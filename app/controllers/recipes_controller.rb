class RecipesController < ApplicationController
    before_action :find_recipe, only: [:show, :update, :destroy]

    def index
        recipes = Recipe.all
        render json: recipes, status: :ok
    end

    def show
        # @recipe = Recipe.find(params[:id])
        render json: @recipe, status: :ok
    end

    def create
        recipe = Recipe.create!(recipe_params)

        ingredients = params[:ingredients]
        ingredients.each do |ingredient|
            Ingredient.create!(name: ingredient[:name], recipe_id: recipe.id)
        end

        instructions = params[:instructions]
        instructions.each do |instruction|
            Instruction.create!(name: instruction[:name], recipe_id: recipe.id)
        end

        render json: recipe, status: :created
    end

    def update
        @recipe.update!(recipe_params)
        
        render json: @recipe, status: :ok
    end

    def destroy
        @recipe.destroy!

        head :no_content
    end

    private

    def find_recipe
        @recipe = Recipe.find(params[:id])
    end

    def recipe_params
        params.permit(:title, :description, :image_url, :user_id, ingredients_attributes: [:id, :name, :recipe_id, :_destroy], instructions_attributes: [:id, :name, :recipe_id, :_destroy])
    end
end

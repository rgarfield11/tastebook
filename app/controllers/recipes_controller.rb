class RecipesController < ApplicationController
    before_action :find_recipe, only: [:show]

    def index
        recipes = Recipe.all
        render json: recipes, status: :ok
    end

    def show
        render json: @recipe, status: :ok
    end

    def create
        recipe = Recipe.create!(recipe_params)
        render json: recipe, status: :created
    end

    private

    def find_recipe
        @recipe = Recipe.find(params[:id])
    end

    def recipe_params
        params.permit(:title, :description, :user_id)
    end
end

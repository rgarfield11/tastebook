class ApplicationController < ActionController::API
  include ActionController::Cookies
    rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found

    before_action :authorize

    private

    def authorize
      @current_user = User.find_by(id: session[:user_id])
      render json: { errors: ["Not authorized"] }, status: :unauthorized unless @current_user
    end

    def render_record_invalid(exeption)
      render json: {errors: exeption.record.errors.full_messages}, status: :unprocessable_entity
    end

    def render_record_not_found(error)
      render json: {error: "#{error.model} not found"}, status: :not_found
    end
end

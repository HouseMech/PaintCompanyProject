class PaintsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_paint, only: %i[ show update destroy ]


  # GET /paints
  def index
    @paints = Paint.all

    render json: @paints
  end

  # GET /paints/1
  def show
    render json: @paint
  end

  # POST /paints
  def create
    @paint = Paint.new(paint_params)

    if @paint.save
      render json: @paint, status: :created, location: @paint
    else
      render json: @paint.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /paints/1
  def update
    if @paint.update(paint_params)
      Pusher.trigger('paint-channel','update-paint', {

            id: @paint.id,

            colour: @paint.colour,

            status: @paint.status,

            stock: @paint.stock

          })
      render json: @paint
    else
      render json: @paint.errors, status: :unprocessable_entity
    end
  end

  # DELETE /paints/1
  def destroy
    @paint.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_paint
      @paint = Paint.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def paint_params
      params.require(:paint).permit(:status, :stock)
    end
end

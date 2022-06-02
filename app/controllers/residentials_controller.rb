class ResidentialsController < ApplicationController
  before_action :set_residential, only: %i[ show edit update destroy ]

  # GET /residentials or /residentials.json
  def index
    @residentials = Residential.all
  end

  # GET /residentials/1 or /residentials/1.json
  def show
  end

  # GET /residentials/new
  def new
    @residential = Residential.new
  end

  # GET /residentials/1/edit
  def edit
  end

  # POST /residentials or /residentials.json
  def create
    @residential = Residential.new(residential_params)

    respond_to do |format|
      if @residential.save
        format.html { redirect_to residential_url(@residential), notice: "Residential was successfully created." }
        format.json { render :show, status: :created, location: @residential }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @residential.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /residentials/1 or /residentials/1.json
  def update
    respond_to do |format|
      if @residential.update(residential_params)
        format.html { redirect_to residential_url(@residential), notice: "Residential was successfully updated." }
        format.json { render :show, status: :ok, location: @residential }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @residential.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /residentials/1 or /residentials/1.json
  def destroy
    @residential.destroy

    respond_to do |format|
      format.html { redirect_to residentials_url, notice: "Residential was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_residential
      @residential = Residential.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def residential_params
      params.require(:residential).permit(:thumb_pic, :title, :price_per_month, :address, :total_room, :livingroom, :has_mrt, :mrt_line)
    end
end

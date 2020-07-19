module CoinModule
  class << self

    def generate_random_code
      return Random.rand(10001..99999).to_s
    end

    def send_sms(phone_number, message)
      params = Hash.new

      params['X-CoinAPI-Key'] = '42D353D1-029C-49C1-9946-529FD880DE43'

      response = Net::HTTP.post_form(URI.parse("https://rest.coinapi.io/v1/exchanges"), params)

    end
  end
end

# frozen_string_literal: true

require "stripe"

module Nekomaneki
  module Payments
    # Latest Stripe API version from the Stripe plugin skill (stripe-best-practices).
    API_VERSION = "2026-08-26.dahlia"

    def self.client
      @client ||= Stripe::StripeClient.new(
        api_key,
        stripe_version: API_VERSION
      )
    end

    def self.api_key
      key = ENV["STRIPE_API_KEY"].to_s.strip
      raise "Set STRIPE_API_KEY to a restricted key (rk_...) from the Stripe Dashboard." if key.empty?
      key
    end
  end
end

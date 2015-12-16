require 'uri'

class MainController < ApplicationController
  def index
      if params[:url]
          if params[:url] =~ URI::regexp
              crawler = Crawler.new
              @keywords = crawler.obtain(params[:url],10)
              render :json => @keywords
          elsif params[:url] == ""
              render :json => {message: "<p>You must include a url!</p>"}
          else
              render :json => {message: "<p>That is not a valid url. Make sure to include 'http'!</p>"}
          end
      end
  end
  def search
  end
end

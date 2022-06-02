namespace :scraper do
  desc "scrape data from UrHouse"
  task ur_house: :environment do
    BASE_URI = 'https://www.urhouse.com.tw'
    PATH = '/tw/rentals/ajax'
    QUERY = '?page=%d&filter=JTdCJTIydHlwZSUyMiUzQSUyMnJlc2lkZW50aWFsJTIyJTJDJTIyY2l0eSUyMiUzQSUyMiUyMiUyQyUyMmRpc3QlMjIlM0ElNUIlNUQlMkMlMjJsYXlvdXQlMjIlM0ElMjIlMjIlMkMlMjJyZW50JTIyJTNBJTdCJTIybWluJTIyJTNBJTIyMzAwMDAlMjIlMkMlMjJtYXglMjIlM0ElMjIxMDAwMDAlMjIlN0QlMkMlMjJmbG9vcl9zaXplJTIyJTNBJTdCJTIybWluJTIyJTNBJTIyJTIyJTJDJTIybWF4JTIyJTNBJTIyJTIyJTdEJTJDJTIycGFya2luZyUyMiUzQSU3QiUyMnBsYW5lJTIyJTNBJTIyJTIyJTJDJTIybWVjaGFuaWNhbCUyMiUzQSUyMiUyMiU3RCUyQyUyMmhhc19wYXJraW5nJTIyJTNBJTIyJTIyJTJDJTIybWFwJTIyJTNBJTdCJTIyc291dGglMjIlM0EwJTJDJTIyd2VzdCUyMiUzQTAlMkMlMjJub3J0aCUyMiUzQTAlMkMlMjJlYXN0JTIyJTNBMCU3RCUyQyUyMnJlc2lkZW50aWFsJTIyJTNBJTdCJTIydG90YWxfcm9vbSUyMiUzQSU3QiUyMm1pbiUyMiUzQSUyMiUyMiUyQyUyMm1heCUyMiUzQSUyMiUyMiU3RCU3RCUyQyUyMm9mZmljZSUyMiUzQSU3QiU3RCUyQyUyMnN0b3JlZnJvbnQlMjIlM0ElN0IlN0QlN0Q%%3D&ordering=price&direction=ASC&mode=list'

    bar = nil
    page = 1
    total_pages = 1
    STDERR.puts 'Scraping data from UrHouse...'

    # TODO write an iterator for it
    while page <= total_pages do
      uri = URI(BASE_URI + PATH + QUERY % page)
      raw_json = Net::HTTP.get(uri)
      data = Oj.load(raw_json) # don't use symbolize_names option here 'caz there are some integer keys

      # TODO json validate

      if data.dig('code') == 200
        pagination = data.dig('data', 'pagination')
        total_pages = pagination.index('last').to_i if total_pages <= 1
        bar ||= ProgressBar.new(total_pages)

        items = data.dig('data', 'items')
        items.sort! do |a, b|
          a["rent"] <=> b["rent"]
        end
        items.sample(6).each do |item|
          r = Residential.where(origin_id: item["id"]).first_or_initialize
          r[:thumb_pic] = item["image_url"]
          r[:title] = item["title"]
          r[:price_per_month] = item["rent"]
          r[:address] = item["search_index"].match(/^\[([^\[\]]+)\]/m)[1] rescue next # TODO details / exceptions handler
          r[:total_room] = item["total_room"]
          r[:livingroom] = item["livingroom"]
          r[:has_mrt] = true unless item["mrt_line"].empty?
          r[:mrt_line] = item["mrt_line"]
          byebug unless r.save
        end if items
      else
        raise 'response data error' # TODO exception class
      end
      page += 1
      bar.increment!
    end
  end
end

require 'csv'
require 'json'

things = []
HEADERS = ["name", "street", "zip", "city", "size", "price"]
first = true
CSV.foreach('Liste rehearsal.csv', :col_sep => ';', :encoding => Encoding::ISO_8859_1) do |row|
  if first
    first = false
    next
  end
  fields = {}
  HEADERS.each_with_index { |name, i| fields[name] = row[i] }
  data = {}
  data['slug'] = fields['name'].gsub(/[^a-z0-9]/i, '-').downcase
  data['categories'] = ['rehearsal']
  data['name'] = fields['name']
  data['description'] = ''
  data['location_name'] = "#{fields['street']}, #{fields['zip']} #{fields['city']}"
  data['size_area'] = fields['size'][/[0-9]+/].to_i
  data['price'] = fields['price'][/[0-9]+/].to_i
  data['owner'] = { :name => ''}
  data['reviews'] = []
  data['support'] = 'managed'
  data['visibility'] = 'private'
  data['image'] = "/json/entry/images/#{data['slug']}.jpg"
  data['image_thumb'] = "/json/entry/images/#{data['slug']}_thumb.jpg" 
  data['image_owner'] = "/json/entry/images/#{data['slug']}_owner.jpg" 
  json = JSON.dump(data)
  File.open("json/entry/#{data['slug']}.json",'w+') { |f| f << json }
  things << JSON.dump(data)
end

puts "["
puts things.join(",\n")
puts "]"

__END__
{
  "slug" : "garden",
  "name" : "Beautiful quiet garden",
  "description" : "it's so pretty, with flowers and everything",
  "image" : "http://www.businessballs.com/images/garden_pics/japanese_garden5.jpg",
  "price" : "800",
  "location_name" : "Potsdam, Germany",
  "visibility" : "private",
  "size_area" : "40",
  "support" : "managed property",
  "owner" : {
    "name" : "Emma"
  },
  "reviews" : [
    {
      "text" : "omg! this garden is lush!",
      "date_ago" : "Yesterday"
    },
    {
      "text" : "I loved this garden a lot, perfect place to grow my vegetables",
      "date_ago" : "Monday"
    }
  ]
}

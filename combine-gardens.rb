puts '['
data = Dir.glob('json/gardens/*.json').map do |entry|
  File.read(entry)
end.join(",\n")

puts data

puts ']'

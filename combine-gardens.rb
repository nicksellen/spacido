puts '['
data = Dir.glob('json/garden/*.json').map do |entry|
  File.read(entry)
end.join(",\n")

puts data

puts ']'

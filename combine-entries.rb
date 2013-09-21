puts '['
data = Dir.glob('json/entry/*.json').map do |entry|
  File.read(entry)
end.join(",\n")

puts data

puts ']'

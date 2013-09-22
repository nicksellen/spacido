puts '['
data = Dir.glob('json/rehearsal-room/*.json').map do |entry|
  File.read(entry)
end.join(",\n")

puts data

puts ']'

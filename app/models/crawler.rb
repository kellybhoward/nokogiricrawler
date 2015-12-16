require 'open-uri'
require 'nokogiri'
OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE
class Crawler
    def obtain(url, num_keywords)
        doc = Nokogiri(open(url))
        text = doc.text
        text.gsub!(/(<script type="text\/javascript">).+(<\/script>)/, "")
        text.gsub!(/(<script src).+(<\/script>)/, "")
        text.gsub!(/(<style).+(<\/style>)/, "")
        text.gsub!(/(<head).+(<\/head>)/, "")
        text.gsub!(/(class).+?(>)/, "")
        text.gsub!(/(href).+?(>)/, "")
        text.gsub!(/(<).+?(>)/, "")
        text.gsub!("this", "")
        text.gsub!("function", "")
        text.gsub!("addEventListener", "")
        text.gsub!("window", "")
        text.gsub!("return", "")
        words = text.split(/[^a-zA-Z]/)
        words.delete_if{|e| e.empty? || e.length < 4}
        freqs = Hash.new(0)
        words.each {|word| freqs[word]+=1}
        word_stats = freqs.sort_by{|x,y|y}
        bestKeywords = []
        word_stats.reverse!
        i = 0
        while i < num_keywords
            bestKeywords << word_stats[i]
            i += 1
        end
        return bestKeywords
    end
end

module Book exposing (bookContent)

import Html exposing (Html, a, div, text)
import Html.Attributes exposing (class, href, rel, target)


type alias Book =
    { title : String
    , author : String
    , yearRead : Int
    , rating : Int
    , href : String
    }


books : List Book
books =
    [ Book "Hackers & Painters: Big Ideas from the Computer Age" "Paul Graham" 2019 8 "https://amzn.to/2Tv3wC9"
    , Book "Digital Minimalism: Choosing a Focused Life in a Noisy World" "Cal Newport" 2019 10 "https://amzn.to/2EseoLR"
    , Book "The Master Switch: The Rise and Fall of Information Empires" "Tim Wu" 2019 8 "https://amzn.to/2tLIzsg"
    , Book "Mastering Ethereum: Building Smart Contracts and DApps" "Andreas M. Antonopoulos" 2019 7 "https://amzn.to/2VyHr7f"
    , Book "Straw Dogs: Thoughts on Humans and Other Animals" "John Gray" 2019 9 "https://amzn.to/2FHzTKS"
    , Book "Stories of Your Life and Others" "Ted Chiang" 2019 10 "https://amzn.to/2FGwV9e"
    , Book "The Hard Thing About Hard Things" "Ben Horowitz" 2018 8 "https://amzn.to/2BMOJfl"
    , Book "Skin in the Game: Hidden Asymmetries in Daily Life" "Nassim Nicholas Taleb" 2018 9 "https://amzn.to/2BKou9m"
    , Book "When Breath Becomes Air" "Paul Kalanithi" 2018 7 "https://amzn.to/2AgIyQG"
    , Book "Why We Sleep: Unlocking the Power of Sleep and Dreams" "Matthew Walker" 2018 9 "https://amzn.to/2RdjdAR"
    , Book "A Wild Sheep Chase" "Haruki Murakami" 2018 10 "https://amzn.to/2rUcBcg"
    , Book "Pinball" "Haruki Murakami" 2018 7 "https://amzn.to/2Lzg9cZ"
    , Book "Hear the Wind Sing" "Haruki Murakami" 2018 8 "https://amzn.to/2Shuu0x"
    , Book "Meditations" "Marcus Aurelius" 2018 7 "https://amzn.to/2Sgm49t"
    , Book "How to Say No Without Feeling Guilty" "Patti Breitman/Connie Hatch" 2018 6 "https://amzn.to/2CxkStb"
    , Book "The Culture Code" "Daniel Coyle" 2018 7 "https://amzn.to/2SgdPdF"
    , Book "Antifragile" "Nassim Nicholas Taleb" 2018 10 "https://amzn.to/2V9ba7h"
    , Book "The Black Swan" "Nassim Nicholas Taleb" 2018 9 "https://amzn.to/2LzfXdL"
    , Book "Sapiens: A Brief History of Humankind" "Yuval Noah Harari" 2018 9 "https://amzn.to/2LxkvS7"
    , Book "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future" "Ashlee Vance" 2018 7 "https://amzn.to/2V5KYuj"
    ]


bookEl : Book -> Html msg
bookEl book =
    div [ class "book" ]
        [ div [ class "book-year" ] [ text (String.fromInt book.yearRead) ]
        , div [ class "book-meta" ]
            [ div [ class "book-title" ] [ a [ href book.href, target "blank", rel "noopener noreferrer" ] [ text book.title ] ]
            , div [ class "book-author" ] [ text book.author ]
            , div [ class "book-rating" ] [ text (String.fromInt book.rating ++ "/10") ]
            ]
        ]


bookContent : List (Html msg)
bookContent =
    text "A list of books I've recently read:" :: List.map bookEl books

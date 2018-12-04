module Book exposing (bookContent)

import Html exposing (Html, div, text)
import Html.Attributes exposing (class)


type alias Book =
    { title : String
    , author : String
    , yearRead : Int
    , rating : Int
    }


books : List Book
books =
    [ Book "Why We Sleep: Unlocking the Power of Sleep and Dreams" "Matthew Walker" 2018 9
    , Book "A Wild Sheep Chase" "Haruki Murakami" 2018 10
    , Book "Pinball" "Haruki Murakami" 2018 7
    , Book "Hear the Wind Sing" "Haruki Murakami" 2018 8
    , Book "Meditations" "Marcus Aurelius" 2018 7
    , Book "How to Say No Without Feeling Guilty" "Patti Breitman/Connie Hatch" 2018 6
    , Book "The Culture Code" "Daniel Coyle" 2018 7
    , Book "Antifragile" "Nassim Nicholas Taleb" 2018 10
    , Book "The Black Swan" "Nassim Nicholas Taleb" 2018 9
    , Book "Sapiens: A Brief History of Humankind" "Yuval Noah Harari" 2018 9
    , Book "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future" "Ashlee Vance" 2018 8
    ]


bookEl : Book -> Html msg
bookEl book =
    div [ class "book" ]
        [ div [ class "book-year" ] [ text (String.fromInt book.yearRead) ]
        , div [ class "book-meta" ]
            [ div [ class "book-title" ] [ text book.title ]
            , div [ class "book-author" ] [ text book.author ]
            , div [ class "book-rating" ] [ text (String.fromInt book.rating ++ "/10") ]
            ]
        ]


bookContent : List (Html msg)
bookContent =
    text "A list of books I've recently read:" :: List.map bookEl books

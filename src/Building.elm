module Building exposing (buildingContent)

import Html exposing (Html, a, br, text)
import Html.Attributes exposing (class, href)


buildingContent : List (Html msg)
buildingContent =
    [ text "Currently building "
    , a [ href "https://commerce.coinbase.com" ] [ text "Coinbase Commerce" ]
    , text ". Previously built "
    , a [ href "https://www.telmediq.com" ] [ text "Telmediq" ]
    , text "."
    ]

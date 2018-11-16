module Building exposing (buildingContent)

import Html exposing (Html, br, a, text)
import Html.Attributes exposing (href, class)

buildingContent : List(Html msg)
buildingContent = [ text "Currently building "
                  , a [href "https://commerce.coinbase.com"] [text "Coinbase Commerce"]
                  , text " and Primotif (coming soon). Previously built "
                  , a [href "https://www.telmediq.com"] [text "Telmediq"]
                  , text "."
                  ]

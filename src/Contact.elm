module Contact exposing (contactContent)

import Html exposing (Html, text, a)
import Html.Attributes exposing (href)

contactContent : List(Html msg)
contactContent = [ text "If you'd like to get in touch, feel free to "
                 , a [href "mailto:tysonbattistella@gmail.com"] [text "email me"]
                 , text ", "
                 , a [href "https://twitter.com/tbtstl"] [text "tweet me"]
                 , text ", "
                 , a [href "https://github.com/tysonbattistella"] [text "follow me on Github"]
                 , text ", or "
                 , a [href "https://keybase.io/tysonbattistella"] [text "add me on Keybase"]
                 , text "."
                 ]

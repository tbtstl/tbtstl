module Main exposing (..)

import Browser
import Html exposing (Html, node, text, div, ul, li, a)
import Html.Attributes exposing (src, class, classList, href)

import Router exposing (init, update, pageOf, Msg(..), Page(..), Model)
import Book exposing (bookContent)
import Building exposing (buildingContent)
import Contact exposing (contactContent)

---- SUBSCRIPTIONS ----

subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.none

---- VIEW ----



view : Model -> Browser.Document Msg
view model =
  { title = "tbtstl"
  , body =
      [ div []
          [ div [class "hero-text"] [text "Tyson Battistella (tbtstl) makes things." ]
          , div [class "container"] [ div [class "nav-list"]  [ nav ]
                                    , content model.page
                                    ]
          ]
      ]
  }

navLink : String -> String -> Html msg
navLink path name =
  li [] [a [ href path ] [ text name ] ]

nav : Html msg 
nav =
  ul [] [ navLink "/building" "building"
        , navLink "/reading" "reading"
        , navLink "/contact" "contact"
        ]

contentChild : List(Html msg) -> Html msg
contentChild c = div [class "content"] c

content : Page -> Html msg
content page =
  case page of
    Root -> div [classList [("hide", True), ("content", True)]] []
    NotFound -> contentChild [text "You're in the wrong place."]
    Reading -> contentChild bookContent
    Building -> contentChild buildingContent
    Contact -> contentChild contactContent


---- PROGRAM ----


main : Program () Model Msg
main =
    Browser.application
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }

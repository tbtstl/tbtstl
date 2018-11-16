module Router exposing (..)

import Browser
import Browser.Navigation as Nav
import Url

-- MODEL

type Page = Root
          | Reading
          | Building
          | Contact
          | NotFound

type alias Model =  
    { key : Nav.Key
    , url : Url.Url
    , page : Page
    }

init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( Model key url (pageOf url), Cmd.none )

-- UPDATE

pageOf : Url.Url -> Page
pageOf url =
  case url.path of
    "/" -> Root
    "/reading" -> Reading
    "/building" -> Building
    "/contact" -> Contact
    _ -> NotFound

type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
      LinkClicked urlRequest ->
        case urlRequest of
          Browser.Internal url ->
            ( model, Nav.pushUrl model.key (Url.toString url) )
          Browser.External href ->
            ( model, Nav.load href )
      UrlChanged url ->
        ( { model | url = url, page = pageOf url}
        , Cmd.none
        )

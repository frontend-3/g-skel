require([
  'jquery',
  'easyModal'
], ( $, EasyModal) ->

    defaults = {}
    st = {}
    dom = {}

    catchDom = () ->
        dom.document = $(document)
        return

    suscribeEvents = ->
        return

    fn = {

    }

    initalize = ()->
        opts = {}
        st = $.extend({}, defaults, opts)
        catchDom(st)
        suscribeEvents()
        return

    dom.document.ready(initialize)
    return
)

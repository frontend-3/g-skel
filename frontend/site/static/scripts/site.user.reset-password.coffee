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

    afterCatchDom = () ->
        return

    suscribeEvents = ->
        return

    fn = {

    }

    initalize = ()->
        opts = {}
        st = $.extend({}, defaults, opts)
        catchDom(st)
        afterCatchDom()
        suscribeEvents()
        return

    dom.document.ready(initialize)
    return
)

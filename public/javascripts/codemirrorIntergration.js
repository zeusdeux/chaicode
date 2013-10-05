(function($) {
    "use strict";

    /*Dont get it? Read http://perfectionkills.com/global-eval-what-are-the-options/*/
    var global = (function() {
        return this || (1 ? eval : 0)('this');
    })();
    if (typeof global.Chaicode === "undefined") global.Chaicode = {};
    var CodeMirror = global.CodeMirror;

    $(document).ready(function() {


        CodeMirror.commands.autocompletehtml = function(cm) {
            CodeMirror.showHint(cm, CodeMirror.hint.html);
        };
        CodeMirror.commands.autocompletejs = function(cm) {
            CodeMirror.showHint(cm, CodeMirror.hint.js);
        };
        CodeMirror.commands.autocompletecss = function(cm) {
            CodeMirror.showHint(cm, CodeMirror.hint.css);
        };


        var jsCodeMirror = CodeMirror.fromTextArea(document.getElementById("chaicode_js_content"), {
            lineNumbers: true,
            matchBrackets: true,
            continueComments: "Enter",
            extraKeys: {
                "Ctrl-Q": "toggleComment",
                "Ctrl-Space": "autocompletejs",
                "F11": function(cm) {
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                },
                "Esc": function(cm) {
                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                }
            },
            mode: "javascript",
            electricChars: true,
            showCursorWhenSelecting: true,
            autoCloseBrackets: true,
            highlightSelectionMatches: {
                showToken: /\w/
            },
            value: "",
            placeholder: "Javascript here...",
            gutters: ["CodeMirror-lint-markers"],
            lint: true,
            fullscreen: true

        });
        var cssCodeMirror = CodeMirror.fromTextArea(document.getElementById("chaicode_css_content"), {
            lineNumbers: true,
            matchBrackets: true,
            continueComments: "Enter",
            extraKeys: {
                "Ctrl-Q": "toggleComment",
                "Ctrl-Space": "autocompletecss",
                "F11": function(cm) {
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                },
                "Esc": function(cm) {
                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                }
            },
            mode: "css",
            electricChars: true,
            showCursorWhenSelecting: true,
            autoCloseBrackets: true,
            highlightSelectionMatches: {
                showToken: /\w/
            },
            value: "",
            placeholder: "CSS here...",
            gutters: ["CodeMirror-lint-markers"],
            lint: true,
            fullscreen: true

        });
        var htmlCodeMirror = CodeMirror.fromTextArea(document.getElementById("chaicode_html_content"), {
            lineNumbers: true,
            mode: "text/html",
            electricChars: true,
            showCursorWhenSelecting: true,
            extraKeys: {
                "Ctrl-Space": "autocompletehtml",
                "F11": function(cm) {
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                },
                "Esc": function(cm) {
                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                }
            },
            highlightSelectionMatches: {
                showToken: /\w/
            },
            value: "",
            placeholder: "HTML here...",
            fullscreen: true
        });

        /*Modify this to add line breaks also
        as it doesn't do that as of now*/

        function _reIndentAll(cm) {
            var last = cm.lineCount();
            cm.operation(function() {
                for (var i = 0; i < last; ++i) cm.indentLine(i);
            });
        }


        jsCodeMirror.on("keyup", function(cm) {
            $("#chaicode_js_content").text(cm.getValue()).keyup();
        });
        cssCodeMirror.on("keyup", function(cm) {
            $("#chaicode_css_content").text(cm.getValue()).keyup();

        });
        htmlCodeMirror.on("keyup", function(cm) {
            $("#chaicode_html_content").text(cm.getValue()).keyup();
        });


        //Tidy up button handler
        $("#tidy_up").click(function() {
            _reIndentAll(jsCodeMirror);
            _reIndentAll(cssCodeMirror);
            _reIndentAll(htmlCodeMirror);
        });


    });

})(jQuery);

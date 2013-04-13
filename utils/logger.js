var util = require('util');
var _ = require('underscore');
_.mixin(require('underscore.string'));

var NONE = 10, REQUEST = 6, ERROR = 5, WARNING = 4, INFO = 3, DEBUG = 2, PERF = 1;

var STR_TO_LEVEL = {
    "perf": PERF,
    "debug": DEBUG,
    "info": INFO,
    "warn": WARNING,
    "error": ERROR,
    "request": REQUEST,
    "none": NONE
};

var LEVEL_TO_STR = {
    1: "perf",
    2: "debug",
    3: "info",
    4: "warn",
    5: "error",
    6: "request",
    10: "none"
};

/**
* Logger
*
* @class Ext.sf.Logger
*
*/
Ext.define('Ext.sf.Logger', {
    requires: [
        'Ext.sf.loggers.Console',
        'Ext.sf.loggers.Syslog'
    ],

    statics: {
        defaults: {
            loggers: {
                'console': {/*stream: console*/}
            }
        },
        /**
         * This call will change the list of loggers for all instances that
         * didn't specify a list of loggers
         */
        setLoggerConfigs: function(loggers) {
            this.defaults.loggers = loggers || {'console': {}};
        }
    },

    /**
    * Constructor
    *
    * @param {Object} options
    *
    */
    constructor: function(options) {
        var self = this;
        options = options || {};
        self.name = options.name || "LOG";
        self.setLevel(options.level || "debug");
        self.setClientLevel(options.clientLevel || options.level || "debug");

        // default value of loggers is in statics.defaults.loggers
        //  but since it can be changed dynamically the fallback check is done later
        this.loggers = options.loggers;
        this._loggerInstanceCache = {};
    },

    getLogger: function(type) {
        var loggers = this.loggers || this.statics().defaults.loggers;
        if (!(type in this._loggerInstanceCache)) {
            this._loggerInstanceCache[type] = Ext.create('Ext.sf.loggers.' + _(type).capitalize(), this.name, loggers[type])
        }
        return this._loggerInstanceCache[type];
    },

    /**
    * Set Log level
    *
    * @param {String} level
    *
    */
    setLevel: function(level) {
        if(STR_TO_LEVEL[level]) {
            this.level = STR_TO_LEVEL[level];
        } else {
            this.level = NONE;
        }
    },

    /**
    * Get Log level
    *
    */
    getLevel: function() {
        return LEVEL_TO_STR[this.level];
    },

    /**
    * Set Client Log level
    *
    * @param {String} level
    *
    */
    setClientLevel: function(level) {
        if(STR_TO_LEVEL[level]) {
            this.clientLevel = STR_TO_LEVEL[level];
        } else {
            this.clientLevel = NONE;
        }
    },

    /**
    * Get Client Log level
    *
    */
    getClientLevel: function() {
        return LEVEL_TO_STR[this.clientLevel];
    },

    /**
     * Display message
     *
     * @param {Array} args
     *
     */
    out: function(args) {
        if (!args.slice) {
            args.slice = Array.prototype.slice;
        }

        var level = args[0];

        var loggers = this.loggers || this.statics().defaults.loggers;
        for (var name in loggers) {
            this.getLogger(name).out(level, args.slice(1));
        }
    },

    /**
     * Display log message
     *
     */
    log: function() {
        if(this.level <= DEBUG) {
            Array.prototype.unshift.call(arguments, "DEBUG");
            this.out(arguments);
        }
    },

    /**
     * Display perf message
     */
    perf: function() {
        if(this.level <= PERF) {
            Array.prototype.unshift.call(arguments, "PERF");
            this.out(arguments);
        }
    },

    /**
     * Display debug message
     */
    debug: function() {
        if(this.level <= DEBUG) {
            Array.prototype.unshift.call(arguments, "DEBUG");
            this.out(arguments);
        }
    },

    /**
     * Display info message
     */
    info: function() {
        if(this.level <= INFO) {
            Array.prototype.unshift.call(arguments, "INFO");
            this.out(arguments);
        }
    },

    /**
     * Display warn message
     */
    warn: function() {
        if(this.level <= WARNING) {
            Array.prototype.unshift.call(arguments, "WARN");
            this.out(arguments);
        }
    },

    /**
     * Display error message
     */
    error: function() {
        if(this.level <= ERROR) {
            Array.prototype.unshift.call(arguments, "ERROR");
            this.out(arguments);
        }
    },

    /**
     * Display request message
     */
    request: function() {
        if(this.level <= REQUEST) {
            Array.prototype.unshift.call(arguments, "REQUEST");
            this.out(arguments);
        }
    },

    /**
     * Display client perf message
     */
    clientPerf: function() {
        if(this.clientLevel <= PERF) {
            Array.prototype.unshift.call(arguments, "PERF");
            Array.prototype.unshift.call(arguments, "CLIENT");
            this.out(arguments);
        }
    },

    /**
     * Display client debug message
     */
    clientDebug: function() {
        if(this.clientLevel <= DEBUG) {
            Array.prototype.unshift.call(arguments, "DEBUG");
            Array.prototype.unshift.call(arguments, "CLIENT");
            this.out(arguments);
        }
    },

    /**
     * Display client info message
     */
    clientInfo: function() {
        if(this.clientLevel <= INFO) {
            Array.prototype.unshift.call(arguments, "INFO");
            Array.prototype.unshift.call(arguments, "CLIENT");
            this.out(arguments);
        }
    },

    /**
     * Display client warn message
     */
    clientWarn: function() {
        if(this.clientLevel <= WARNING) {
            Array.prototype.unshift.call(arguments, "WARN");
            Array.prototype.unshift.call(arguments, "CLIENT");
            this.out(arguments);
        }
    },

    /**
     * Display client error message
     */
    clientError: function() {
        if(this.clientLevel <= ERROR) {
            Array.prototype.unshift.call(arguments, "ERROR");
            Array.prototype.unshift.call(arguments, "CLIENT");
            this.out(arguments);
        }
    },

    /**
     * Display client request message
     */
    clientRequest: function() {
        if(this.clientLevel <= REQUEST) {
            Array.prototype.unshift.call(arguments, "REQUEST");
            Array.prototype.unshift.call(arguments, "CLIENT");
            this.out(arguments);
        }
    },

    /**
     * Display client log message
     *
     */
    clientLog: function() {
        if(this.clientLevel <= DEBUG) {
            Array.prototype.unshift.call(arguments, "DEBUG");
            Array.prototype.unshift.call(arguments, "CLIENT");
            this.out(arguments);
        }
    }
});

"use strict";

(() => {
    const pluginId = "jr.plugin.github_dark_pro";

    const settingsManager = acode.require("settings");

    const jr = {
		name: "github_dark_pro",
		dark: true,
		background: "#0d1117",
		foreground: "#ffffff",
		activeLine: "#161b22",
		selection: "#264f78",
		selectionMatch: "#3fb95040",
		cursor: "#58a6ff",
		dropdownBackground: "#161b22",
		dropdownBorder: "#30363d",
		matchingBracket: "#ffffff6d",
		lineNumber: "#484f58",
		lineNumberActive: "#c9d1d9",
		controlKeyword: "#ff7b72",
		keyword: "#ff7b72",
		variable: "#ffffff",
		punctuation: "#c9d1d9",
		property: "#79c0ff",
		special: "#d2a8ff",
		parameter: "#ffa657",
		function: "#d2a8ff",
		string: "#a5d6ff",
		constant: "#79c0ff",
		type: "#7bec42ff",
		class: "#7bec42ff",
		number: "#79c0ff",
		comment: "#8b949e",
		heading: "#1f6feb",
		regexp: "#a5d6ff",
		tag: "#7ee787",
		operator: "#ff7b72",
		angleBracket: "#8b949e",
		invalid: "#f85149",
	};

    class GithubDarkProPlugin {
        constructor() {
            this.pluginId = pluginId;
            this.themeId = jr.name;
            this.registered = false;
            this.editorThemes = null;
            this.onThemeChange = this.onThemeChange.bind(this);
        }

        buildExtensions() {
            const {
                cm: codeMirror,
                createTheme,
                createHighlightStyle,
            } = this.editorThemes;

            const tags = codeMirror.tags;
            const createRule = (tagList, styleOptions) => {
                const filteredTags = tagList.filter(Boolean);
                return filteredTags.length
                    ? {
                          tag: filteredTags,
                          ...styleOptions,
                      }
                    : null;
            };

            const highlightStyle = createHighlightStyle(
                [
                    createRule([tags.keyword], {
                        color: jr.keyword,
                    }),

                    createRule([tags.controlKeyword], {
                        color: jr.controlKeyword,
                    }),

                    createRule([tags.moduleKeyword], {
                        color: jr.keyword,
                    }),

                    createRule([tags.modifier], {
                        color: jr.keyword,
                    }),

                    createRule(
                        [tags.operator, tags.operatorKeyword, tags.url],
                        {
                            color: jr.operator,
                        },
                    ),

                    createRule([tags.punctuation], {
                        color: jr.punctuation,
                    }),

                    createRule([tags.separator], {
                        color: jr.foreground,
                    }),

                    createRule(
                        [
                            tags.typeName,
                            tags.className,
                            tags.definition(tags.className),
                            tags.namespace,
                            tags.annotation,
                        ],
                        {
                            color: jr.type,
                        },
                    ),

                    createRule([tags.tagName], {
                        color: jr.tag,
                    }),

                    createRule(
                        [
                            tags.function(tags.variableName),
                            tags.function(tags.definition(tags.variableName)),
                            tags.function(tags.propertyName),
                        ],
                        {
                            color: jr.function,
                        },
                    ),

                    createRule([tags.special(tags.variableName), tags.self], {
                        color: jr.special,
                        fontStyle: "italic",
                    }),

                    createRule([tags.propertyName, tags.attributeName], {
                        color: jr.property,
                    }),

                    createRule(
                        [
                            tags.variableName,
                            tags.local(tags.variableName),
                            tags.definition(tags.variableName),
                            tags.labelName,
                            tags.macroName,
                        ],
                        {
                            color: jr.variable,
                        },
                    ),

                    createRule([tags.parameter], {
                        color: jr.parameter,
                        fontStyle: "italic",
                    }),

                    createRule([tags.regexp, tags.special(tags.string)], {
                        color: jr.regexp,
                    }),

                    createRule([tags.escape], {
                        color: jr.special,
                    }),

                    createRule([tags.string, tags.character, tags.insert], {
                        color: jr.string,
                    }),
                    createRule([tags.number, tags.bool, tags.null], {
                        color: jr.number,
                    }),

                    createRule(
                        [
                            tags.constant(tags.variableName),
                            tags.constant(tags.propertyName),
                            tags.definition(tags.constant(tags.variableName)),
                        ],
                        {
                            color: jr.constant,
                        },
                    ),

                    createRule([tags.comment], {
                        color: jr.comment,
                        fontStyle: "italic",
                    }),

                    createRule([tags.meta, tags.processingInstruction], {
                        color: jr.comment,
                    }),

                    createRule([tags.heading], {
                        fontWeight: "bold",
                        color: jr.heading,
                    }),

                    createRule([tags.heading1], {
                        fontSize: "1.6em",
                        fontWeight: "bold",
                        color: jr.heading,
                    }),

                    createRule([tags.heading2], {
                        fontSize: "1.4em",
                        fontWeight: "bold",
                        color: jr.heading,
                    }),

                    createRule([tags.strong], {
                        fontWeight: "bold",
                    }),

                    createRule([tags.emphasis], {
                        fontStyle: "italic",
                    }),

                    createRule([tags.strikethrough], {
                        textDecoration: "line-through",
                    }),

                    createRule([tags.link], {
                        color: jr.comment,
                        textDecoration: "underline",
                    }),

                    createRule([tags.invalid], {
                        color: jr.invalid,
                    }),

                    createRule([tags.monospace], {
                        backgroundColor: "#2a241f",
                        borderRadius: "3px",
                        padding: "1px",
                    }),
                ].filter(Boolean),
            );

            return createTheme({
                dark: jr.dark,

                styles: {
                    "&": {
                        color: jr.foreground,
                        backgroundColor: jr.background,
                    },

                    ".cm-content": {
                        caretColor: jr.cursor,
                        fontVariantLigatures: "contextual",
                    },

                    ".cm-cursor, .cm-dropCursor": {
                        borderLeftColor: jr.cursor,
                        borderLeftWight: "0.5px",
                        annotation: "cm-blink 1s infinite steps(1)",
                    },
                    "@keyframes cm-blink": {
                    	"0%, 100%": { opacity: 1},
                    	"50%": { opacity: 0},
                    },
                    "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
                        {
                            backgroundColor: jr.selection,
                        },

                    ".cm-activeLine": {
                        backgroundColor: "transparent",
                        outline: `0.6px solid ${jr.dropdownBorder}`,
                        outlineOffset: "0.3px",
                    },

                    ".cm-selectionMatch": {
                        backgroundColor: jr.selectionMatch,
                    },

                    "&.cm-focused .cm-matchingBracket": {
                        backgroundColor: "transparent",
                        outline: `0.2px solid ${jr.matchingBracket}`,
                        borderRadius: "1.6px",
                        color: jr.foreground,
                    },
                    "&.cm-focused .cm-nonmatchingBracket": {
                    	backgroundColor: "transparent",
                    	outline: `0.2px solid ${jr
                    		.matchingBracket}`,
                    	borderRadius: "1.6px",
                    	color: jr.foreground,
                    },
                    ".cm-gutters": {
                        backgroundColor: jr.background,
                        color: jr.lineNumber,
                        border: "none",
                    },

                    ".cm-lineNumbers .cm-activeLineGutter": {
                        color: jr.lineNumberActive,
                    },

                    ".cm-tooltip": {
                        border: `1px solid ${jr.dropdownBorder}`,

                        backgroundColor: jr.dropdownBackground,

                        color: jr.foreground,
                    },

                    ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
                        background: jr.selectionMatch,

                        color: jr.foreground,
                    },
                },

                highlightStyle,
            });
        }

        init() {
            this.editorThemes = acode.require("editorThemes");

            this.registered = this.editorThemes.register({
                id: this.themeId,

                caption: "GitHub Dark Pro",

                dark: jr.dark,

                getExtension: () => this.buildExtensions(),

                config: jr,
            });

            this.applyTheme(settingsManager.get("editorTheme"));

            settingsManager.on("update:editorTheme", this.onThemeChange);
        }

        applyTheme(currentTheme) {
            if (currentTheme === this.themeId) {
                editorManager.editor.setTheme(this.themeId);
            }
        }
        onThemeChange(currentTheme) {
            this.applyTheme(currentTheme);
        }

        destroy() {
            if (!this.registered || !this.editorThemes) {
                return;
            }

            settingsManager.off("update:editorTheme", this.onThemeChange);

            this.editorThemes.unregister(this.themeId);

            this.registered = false;
        }
    }

    if (window.acode) {
        const pluginInstance = new GithubDarkProPlugin();

        acode.setPluginInit(
            pluginId,
            async (baseUrl, app, { cacheFileUrl, cacheFile }) => {
                if (!baseUrl.endsWith("/")) {
                    baseUrl += "/";
                }

                pluginInstance.baseUrl = baseUrl;

                await pluginInstance.init(app, cacheFile, cacheFileUrl);
            },
        );

        acode.setPluginUnmount(pluginId, () => {
            pluginInstance.destroy();
        });
    }
})();

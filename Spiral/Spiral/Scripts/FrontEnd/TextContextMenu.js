"use strict";
// A '.tsx' file enables JSX support in the TypeScript compiler, 
// for more information see the following page on the TypeScript wiki:
// https://github.com/Microsoft/TypeScript/wiki/JSX
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_contextmenu_1 = require("react-contextmenu");
function handleClick(e, data) {
    console.log(data);
}
function MyApp() {
    return (<div>

            <react_contextmenu_1.ContextMenuTrigger id="some_unique_identifier">
                <div className="well">Right click to see the menu</div>
            </react_contextmenu_1.ContextMenuTrigger>

            <react_contextmenu_1.ContextMenu id="some_unique_identifier">
                <react_contextmenu_1.MenuItem data={"some_data"} onClick={this.handleClick}>
                    ContextMenu Item 1
                </react_contextmenu_1.MenuItem>
                <react_contextmenu_1.MenuItem data={"some_data"} onClick={this.handleClick}>
                    ContextMenu Item 2
                </react_contextmenu_1.MenuItem>
                <react_contextmenu_1.MenuItem divider/>
                <react_contextmenu_1.MenuItem data={"some_data"} onClick={this.handleClick}>
                    ContextMenu Item 3
                </react_contextmenu_1.MenuItem>
            </react_contextmenu_1.ContextMenu>

        </div>);
}
react_dom_1.default.render(<MyApp myProp={12}/>, document.getElementById("main"));

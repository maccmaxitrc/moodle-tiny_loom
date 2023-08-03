// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Commands helper for the Tiny Loom plugin.
 *
 * @module      tiny_loom/commands
 * @copyright   2023 Max MacCluer
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import { setup, isSupported } from './index';
import { getPublicAppId } from "./options";
import { getButtonImage } from 'editor_tiny/utils';
import {
    component,
    buttonName,
    icon,
} from './common';
import { get_string as getString } from 'core/str';

/**
 * Handle the button click.
 * @param {TinyMCE.editor} editor The tinyMCE editor instance.
 */
const handleAction = (editor) => {
    const publicAppId = getPublicAppId(editor);
    if(!publicAppId) {
        console.warn("No Public App ID entered.")
        return;
    }
    // Setup the loom SDK.
    setup({ publicAppId: publicAppId }).then(setup => showLoomDialogue(editor, setup));
};

/**
 * Show the Loom Dialogue.
 * @param {TinyMCE.editor} editor The tinyMCE editor instance.
 * @param setup The Loom SDK setup object.
 */
const showLoomDialogue = (editor, setup) => {
    const dummyButton = document.createElement("button");
    const sdkButton = setup.configureButton({ element: dummyButton });
    sdkButton.on("insert-click", async video => editor.insertContent(video.embedUrl));
    dummyButton.click();
}

/**
 * Get the setup function for the buttons.
 *
 * This is performed in an async function which ultimately returns the registration function as the
 * Tiny.AddOnManager.Add() function does not support async functions.
 *
 * @returns {function} The registration function to call within the Plugin.add function.
 */
export const getSetup = async() => {
    const [
        buttonText,
        buttonImage,
    ] = await Promise.all([
        getString('buttontitle', component),
        getButtonImage('icon', component),
    ]);

    return (editor) => {

        // Register the Moodle SVG as an icon suitable for use as a TinyMCE toolbar button.
        editor.ui.registry.addIcon(icon, buttonImage.html);

        // Register the Tiny Loom Button.
        editor.ui.registry.addButton(buttonName, {
            icon,
            tooltip: "Record Screen",
            onAction: () => handleAction(editor),
        });

        // Add the Tiny Loom Menu Item.
        // This allows it to be added to a standard menu, or a context menu.
        editor.ui.registry.addMenuItem(buttonName, {
            icon,
            text: buttonText,
            onAction: () => handleAction(editor),
        });
    };
};

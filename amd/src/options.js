// This file is part of Moodle - http://moodle.org/
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
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Options helper for Tiny Loom plugin.
 *
 * @module      tiny_loom
 * @copyright   2023 Max MacCluer
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import { getPluginOptionName } from 'editor_tiny/options';
import { pluginName } from './common';

// Helper variable for retrieving the Public App ID.
const publicAppId = getPluginOptionName(pluginName, 'publicAppId');

/**
 * Options registration function.
 *
 * @param {tinyMCE} editor
 */
export const register = (editor) => {
  const registerOption = editor.options.register;

  // For each option, register it with the editor.
  // Valid type are defined in https://www.tiny.cloud/docs/tinymce/6/apis/tinymce.editoroptions/
  registerOption(publicAppId, {
    processor: 'string',
  });
};

/**
 * Get the Loom Public App ID for this editor instance.
 *
 * @param {TinyMCE.editor} editor
 * @returns {object}
 */
export const getPublicAppId = (editor) => editor.options.get(publicAppId);
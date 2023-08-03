<?php
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
 * Plugin administration page for the Tiny Loom plugin.
 *
 * @package     tiny_loom
 * @category    admin
 * @copyright   2023 Max MacCluer
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

if ($hassiteconfig) {
    $settings = new admin_settingpage('tiny_loom_settings', new lang_string('pluginname', 'tiny_loom'));

    // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedIf
    if ($ADMIN->fulltree) {
        // Public App ID.
        $name = get_string('publicappid', 'tiny_loom');
        $desc = get_string('publicappid_desc', 'tiny_loom');
        $setting = new admin_setting_configtext('tiny_loom/publicappid', $name, $desc, null);
        $settings->add($setting);
    }
}


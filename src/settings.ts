import { App, PluginSettingTab, Setting } from "obsidian";
import DailyNoteBarPlugin from "./main";

export interface DailyNoteNavbarSettings {
	dateFormat: string;
	tooltipDateFormat: string;
}

/**
 * The plugins default settings.
 */
export const DEFAULT_SETTINGS: DailyNoteNavbarSettings = {
	dateFormat: "ddd",
	tooltipDateFormat: "YYYY-MM-DD",
}

/**
 * This class is the plugins settings tab.
 */
export class DailyNoteNavbarSettingTab extends PluginSettingTab {
	plugin: DailyNoteBarPlugin;

	constructor(app: App, plugin: DailyNoteBarPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();

		// Date format
		new Setting(containerEl)
			.setName('Date format')
			.setDesc('Date format for the daily note bar.')
			.addText(text => text
				.setPlaceholder(DEFAULT_SETTINGS.dateFormat)
				.setValue(this.plugin.settings.dateFormat)
				.onChange(async (value) => {
					if (value.trim() === "") {
						value = DEFAULT_SETTINGS.dateFormat;
					}
					this.plugin.settings.dateFormat = value;
					await this.plugin.saveSettings();
				}));

		// Tooltip date format
		new Setting(containerEl)
			.setName('Tooltip date format')
			.setDesc('Date format for tooltips.')
			.addText(text => text
				.setPlaceholder(DEFAULT_SETTINGS.tooltipDateFormat)
				.setValue(this.plugin.settings.tooltipDateFormat)
				.onChange(async (value) => {
					if (value.trim() === "") {
						value = DEFAULT_SETTINGS.tooltipDateFormat;
					}
					this.plugin.settings.tooltipDateFormat = value;
					await this.plugin.saveSettings();
				}));
	}
}

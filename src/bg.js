/*
 The MIT License (MIT)
 Copyright (c) 2016 Konstantin Kitmanov <doctor.hogart@gmail.com>
 https://github.com/hogart/count-text-chrome-extension
 */

/* global calculateStats */
(() => {
    'use strict';

    const notificationId = 'textStatsNotification';

    function showStats(text) {
        //Clear old notification
        chrome.notifications.clear(notificationId, () => {});

        const stats = calculateStats(text);
        const itemsOptions = [
            {
                title: chrome.i18n.getMessage('charsWoSpaces'),
                message: stats.charactersAmountWithoutSpaces.toString(),
            },
            {
                title: chrome.i18n.getMessage('uniqueWordsTitle'),
                message: chrome.i18n.getMessage(
                    'uniqueWordsMsg',
                    [stats.uniqueWordAmount, stats.uniqueWordsPercentage]
                ),
            },
            {
                title: chrome.i18n.getMessage('avgWordLength'),
                message: stats.avgWordLength.toString(),
            },
            {
                title: chrome.i18n.getMessage('sentencesCount'),
                message: stats.sentenceAmount.toString(),
            },
            {
                title: chrome.i18n.getMessage('avgSentenceLength'),
                message: stats.avgSentenceLength.toString(),
            },
        ];
        const summary = chrome.i18n.getMessage('summary', [stats.wordAmount, stats.charactersAmount]);
        const notificationOptions = {
            title: summary,
            message: summary,
            type: 'list',
            iconUrl: '48.png',
            items: itemsOptions,
            // buttons: [],
            isClickable: true,
        };

        chrome.notifications.create(notificationId, notificationOptions, () => {});
    }

    function onContextMenuClick({selectionText}) {
        showStats(selectionText);
    }

    function createMenu() {
        chrome.contextMenus.create({
            title: 'Text stats',
            id: 'parent',
            contexts: ['selection'],
        });
    }

    chrome.contextMenus.onClicked.addListener(onContextMenuClick);
    chrome.runtime.onInstalled.addListener(createMenu);
})();
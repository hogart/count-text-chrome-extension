/* global calculateStats */
(() => {
    'use strict';

    let displayTarget;
    let observeTarget;

    const observer = new MutationObserver(() => {
        const stats = calculateStats(observeTarget.textContent);
        const summary = chrome.i18n.getMessage('summary', [stats.wordAmount, stats.charactersAmount]);

        displayTarget.dataset.ewStats = summary;
    });

    const observeSettings = {
        childList: true,
        subtree: true,
    };

    function getEditor() {
        const iframe = document.querySelector('iframe[name$="common-editor-iframe"]');
        if (iframe && iframe.contentWindow.document) {
            return iframe.contentWindow.document.querySelector('div[contenteditable]');
        } else {
            return null;
        }
    }

    function tryObserve() {
        observeTarget = getEditor();
        if (observeTarget) {
            displayTarget = document.querySelector('[tabindex="0"] > input + input').parentNode;
            observer.observe(observeTarget, observeSettings);
        } else {
            setTimeout(tryObserve, 150);
        }
    }

    tryObserve();
})();
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "highlight",
    title: "Frontdoor Smart Search",
    contexts: ["selection"],
    enabled: false,
    visible: false,
  });
});

const createTooltipDiv = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const boundingRect = range.getBoundingClientRect();

    const message = {
      type: "selectedText",
      text: selection.toString(),
      position: {
        top: boundingRect.top + window.pageYOffset,
        left: boundingRect.left + window.pageXOffset,
      },
    };
    let tooltipElement: HTMLElement;

    // Create a new tooltip element
    tooltipElement = document.createElement("div");
    tooltipElement.id = "tolltip_box_ext";
    tooltipElement.style.position = "absolute";
    tooltipElement.style.top =
      message.position.top - tooltipElement.offsetHeight + 25 + "px";
    tooltipElement.style.left = message.position.left + "px";
    tooltipElement.style.zIndex = "9999";

    // Add the tooltip element to the document
    if (!document.getElementById("tolltip_box_ext")) {
      document.body.prepend(tooltipElement);
    }
  }
};

chrome.contextMenus.onClicked.addListener(async (info) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabId = tabs[0].id || 0;
  await chrome.scripting.executeScript({
    target: { tabId },
    func: createTooltipDiv,
  });
  await chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id || 0 },
      files: ["js/contentScript.js"],
    },
    () => {
      const text = info.selectionText;
      chrome.tabs.sendMessage(tabs[0].id || (0 as number), {
        action: "highlight",
        text,
      });
    }
  );
});

export {};

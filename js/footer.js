const footer = document.getElementById("footer");
const adjustFooterPlacement = () => {
    if (window.innerHeight < document.body.clientHeight) {
        footer.style.position = "relative";
    } else {
        footer.style.postion = "absolute";
    }
};

export const loadFooterEvents = () => {
    adjustFooterPlacement();
    window.addEventListener("resize", adjustFooterPlacement);
    const observer = new MutationObserver(adjustFooterPlacement);
    observer.observe(document.body, { childList: true, subtree: true });
};

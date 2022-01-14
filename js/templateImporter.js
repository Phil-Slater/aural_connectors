class TemplateImporter {
    constructor(elementId, targetId = null) {
        this.elementId = elementId;
        this.targetId = targetId ? targetId : elementId;
        this.element = null;
    }

    async loadHTML() {
        const templateResponse = await fetch(
            `./layouts/${this.elementId}.html`
        );
        const stringifiedHTML = await templateResponse.text();
        const templateDocument = new DOMParser().parseFromString(
            stringifiedHTML,
            "text/html"
        );
        const temp = templateDocument.getElementById(this.elementId).content;
        this.element = document.importNode(temp, true);
    }

    importHeader() {
        console.log(this.element);
        console.log(typeof this.element);
        const targetElement = document.getElementById(this.targetId);
        targetElement.replaceChildren(...this.element.children);
        // targetElement.appendChild(this.element);
    }
}

export default TemplateImporter;

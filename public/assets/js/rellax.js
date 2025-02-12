(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory); // AMD module
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(); // CommonJS
    } else {
        global.Rellax = factory(); // Attach to global object
    }
})(this, function () {

    function Rellax(selector, options = {}) {
        // Default settings
        const defaultOptions = {
            speed: -2,
            verticalSpeed: null,
            horizontalSpeed: null,
            breakpoints: [576, 768, 1201],
            center: false,
            wrapper: null,
            relativeToWrapper: false,
            round: true,
            vertical: true,
            horizontal: false,
            verticalScrollAxis: "y",
            horizontalScrollAxis: "x",
            callback: function () {}
        };

        this.options = { ...defaultOptions, ...options };
        this.parallaxElements = document.querySelectorAll(selector);
        this.animationFrame = null;

        if (!this.parallaxElements.length) {
            console.warn("Rellax: No elements found for selector:", selector);
            return;
        }

        this.init();
    }

    // Initialize the parallax effect
    Rellax.prototype.init = function () {
        this.updateWindowSize();
        this.collectElementsData();
        this.addEventListeners();
        this.animate();
    };

    // Update window size on resize
    Rellax.prototype.updateWindowSize = function () {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
    };

    // Store data for each element
    Rellax.prototype.collectElementsData = function () {
        this.elementsData = [];

        this.parallaxElements.forEach((element) => {
            const speed = parseFloat(element.getAttribute("data-rellax-speed")) || this.options.speed;
            const rect = element.getBoundingClientRect();

            this.elementsData.push({
                element,
                speed,
                baseY: rect.top + window.pageYOffset,
                baseX: rect.left + window.pageXOffset
            });
        });
    };

    // Calculate new positions based on scroll
    Rellax.prototype.updateParallaxPosition = function () {
        const scrollY = window.pageYOffset;
        const scrollX = window.pageXOffset;

        this.elementsData.forEach((data) => {
            const translateY = (scrollY - data.baseY) * data.speed * 0.1;
            const translateX = (scrollX - data.baseX) * data.speed * 0.1;

            data.element.style.transform = `translate3d(${this.options.horizontal ? translateX : 0}px, 
                                                         ${this.options.vertical ? translateY : 0}px, 0)`;
        });
    };

    // Start the animation loop
    Rellax.prototype.animate = function () {
        this.updateParallaxPosition();
        this.animationFrame = requestAnimationFrame(() => this.animate());
    };

    // Add event listeners for scroll & resize
    Rellax.prototype.addEventListeners = function () {
        window.addEventListener("resize", () => this.updateWindowSize());
        window.addEventListener("scroll", () => this.updateParallaxPosition());
    };

    // Destroy Rellax instance (remove event listeners)
    Rellax.prototype.destroy = function () {
        cancelAnimationFrame(this.animationFrame);
        window.removeEventListener("resize", this.updateWindowSize);
        window.removeEventListener("scroll", this.updateParallaxPosition);
    };

    return Rellax;
});
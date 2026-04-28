/**
 * @name BringBackTenor
 * @displayName Bring Back Tenor
 * @version 1.0.0
 * @author TheRealShieri
 * @description Browse and send Tenor GIFs directly from Discord. Adds a Tenor search panel to the chat bar as an alternative to Discord's built-in GIF picker.
 * @source https://github.com/TheRealShieri/BringBackTenor
 * @website https://github.com/TheRealShieri/BringBackTenor
 * @updateUrl https://raw.githubusercontent.com/TheRealShieri/BringBackTenor/main/BringBackTenor.plugin.js
 */

const STYLES = /* css */ `
/* ═══════════════════════════════════════════ */
/* TENOR BUTTON                                */
/* ═══════════════════════════════════════════ */
.tenor-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    margin: 0 2px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--interactive-normal);
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
    position: relative;
}
.tenor-btn:hover {
    color: var(--interactive-hover);
    background: var(--background-modifier-hover);
}
.tenor-btn.tenor-btn--active {
    color: var(--brand-500, #5865f2);
}
.tenor-btn-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: -0.5px;
    user-select: none;
}
.tenor-btn-inner svg {
    width: 24px;
    height: 24px;
}
.tenor-btn-label {
    position: absolute;
    bottom: -2px;
    right: 0px;
    font-size: 8px;
    font-weight: 900;
    color: var(--brand-500, #5865f2);
    line-height: 1;
    letter-spacing: 0;
}

/* ═══════════════════════════════════════════ */
/* PANEL                                       */
/* ═══════════════════════════════════════════ */
.tenor-panel {
    position: fixed;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    background: var(--background-floating, #2b2d31);
    border-radius: 12px;
    box-shadow:
        0 8px 32px rgba(0,0,0,0.45),
        0 2px 8px rgba(0,0,0,0.25),
        0 0 0 1px rgba(255,255,255,0.04);
    overflow: hidden;
    animation: tenor-slideIn 0.2s cubic-bezier(0.2, 0.9, 0.5, 1.05);
    min-width: 300px;
    min-height: 300px;
    max-width: 90vw;
    max-height: 85vh;
}
@keyframes tenor-slideIn {
    from {
        opacity: 0;
        transform: translateY(12px) scale(0.97);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
/* Resize handles */
.tenor-resize-left,
.tenor-resize-top,
.tenor-resize-corner {
    position: absolute;
    z-index: 10001;
}
.tenor-resize-left {
    left: 0; top: 12px; bottom: 12px; width: 5px;
    cursor: ew-resize;
}
.tenor-resize-top {
    top: 0; left: 12px; right: 12px; height: 5px;
    cursor: ns-resize;
}
.tenor-resize-corner {
    top: 0; left: 0; width: 12px; height: 12px;
    cursor: nwse-resize;
}
.tenor-resize-left:hover,
.tenor-resize-top:hover,
.tenor-resize-corner:hover {
    background: rgba(88, 101, 242, 0.15);
}

/* ═══════════════════════════════════════════ */
/* HEADER                                      */
/* ═══════════════════════════════════════════ */
.tenor-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px 0 14px;
    flex-shrink: 0;
}
.tenor-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--header-primary, #f2f3f5);
    font-size: 15px;
    font-weight: 700;
    user-select: none;
}
.tenor-logo svg {
    color: var(--brand-500, #5865f2);
}
.tenor-close {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--interactive-normal);
    font-size: 18px;
    cursor: pointer;
    transition: all 0.15s ease;
    line-height: 1;
}
.tenor-close:hover {
    background: var(--background-modifier-hover);
    color: var(--interactive-hover);
}

/* ═══════════════════════════════════════════ */
/* SEARCH                                      */
/* ═══════════════════════════════════════════ */
.tenor-search-wrap {
    padding: 12px 14px 10px;
    flex-shrink: 0;
}
.tenor-search {
    width: 100%;
    padding: 9px 12px;
    border: none;
    border-radius: 8px;
    background: var(--background-tertiary, #1e1f22);
    color: var(--text-normal, #dbdee1);
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: box-shadow 0.2s ease;
    box-sizing: border-box;
}
.tenor-search::placeholder {
    color: var(--text-muted, #72767d);
}
.tenor-search:focus {
    box-shadow: 0 0 0 2px var(--brand-500, #5865f2);
}

/* ═══════════════════════════════════════════ */
/* CONTENT                                     */
/* ═══════════════════════════════════════════ */
.tenor-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 10px;
    scrollbar-width: thin;
    scrollbar-color: var(--scrollbar-thin-thumb, #1a1b1e) transparent;
}
.tenor-content::-webkit-scrollbar {
    width: 6px;
}
.tenor-content::-webkit-scrollbar-track {
    background: transparent;
}
.tenor-content::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thin-thumb, #1a1b1e);
    border-radius: 3px;
}

/* ═══════════════════════════════════════════ */
/* GRID                                        */
/* ═══════════════════════════════════════════ */
.tenor-grid {
    column-count: var(--tenor-columns, 2);
    column-gap: 6px;
    padding: 0 4px 10px;
}
.tenor-item {
    break-inside: avoid;
    margin-bottom: 6px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    background: var(--background-secondary-alt, #232428);
    transition: transform 0.12s ease, box-shadow 0.15s ease;
}
.tenor-item:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0,0,0,0.35);
}
.tenor-item::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%);
    opacity: 0;
    transition: opacity 0.15s ease;
    pointer-events: none;
    border-radius: 8px;
}
.tenor-item:hover::after {
    opacity: 1;
}
.tenor-item-send {
    position: absolute;
    bottom: 6px;
    right: 6px;
    background: var(--brand-500, #5865f2);
    color: #fff;
    font-size: 10px;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 4px;
    opacity: 0;
    transform: translateY(4px);
    transition: all 0.15s ease;
    pointer-events: none;
    z-index: 2;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.tenor-item:hover .tenor-item-send {
    opacity: 1;
    transform: translateY(0);
}
.tenor-item img,
.tenor-item video {
    width: 100%;
    display: block;
    object-fit: cover;
    min-height: 80px;
    max-height: 250px;
}

/* ═══════════════════════════════════════════ */
/* STATES                                      */
/* ═══════════════════════════════════════════ */
.tenor-loading,
.tenor-empty,
.tenor-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 20px;
    text-align: center;
    color: var(--text-muted, #72767d);
    gap: 10px;
}
.tenor-spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--background-modifier-accent, #4e5058);
    border-top-color: var(--brand-500, #5865f2);
    border-radius: 50%;
    animation: tenor-spin 0.7s linear infinite;
}
@keyframes tenor-spin {
    to { transform: rotate(360deg); }
}
.tenor-loading span,
.tenor-empty span {
    font-size: 14px;
    font-weight: 500;
}
.tenor-empty-sub {
    font-size: 12px;
    opacity: 0.7;
}
.tenor-error span {
    font-size: 14px;
}
.tenor-error-detail {
    font-size: 11px;
    opacity: 0.6;
    max-width: 300px;
    word-break: break-word;
}
.tenor-retry {
    margin-top: 6px;
    padding: 6px 16px;
    border: none;
    border-radius: 6px;
    background: var(--brand-500, #5865f2);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s;
}
.tenor-retry:hover {
    background: var(--brand-560, #4752c4);
}

/* ═══════════════════════════════════════════ */
/* FOOTER                                      */
/* ═══════════════════════════════════════════ */
.tenor-footer {
    padding: 8px 14px;
    text-align: center;
    font-size: 11px;
    color: var(--text-muted, #72767d);
    flex-shrink: 0;
    border-top: 1px solid var(--background-modifier-accent, rgba(79,84,92,0.48));
    user-select: none;
}

/* ═══════════════════════════════════════════ */
/* SKELETONS                                   */
/* ═══════════════════════════════════════════ */
.tenor-skeleton {
    column-count: 2;
    column-gap: 6px;
    padding: 0 4px 10px;
}
.tenor-skeleton-item {
    break-inside: avoid;
    margin-bottom: 6px;
    border-radius: 8px;
    background: var(--background-secondary-alt, #232428);
    animation: tenor-shimmer 1.5s ease infinite;
}
@keyframes tenor-shimmer {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.7; }
}
`;

module.exports = class BringBackTenor {
    constructor(meta) {
        this.meta = meta;
        this.observer = null;
        this.panelEl = null;
        this.isOpen = false;
        this.searchDebounce = null;

        this.outsideClickBound = this.handleOutsideClick.bind(this);
        this.lastQuery = "";
        this._resizing = false;

        // Load saved panel size or use defaults
        const saved = BdApi.Data.load("BringBackTenor", "panelSize");
        this.panelWidth = saved?.width || 460;
        this.panelHeight = saved?.height || 520;

        // Node.js modules for CORS-free HTTP requests
        // BetterDiscord runs in Electron with Node.js access
        try {
            this.https = require("https");
            this.http = require("http");
        } catch {
            try {
                const _require = window.require || eval("require");
                this.https = _require("https");
                this.http = _require("http");
            } catch (e) {
                console.warn("[BringBackTenor] Node.js modules unavailable, will try BdApi.Net", e);
                this.https = null;
                this.http = null;
            }
        }
    }

    // ═══════════════════════════════════════
    // LIFECYCLE
    // ═══════════════════════════════════════

    start() {
        BdApi.DOM.addStyle(this.meta.name, STYLES);
        this.setupObserver();
        this.tryInjectButton();
        BdApi.UI.showToast("Bring Back Tenor loaded!", { type: "success" });
    }

    stop() {
        BdApi.DOM.removeStyle(this.meta.name);
        this.destroyObserver();
        this.removeAllButtons();
        this.closePanel();
        clearTimeout(this.searchDebounce);
    }

    // ═══════════════════════════════════════
    // OBSERVER & BUTTON INJECTION
    // ═══════════════════════════════════════

    setupObserver() {
        this.observer = new MutationObserver(() => this.tryInjectButton());
        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    destroyObserver() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }

    tryInjectButton() {
        if (document.querySelector(".tenor-btn")) return;

        const selectors = [
            'div[class*="channelTextArea"] div[class*="buttons_"]',
            'div[class*="channelTextArea"] div[class*="buttons-"]',
            'form div[class*="buttons"]',
        ];

        let container = null;
        for (const sel of selectors) {
            container = document.querySelector(sel);
            if (container) break;
        }
        if (!container) return;

        const btn = document.createElement("button");
        btn.className = "tenor-btn";
        btn.setAttribute("aria-label", "Open Tenor GIF Search");
        btn.setAttribute("type", "button");
        btn.innerHTML = `
            <div class="tenor-btn-inner">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
                    <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" opacity="0.15"/>
                    <text x="12" y="16.5" text-anchor="middle" font-size="12" font-weight="900"
                          fill="currentColor" font-family="sans-serif">GIF</text>
                </svg>
            </div>
            <span class="tenor-btn-label">T</span>
        `;
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.togglePanel();
        });

        container.insertBefore(btn, container.firstChild);
    }

    removeAllButtons() {
        document.querySelectorAll(".tenor-btn").forEach((el) => el.remove());
    }

    // ═══════════════════════════════════════
    // PANEL MANAGEMENT
    // ═══════════════════════════════════════

    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    openPanel() {
        if (this.panelEl) return;

        const btn = document.querySelector(".tenor-btn");
        if (btn) btn.classList.add("tenor-btn--active");

        const panel = document.createElement("div");
        panel.className = "tenor-panel";
        panel.addEventListener("click", (e) => e.stopPropagation());

        // Apply saved size
        panel.style.width = `${this.panelWidth}px`;
        panel.style.height = `${this.panelHeight}px`;

        panel.innerHTML = `
            <div class="tenor-resize-left"></div>
            <div class="tenor-resize-top"></div>
            <div class="tenor-resize-corner"></div>
            <div class="tenor-header">
                <div class="tenor-logo">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                        <rect x="1" y="1" width="22" height="22" rx="5" stroke="currentColor" stroke-width="2" fill="none"/>
                        <text x="12" y="16" text-anchor="middle" font-size="10" font-weight="900"
                              fill="currentColor" font-family="sans-serif">GIF</text>
                    </svg>
                    <span>Tenor Search</span>
                </div>
                <button class="tenor-close" aria-label="Close">&times;</button>
            </div>
            <div class="tenor-search-wrap">
                <input type="text" class="tenor-search" placeholder="Search Tenor for GIFs..." />
            </div>
            <div class="tenor-content" id="tenor-content">
                <!-- Dynamic content area -->
            </div>
            <div class="tenor-footer">Powered by Tenor &middot; Click a GIF to send</div>
        `;

        const searchInput = panel.querySelector(".tenor-search");
        searchInput.addEventListener("input", (e) => {
            clearTimeout(this.searchDebounce);
            this.searchDebounce = setTimeout(() => {
                this.lastQuery = e.target.value.trim();
                this.doSearch(this.lastQuery);
            }, 450);
        });

        searchInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                clearTimeout(this.searchDebounce);
                this.lastQuery = e.target.value.trim();
                this.doSearch(this.lastQuery);
            }
        });

        panel.querySelector(".tenor-close").addEventListener("click", () => this.closePanel());

        // Attach resize handles
        this.attachResize(panel.querySelector(".tenor-resize-left"), "left");
        this.attachResize(panel.querySelector(".tenor-resize-top"), "top");
        this.attachResize(panel.querySelector(".tenor-resize-corner"), "corner");

        document.body.appendChild(panel);
        this.panelEl = panel;
        this.isOpen = true;

        this.positionPanel();
        this.updateColumnCount();
        searchInput.focus();

        // Close on outside click (delayed to prevent immediate close)
        setTimeout(() => {
            document.addEventListener("click", this.outsideClickBound);
            document.addEventListener("keydown", this._escHandler = (e) => {
                if (e.key === "Escape") this.closePanel();
            });
        }, 50);

        // Load initial content
        this.doSearch("");
    }

    positionPanel() {
        const btn = document.querySelector(".tenor-btn");
        if (!btn || !this.panelEl) return;

        const rect = btn.getBoundingClientRect();

        let bottom = window.innerHeight - rect.top + 8;
        let right = window.innerWidth - rect.right;

        if (window.innerWidth - right < this.panelWidth) {
            right = Math.max(8, window.innerWidth - this.panelWidth - 8);
        }
        if (bottom + this.panelHeight > window.innerHeight) {
            bottom = 8;
        }

        this.panelEl.style.bottom = `${bottom}px`;
        this.panelEl.style.right = `${right}px`;
    }

    // ═══════════════════════════════════════
    // PANEL RESIZE
    // ═══════════════════════════════════════

    attachResize(handle, direction) {
        if (!handle) return;

        handle.addEventListener("mousedown", (e) => {
            e.preventDefault();
            e.stopPropagation();
            this._resizing = true;

            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = this.panelWidth;
            const startHeight = this.panelHeight;

            const onMouseMove = (e) => {
                const dx = startX - e.clientX; // inverted: dragging left = wider
                const dy = startY - e.clientY; // inverted: dragging up = taller

                if (direction === "left" || direction === "corner") {
                    this.panelWidth = Math.max(300, Math.min(startWidth + dx, window.innerWidth * 0.9));
                    this.panelEl.style.width = `${this.panelWidth}px`;
                }
                if (direction === "top" || direction === "corner") {
                    this.panelHeight = Math.max(300, Math.min(startHeight + dy, window.innerHeight * 0.85));
                    this.panelEl.style.height = `${this.panelHeight}px`;
                }

                this.updateColumnCount();
            };

            const onMouseUp = () => {
                this._resizing = false;
                document.removeEventListener("mousemove", onMouseMove);
                document.removeEventListener("mouseup", onMouseUp);

                // Save size for next time
                BdApi.Data.save("BringBackTenor", "panelSize", {
                    width: this.panelWidth,
                    height: this.panelHeight,
                });
            };

            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        });
    }

    updateColumnCount() {
        if (!this.panelEl) return;
        // ~200px per column, minimum 2
        const cols = Math.max(2, Math.floor(this.panelWidth / 200));
        this.panelEl.style.setProperty("--tenor-columns", cols);
    }

    closePanel() {
        if (this.panelEl) {
            this.panelEl.remove();
            this.panelEl = null;
        }
        this.isOpen = false;
        const btn = document.querySelector(".tenor-btn");
        if (btn) btn.classList.remove("tenor-btn--active");
        document.removeEventListener("click", this.outsideClickBound);
        if (this._escHandler) {
            document.removeEventListener("keydown", this._escHandler);
            this._escHandler = null;
        }
    }

    handleOutsideClick(e) {
        if (this.panelEl && !this.panelEl.contains(e.target) && !e.target.closest(".tenor-btn")) {
            this.closePanel();
        }
    }

    // ═══════════════════════════════════════
    // MODE: SEARCH (Scraped GIFs)
    // ═══════════════════════════════════════

    async doSearch(query) {
        const content = this.panelEl?.querySelector("#tenor-content");
        if (!content) return;

        content.innerHTML = this.buildSkeleton();

        try {
            const gifs = await this.fetchGifs(query);
            if (!this.panelEl) return;
            this.renderGifGrid(gifs, content);
        } catch (err) {
            if (!this.panelEl) return;
            console.error("[BringBackTenor]", err);
            content.innerHTML = `
                <div class="tenor-error">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                        <text x="12" y="16" text-anchor="middle" font-size="14" font-weight="bold"
                              fill="currentColor">!</text>
                    </svg>
                    <span>Could not load GIFs</span>
                    <span class="tenor-error-detail">${this.escapeHTML(err.message)}</span>
                    <button class="tenor-retry" id="tenor-retry-btn">Try Again</button>
                </div>
            `;
            content.querySelector("#tenor-retry-btn")?.addEventListener("click", () => this.doSearch(query));
        }
    }

    async fetchGifs(query) {
        const slug = query
            ? encodeURIComponent(query.replace(/\s+/g, "-"))
            : "";
        const url = query
            ? `https://tenor.com/search/${slug}-gifs`
            : `https://tenor.com/`;

        const html = await this.nodeFetch(url);
        return this.parseGifs(html);
    }

    /**
     * CORS-free HTTP fetch using Node.js https module.
     * Falls back to BdApi.Net.fetch, then browser fetch.
     */
    async nodeFetch(url) {
        // Method 1: Node.js https module (bypasses CORS completely)
        if (this.https) {
            return new Promise((resolve, reject) => {
                const req = this.https.get(url, {
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                        "Accept-Language": "en-US,en;q=0.9",
                    },
                }, (res) => {
                    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        this.nodeFetch(res.headers.location).then(resolve).catch(reject);
                        return;
                    }

                    if (res.statusCode !== 200) {
                        reject(new Error(`Tenor returned HTTP ${res.statusCode}`));
                        return;
                    }

                    let data = "";
                    res.setEncoding("utf8");
                    res.on("data", (chunk) => data += chunk);
                    res.on("end", () => resolve(data));
                    res.on("error", reject);
                });
                req.on("error", reject);
                req.setTimeout(10000, () => {
                    req.destroy();
                    reject(new Error("Request timed out"));
                });
            });
        }

        // Method 2: BdApi.Net.fetch (BD's built-in CORS-free fetch)
        try {
            const api = new BdApi(this.meta.name);
            if (api.Net?.fetch) {
                const response = await api.Net.fetch(url);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.text();
            }
        } catch (e) {
            console.warn("[BringBackTenor] BdApi.Net.fetch failed:", e);
        }

        // Method 3: Standard fetch (will fail if CORS blocks it)
        const response = await fetch(url, {
            headers: {
                Accept: "text/html,application/xhtml+xml",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.text();
    }

    // ═══════════════════════════════════════
    // GIF PARSING
    // ═══════════════════════════════════════

    parseGifs(html) {
        // ─── Strategy 1: Parse __NEXT_DATA__ (Next.js SSR data) ───
        const nextDataMatch = html.match(
            /<script\s+id="__NEXT_DATA__"\s+type="application\/json"[^>]*>([\s\S]*?)<\/script>/
        );
        if (nextDataMatch) {
            try {
                const data = JSON.parse(nextDataMatch[1]);
                const extracted = this.extractFromNextData(data);
                if (extracted.length > 0) return extracted;
            } catch (e) {
                console.warn("[BringBackTenor] __NEXT_DATA__ parse error:", e);
            }
        }

        // ─── Strategy 2: Collect share URLs from the HTML ───
        const shareUrls = new Map();
        const shareRe = /https:\/\/tenor\.com\/view\/([\w-]+)/g;
        let m;
        while ((m = shareRe.exec(html)) !== null) {
            if (!shareUrls.has(m[1])) shareUrls.set(m[1], m[0]);
        }

        // ─── Strategy 3: Collect media URLs, grouped by base hash ───
        // Tenor media URLs: https://media.tenor.com/{baseHash}{formatCode}/{filename}.{ext}
        // Format codes: AAAAM=mediumgif, AAAAd=HD, AAAAC=nanogif, AAAP1=mp4
        // We extract baseHash to group all quality variants of the same GIF.
        const gifsByHash = new Map();
        const mediaRe = /https:\/\/media1?\.tenor\.com\/(?:m\/)?([A-Za-z0-9_-]+?)(AAA[A-Za-z0-9]{1,3})\/([\w-]+)\.(gif|mp4|webm|webp)/g;
        while ((m = mediaRe.exec(html)) !== null) {
            const [fullUrl, baseHash, formatCode, filename, ext] = m;
            if (fullUrl.includes("nano") || fullUrl.includes("search-icon")) continue;
            if (!gifsByHash.has(baseHash)) {
                gifsByHash.set(baseHash, { filename, formats: {} });
            }
            gifsByHash.get(baseHash).formats[formatCode] = { url: fullUrl, ext };
        }

        // ─── Build results: one entry per unique GIF ───
        const gifs = [];
        for (const [baseHash, data] of gifsByHash) {
            const formats = data.formats;
            const filename = data.filename;

            // Pick best preview for the grid
            const previewFormat =
                formats["AAAAM"] ||
                formats["AAAAC"] ||
                Object.values(formats).find(f => f.ext === "gif") ||
                Object.values(formats)[0];

            // Match to a share URL by filename
            let sendUrl = null;
            for (const [slug, url] of shareUrls) {
                if (slug.includes(filename)) {
                    sendUrl = url;
                    break;
                }
            }

            gifs.push({
                preview: previewFormat.url,
                url: sendUrl || previewFormat.url,
                description: filename.replace(/-/g, " "),
            });
        }

        if (gifs.length > 0) return gifs;

        // ─── Strategy 4: Share URLs only (last resort) ───
        for (const [slug, url] of shareUrls) {
            gifs.push({
                preview: url,
                url: url,
                description: slug.replace(/-\d+$/, "").replace(/-/g, " "),
                isShareUrl: true,
            });
        }

        return gifs;
    }

    extractFromNextData(data) {
        const gifs = [];
        const seenIds = new Set();
        try {
            const pageProps = data?.props?.pageProps;
            if (!pageProps) return gifs;

            const collections = [
                pageProps?.results,
                pageProps?.gifs,
                pageProps?.initialResults,
                pageProps?.featuredGifs,
                pageProps?.trendingGifs,
            ].filter(Boolean);

            for (const collection of collections) {
                if (!Array.isArray(collection)) continue;
                for (const item of collection) {
                    const id = item?.id || item?.itemid;
                    if (id && seenIds.has(id)) continue;
                    if (id) seenIds.add(id);

                    const gif = this.extractSingleGif(item);
                    if (gif) gifs.push(gif);
                }
            }

            if (pageProps?.tags) {
                for (const tag of Object.values(pageProps.tags)) {
                    if (tag?.results) {
                        for (const item of tag.results) {
                            const id = item?.id || item?.itemid;
                            if (id && seenIds.has(id)) continue;
                            if (id) seenIds.add(id);

                            const gif = this.extractSingleGif(item);
                            if (gif) gifs.push(gif);
                        }
                    }
                }
            }
        } catch (e) {
            console.warn("[BringBackTenor] Next data extraction failed:", e);
        }
        return gifs;
    }

    extractSingleGif(item) {
        if (!item) return null;

        // Build the share URL (tenor.com/view/...) — Discord auto-embeds these
        const shareUrl = item.itemurl || item.url;
        const id = item.id || item.itemid;
        const sendUrl = (shareUrl && shareUrl.includes("tenor.com/view/"))
            ? shareUrl
            : id
                ? `https://tenor.com/view/${id}`
                : null;

        // Try v2 API format: pick tinygif for fast preview
        if (item.media_formats) {
            const hdGif = item.media_formats.gif;
            const preview = item.media_formats.tinygif || item.media_formats.mediumgif || hdGif;
            const previewUrl = preview?.url || hdGif?.url;

            if (previewUrl && sendUrl) {
                return {
                    preview: previewUrl,
                    url: sendUrl,
                    description: item.content_description || item.title || "",
                    width: preview?.dims?.[0],
                    height: preview?.dims?.[1],
                };
            }
        }

        // Try v1 API format
        if (item.media && Array.isArray(item.media)) {
            const mediaObj = item.media[0];
            const hdGif = mediaObj?.gif;
            const preview = mediaObj?.tinygif || mediaObj?.mediumgif || hdGif;
            const previewUrl = preview?.url || hdGif?.url;

            if (previewUrl && sendUrl) {
                return {
                    preview: previewUrl,
                    url: sendUrl,
                    description: item.content_description || item.title || "",
                    width: preview?.dims?.[0],
                    height: preview?.dims?.[1],
                };
            }
        }

        // Fallback: if we at least have a share URL
        if (sendUrl) {
            return {
                preview: sendUrl,
                url: sendUrl,
                description: item.description || item.title || "",
            };
        }

        return null;
    }

    // ═══════════════════════════════════════
    // RENDERING
    // ═══════════════════════════════════════

    renderGifGrid(gifs, container) {
        if (!gifs || gifs.length === 0) {
            container.innerHTML = `
                <div class="tenor-empty">
                    <svg width="44" height="44" viewBox="0 0 24 24">
                        <path fill="currentColor" opacity="0.3"
                              d="M11.5 3a8.5 8.5 0 015.7 14.78l4.76 4.76-1.42 1.42-4.76-4.76A8.5 8.5 0 1111.5 3zm0 2a6.5 6.5 0 100 13 6.5 6.5 0 000-13z"/>
                    </svg>
                    <span>No GIFs found</span>
                    <span class="tenor-empty-sub">Try a different search term</span>
                </div>
            `;
            return;
        }

        const grid = document.createElement("div");
        grid.className = "tenor-grid";

        for (const gif of gifs) {
            if (gif.isShareUrl) continue;

            const item = document.createElement("div");
            item.className = "tenor-item";
            if (gif.description) {
                item.setAttribute("title", gif.description);
            }

            const isVideo = gif.preview?.endsWith(".mp4") || gif.preview?.endsWith(".webm");

            if (isVideo) {
                const video = document.createElement("video");
                video.src = gif.preview;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.loading = "lazy";
                item.appendChild(video);
            } else {
                const img = document.createElement("img");
                img.src = gif.preview;
                img.alt = gif.description || "GIF";
                img.loading = "lazy";
                img.addEventListener("error", () => {
                    item.style.display = "none";
                });
                item.appendChild(img);
            }

            const sendLabel = document.createElement("span");
            sendLabel.className = "tenor-item-send";
            sendLabel.textContent = "Send";
            item.appendChild(sendLabel);

            item.addEventListener("click", () => {
                this.sendGif(gif.url);
            });

            grid.appendChild(item);
        }

        container.innerHTML = "";
        container.appendChild(grid);

        if (grid.children.length === 0) {
            container.innerHTML = `
                <div class="tenor-empty">
                    <span>No GIFs could be displayed</span>
                    <span class="tenor-empty-sub">Try a different search</span>
                </div>
            `;
        }
    }

    buildSkeleton() {
        const heights = [130, 100, 160, 120, 90, 150, 110, 140];
        let items = "";
        for (let i = 0; i < 8; i++) {
            items += `<div class="tenor-skeleton-item" style="height:${heights[i]}px"></div>`;
        }
        return `<div class="tenor-skeleton">${items}</div>`;
    }

    // ═══════════════════════════════════════
    // SEND GIF TO CHAT
    // ═══════════════════════════════════════

    async sendGif(url) {
        this.closePanel();

        let previousClipboard = "";
        try {
            previousClipboard = await navigator.clipboard.readText();
        } catch { /* ignore */ }

        try {
            const textbox = document.querySelector('[role="textbox"]');
            if (!textbox) throw new Error("Chat textbox not found");
            textbox.focus();

            let electronClipboard = null;
            try {
                electronClipboard = require("electron").clipboard;
            } catch {
                try {
                    electronClipboard = (window.require || eval("require"))("electron").clipboard;
                } catch { /* ignore */ }
            }

            if (electronClipboard) {
                electronClipboard.writeText(url);
            } else {
                await navigator.clipboard.writeText(url);
            }

            const pasted = document.execCommand("paste");

            if (!pasted) {
                const clipboardData = new DataTransfer();
                clipboardData.setData("text/plain", url);
                const pasteEvent = new ClipboardEvent("paste", {
                    bubbles: true,
                    cancelable: true,
                    clipboardData: clipboardData,
                });
                textbox.dispatchEvent(pasteEvent);
            }

            await new Promise((r) => setTimeout(r, 150));

            const enterDown = new KeyboardEvent("keydown", {
                key: "Enter",
                code: "Enter",
                keyCode: 13,
                which: 13,
                bubbles: true,
                cancelable: true,
            });
            textbox.dispatchEvent(enterDown);

            BdApi.UI.showToast("GIF sent!", { type: "success" });

            try {
                if (previousClipboard) {
                    if (electronClipboard) {
                        electronClipboard.writeText(previousClipboard);
                    } else {
                        await navigator.clipboard.writeText(previousClipboard);
                    }
                }
            } catch { /* ignore */ }

            return;
        } catch (e) {
            console.warn("[BringBackTenor] paste+send error:", e);
        }

        // Final fallback: just copy to clipboard and tell the user
        try {
            await navigator.clipboard.writeText(url);
            BdApi.UI.showToast("GIF URL copied! Press Ctrl+V then Enter to send.", {
                type: "info",
            });
        } catch (e) {
            console.error("[BringBackTenor] All send methods failed:", e);
            BdApi.UI.showToast("Failed to send GIF.", { type: "error" });
        }
    }

    // ═══════════════════════════════════════
    // UTILITIES
    // ═══════════════════════════════════════

    escapeHTML(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }

    // ═══════════════════════════════════════
    // SETTINGS
    // ═══════════════════════════════════════

    getSettingsPanel() {
        const panel = document.createElement("div");
        panel.style.padding = "16px";
        panel.style.color = "var(--text-normal)";
        panel.innerHTML = `
            <h3 style="margin:0 0 12px; font-size:18px; font-weight:700;">Bring Back Tenor Settings</h3>

            <div style="margin-bottom:16px;">
                <p style="font-size:14px; margin:0 0 8px; color:var(--text-muted);">
                    This plugin scrapes the Tenor website to display GIFs. No API key is needed.
                </p>
                <p style="font-size:13px; margin:0; color:var(--text-muted);">
                    <strong>How it works:</strong> Fetches GIF data from Tenor's pages and displays them in a grid.
                    Click any GIF to send its share URL to the current channel.
                </p>
            </div>

            <div style="padding:12px; background:var(--background-secondary); border-radius:8px; margin-bottom:12px;">
                <p style="font-size:13px; margin:0; color:var(--text-muted);">
                    <strong>How to use:</strong>
                </p>
                <ol style="font-size:13px; margin:8px 0 0; padding-left:20px; color:var(--text-muted);">
                    <li>Click the <strong>GIF/T</strong> button in the chat toolbar</li>
                    <li>Type your search query and press Enter or wait</li>
                    <li>Click any GIF to send it to the current channel</li>
                </ol>
            </div>

            <div style="padding:12px; background:var(--info-warning-background, #faa81a22);
                        border-left:3px solid var(--info-warning-foreground, #faa81a);
                        border-radius:4px;">
                <p style="font-size:12px; margin:0; color:var(--text-normal);">
                    <strong>Note:</strong> If GIFs don't load, Tenor may have changed their
                    page structure. Please check for plugin updates.
                </p>
            </div>

            <p style="font-size:11px; margin:16px 0 0; color:var(--text-muted); text-align:center;">
                Bring Back Tenor v${this.meta.version}
            </p>
        `;
        return panel;
    }
};

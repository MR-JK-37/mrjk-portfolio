from pathlib import Path
import base64
import json
import re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
APP = ROOT / ".next" / "server" / "app"
STATIC = ROOT / ".next" / "static"
AXE = ROOT / "node_modules" / "axe-core" / "axe.min.js"
PAGES = {
    "home": APP / "index.html",
    "design-system": APP / "design-system.html",
    "security": APP / "security.html",
    "resume": APP / "resume.html",
    "work-aero": APP / "work" / "aero.html",
    "work-spear-ai": APP / "work" / "spear-ai.html",
    "work-netpulse": APP / "work" / "netpulse.html",
    "work-lucent": APP / "work" / "lucent.html",
    "work-journey-safety": APP / "work" / "journey-safety.html",
}

def snapshot_html(path: Path) -> str:
    html = path.read_text()
    stylesheets = re.findall(r'<link rel="stylesheet" href="([^"]+)"[^>]*>', html)
    css = ""
    for href in stylesheets:
        css_path = ROOT / ".next" / href.removeprefix("/_next/")
        content = css_path.read_text()
        media_root = (STATIC / "css").as_uri() + "/"
        content = content.replace("url(../", f"url({media_root}../")
        css += content
    html = re.sub(r'<link rel="stylesheet"[^>]*>', "", html)
    html = re.sub(r'<link rel="preload"[^>]*>', "", html)
    html = re.sub(r'<script[^>]*>.*?</script>', "", html, flags=re.S)
    hero_data = base64.b64encode((ROOT / "public" / "images" / "security-workspace-hero.png").read_bytes()).decode()
    hero_uri = f"data:image/png;base64,{hero_data}"
    html = re.sub(r'srcSet="/_next/image\?url=%2Fimages%2Fsecurity-workspace-hero\.png[^\"]*"', "", html)
    html = re.sub(r'src="/_next/image\?url=%2Fimages%2Fsecurity-workspace-hero\.png[^\"]*"', f'src="{hero_uri}"', html)
    return html.replace("</head>", f"<style>{css}</style></head>")

def run_with_browser(browser) -> None:
    output = ROOT / "docs" / "evidence" / "screenshots"
    output.mkdir(parents=True, exist_ok=True)
    report = {"pages": {}, "preference_modes": {}}
    for name, source in PAGES.items():
        page_report = {"serious_or_critical": [], "headings": [], "landmarks": 0}
        for width in (375, 768, 1280, 1920):
            page = browser.new_page(viewport={"width": 1280, "height": 900})
            page.set_viewport_size({"width": width, "height": 900})
            page.set_content(snapshot_html(source), wait_until="load")
            page.screenshot(path=output / f"{name}-{width}.png", full_page=True)
            if width == 1280:
                page.add_script_tag(path=AXE)
                axe = page.evaluate("async () => await axe.run(document)")
                page_report["serious_or_critical"] = [{"id": item["id"], "nodes": len(item["nodes"])} for item in axe["violations"] if item.get("impact") in ("serious", "critical")]
                page_report["headings"] = page.locator("h1,h2,h3").all_text_contents()
                page_report["landmarks"] = page.locator("main,header,nav,footer").count()
            page.close()
        report["pages"][name] = page_report
    for mode, features in {
        "reduced-motion": [{"name": "prefers-reduced-motion", "value": "reduce"}],
        "reduced-transparency": [{"name": "prefers-reduced-transparency", "value": "reduce"}],
        "more-contrast": [{"name": "prefers-contrast", "value": "more"}],
        "forced-colors": [{"name": "forced-colors", "value": "active"}],
    }.items():
        page = browser.new_page(viewport={"width": 1280, "height": 900})
        page.context.new_cdp_session(page).send("Emulation.setEmulatedMedia", {"features": features})
        page.set_content(snapshot_html(PAGES["home"]), wait_until="load")
        page.screenshot(path=output / f"home-{mode}.png", full_page=True)
        report["preference_modes"][mode] = {"body_background": page.locator("body").evaluate("el => getComputedStyle(el).backgroundColor"), "glass_background": page.locator(".glass").first.evaluate("el => getComputedStyle(el).backgroundColor")}
        page.close()
    (ROOT / "docs" / "evidence" / "static-qa.json").write_text(json.dumps(report, indent=2))
    print(json.dumps(report, indent=2))

def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path="/usr/bin/browseros", headless=True)
        run_with_browser(browser)
        browser.close()

if __name__ == "__main__":
    main()

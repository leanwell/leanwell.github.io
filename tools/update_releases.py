#!/usr/bin/env python3
"""
Daily APK Releases Manifest Generator
Scans `apps/daily/` for all `.apk` files and keeps `apps/daily/releases.json` up-to-date.
"""

import os
import re
import json
import datetime

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, '..'))
DAILY_DIR = os.path.join(PROJECT_ROOT, 'apps', 'daily')
MANIFEST_PATH = os.path.join(DAILY_DIR, 'releases.json')

def parse_semver(filename):
    """Extract semantic version tuple from filename like daily-v1.1-beta.apk."""
    match = re.search(r'v?(\d+)\.(\d+)(?:\.(\d+))?(?:-([a-zA-Z0-9.]+))?', filename, re.IGNORECASE)
    if match:
        major = int(match.group(1))
        minor = int(match.group(2))
        patch = int(match.group(3)) if match.group(3) else 0
        tag = match.group(4) or ''
        return (major, minor, patch, tag)
    return (0, 0, 0, filename)

def format_size(bytes_num):
    """Format bytes into human-readable MB."""
    mb = bytes_num / (1024 * 1024)
    return f"{mb:.1f} MB"

def update_manifest():
    if not os.path.exists(DAILY_DIR):
        print(f"Directory {DAILY_DIR} does not exist.")
        return

    # Load existing releases if manifest exists
    existing_map = {}
    if os.path.exists(MANIFEST_PATH):
        try:
            with open(MANIFEST_PATH, 'r', encoding='utf-8') as f:
                data = json.load(f)
                for item in data:
                    existing_map[item.get('fileName')] = item
        except Exception as e:
            print(f"Warning: could not read existing manifest: {e}")

    # Scan for APK files
    apk_files = [f for f in os.listdir(DAILY_DIR) if f.lower().endswith('.apk')]
    
    # Sort descending by semver
    def sort_key(fn):
        major, minor, patch, tag = parse_semver(fn)
        # Give higher weight to larger versions
        return (major, minor, patch)

    apk_files.sort(key=sort_key, reverse=True)

    releases = []
    for idx, fn in enumerate(apk_files):
        full_path = os.path.join(DAILY_DIR, fn)
        size_bytes = os.path.getsize(full_path)
        existing = existing_map.get(fn, {})

        # Extract version tag
        v_match = re.search(r'v?(\d+\.\d+(?:\.\d+)?(?:-[a-zA-Z0-9.]+)?|\d+)', fn, re.IGNORECASE)
        version_str = f"v{v_match.group(1)}" if v_match else fn

        release_date = existing.get('releaseDate')
        if not release_date:
            mtime = os.path.getmtime(full_path)
            release_date = datetime.date.fromtimestamp(mtime).strftime('%Y-%m-%d')

        notes = existing.get('notes', "Maintenance and stability release.")

        entry = {
            "version": existing.get('version', version_str),
            "versionCode": len(apk_files) - idx,
            "fileName": fn,
            "downloadUrl": f"daily/{fn}",
            "releaseDate": release_date,
            "sizeBytes": size_bytes,
            "sizeFormatted": format_size(size_bytes),
            "minAndroid": existing.get('minAndroid', "Android 8.0 (Oreo)+"),
            "architecture": existing.get('architecture', "Universal (ARM64 / ARMv7 / x86)"),
            "isLatest": (idx == 0),
            "notes": notes
        }
        releases.append(entry)

    with open(MANIFEST_PATH, 'w', encoding='utf-8') as f:
        json.dump(releases, f, indent=2, ensure_ascii=False)
        f.write('\n')

    print(f"Successfully updated {MANIFEST_PATH} with {len(releases)} releases:")
    for r in releases:
        badge = "[LATEST]" if r['isLatest'] else "[ARCHIVE]"
        print(f"  {badge} {r['version']} -> {r['fileName']} ({r['sizeFormatted']}, {r['releaseDate']})")

if __name__ == '__main__':
    update_manifest()

import json
import sys
import urllib.request
import urllib.parse
import os

BASE_URL = "https://hacksu.com"
DEV_URL = "https://dev.hacksu.com"
OUTPUT_FILE = "dump.sql"
ASSETS_DIR = "assets"

# Cookie provided by user
COOKIE = "connect.sid=s%3**********"

ENTITIES = ["staff", "events", "notes", "informations", "lesson_icons", "redirects"]


def fetch_data(entity):
    base = DEV_URL if entity == "lesson_icons" else BASE_URL
    url = f"{base}/api/{entity}"
    print(f"Fetching {url}...")

    req = urllib.request.Request(url)
    req.add_header("Cookie", COOKIE)
    req.add_header(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    )

    try:
        with urllib.request.urlopen(req) as response:
            if response.status != 200:
                print(f"Failed to fetch {entity}: HTTP {response.status}")
                return []
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        print(f"Error fetching {entity}: {e}")
        return []


def download_asset(url_path):
    if not url_path or not url_path.startswith("/"):
        return

    # Encode the path to handle spaces and special chars
    encoded_path = urllib.parse.quote(url_path, safe='/')
    full_url = f"{BASE_URL}{encoded_path}"
    
    # Remove leading slash for local path
    local_path = os.path.join(ASSETS_DIR, url_path.lstrip("/"))
    local_dir = os.path.dirname(local_path)

    if not os.path.exists(local_dir):
        os.makedirs(local_dir)

    if os.path.exists(local_path):
        # print(f"Asset already exists: {local_path}")
        return

    print(f"Downloading asset: {full_url} -> {local_path}")
    
    req = urllib.request.Request(full_url)
    req.add_header("Cookie", COOKIE)
    req.add_header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")

    try:
        with urllib.request.urlopen(req) as response:
            with open(local_path, "wb") as f:
                f.write(response.read())
    except Exception as e:
        print(f"Failed to download {full_url}: {e}")


def dump_entity(entity, data, f):
    if not data:
        print(f"No data for {entity}")
        return

    table_name = entity  # Assuming table name matches API endpoint name
    f.write(f"\n-- Data for table {table_name} --\n")

    # Get columns from first item
    if not isinstance(data, list):
        print(f"Unexpected data format for {entity}: {type(data)}")
        return

    if len(data) == 0:
        return

    columns = list(data[0].keys())
    columns_str = ", ".join(f'"{c}"' for c in columns)

    for row in data:
        # Check for assets to download
        if "photo" in row and row["photo"]:
            download_asset(row["photo"])
            
        values = []
        for col in columns:
            val = row.get(col)
            if val is None:
                values.append("NULL")
            elif isinstance(val, (int, float)):
                values.append(str(val))
            elif isinstance(val, bool):
                values.append("TRUE" if val else "FALSE")
            elif isinstance(val, (dict, list)):
                json_str = json.dumps(val).replace("'", "''")
                values.append(f"'{json_str}'")
            else:
                str_val = str(val).replace("'", "''")
                values.append(f"'{str_val}'")

        values_str = ", ".join(values)
        f.write(
            f'\tINSERT INTO "{table_name}" ({columns_str}) VALUES ({values_str});\n'
        )

    print(f"Dumped {len(data)} rows for {entity}")


def main():
    if not os.path.exists(ASSETS_DIR):
        os.makedirs(ASSETS_DIR)
        
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        for entity in ENTITIES:
            data = fetch_data(entity)
            dump_entity(entity, data, f)

    print(f"\nDone. Saved to {OUTPUT_FILE}")
    print(f"Assets downloaded to {ASSETS_DIR}/")


if __name__ == "__main__":
    main()

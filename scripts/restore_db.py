
import psycopg2
import sys

conn = psycopg2.connect(
    host="Database URL",
    port="5433",
    user="postgres",
    password="postgres",
    database="hacksu"
)

cursor = conn.cursor()

BACKUP_FILE = "dump.sql"

try:
    # Clear all tables first
    cursor.execute(
        "SELECT tablename FROM pg_tables WHERE schemaname = 'public';"
    )
    tables = cursor.fetchall()
    
    for table in tables:
        cursor.execute(f"TRUNCATE TABLE {table[0]} CASCADE;")
    
    conn.commit()
    print("Cleared existing data...")
    
    # Restore backup
    with open(BACKUP_FILE, "r") as f:
        sql_content = f.read()
    
    print(f"Restoring from {BACKUP_FILE}...")
    cursor.execute(sql_content)
    conn.commit()
    
    print("[OK] Backup restored successfully!")
    
except Exception as e:
    conn.rollback()
    print(f"[BAD] Error: {e}")
    sys.exit(1)
finally:
    cursor.close()
    conn.close()
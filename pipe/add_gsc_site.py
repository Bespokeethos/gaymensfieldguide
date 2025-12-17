import google.auth
from googleapiclient.discovery import build

SITE_URL = "https://gaymensfieldguide.com/"

def add_site_to_search_console():
    try:
        creds, project = google.auth.default(
            scopes=['https://www.googleapis.com/auth/webmasters']
        )
        service = build('searchconsole', 'v1', credentials=creds)
        
        # Try to add site
        print(f"Adding {SITE_URL} to Search Console...")
        service.sites().add(siteUrl=SITE_URL).execute()
        print("Site added!")
        
        # List sites to confirm
        sites = service.sites().list().execute()
        print("\nSites in Search Console:")
        for site in sites.get('siteEntry', []):
            print(f"  - {site['siteUrl']} (Permission: {site['permissionLevel']})")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    add_site_to_search_console()
